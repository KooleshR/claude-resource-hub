// Tests for the hooks in this folder. Run: node --test resources-src/hooks/
// Each test pipes a fake Claude Code event into the hook and checks exit code / output.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const run = (hook, event, args = [], env = {}) => spawnSync(process.execPath, [join(here, hook), ...args], {
  input: JSON.stringify(event), encoding: 'utf8', env: { ...process.env, ...env },
});
const bash = (command) => ({ hook_event_name: 'PreToolUse', tool_name: 'Bash', tool_input: { command } });

test('block-dangerous-commands blocks destructive commands', () => {
  for (const cmd of [
    'git push --force origin main', 'git push -f', 'git push origin main --force-with-lease',
    'git reset --hard HEAD~3', 'git clean -fd', 'git branch -D feature/x',
    'rm -rf /', 'rm -rf ~', 'rm -rf ~/', 'rm -fr .', 'rm -rf *', 'Remove-Item -Recurse -Force C:\\',
    'sqlplus -s u/p <<< "DROP TABLE employees;"', 'psql -c "TRUNCATE TABLE payslip"',
    'psql -c "DELETE FROM employees;"', 'mkfs.ext4 /dev/sda1', 'Format-Volume -DriveLetter D',
  ]) {
    const r = run('block-dangerous-commands.mjs', bash(cmd));
    assert.equal(r.status, 2, `should block: ${cmd}`);
    assert.match(r.stderr, /BLOCKED/);
  }
});

test('block-dangerous-commands allows normal commands', () => {
  for (const cmd of [
    'git push origin feature/payslip', 'git status', 'git reset HEAD file.txt', 'git branch -d done',
    'rm -rf node_modules', 'rm -rf ./build', 'Remove-Item -Recurse -Force .\\dist', 'mvn -q test',
    'psql -c "DELETE FROM employees WHERE id = 7;"', 'git commit -m "drop table support from docs"',
  ]) {
    assert.equal(run('block-dangerous-commands.mjs', bash(cmd)).status, 0, `should allow: ${cmd}`);
  }
});

test('secret-guard blocks secrets and allows placeholders', () => {
  const write = (content, file = 'C:/tmp/application.properties') =>
    run('secret-guard.mjs', { tool_name: 'Write', tool_input: { file_path: file, content } });
  const fakeKey = 'sk-ant-' + 'a'.repeat(30);
  assert.equal(write('db.password=Payr0ll2026!').status, 2);
  assert.equal(write(`const key = "${fakeKey}";`, 'C:/tmp/a.js').status, 2);
  assert.equal(write('-----BEGIN RSA PRIVATE KEY-----').status, 2);
  assert.equal(write('db.password=${DB_PASSWORD}').status, 0);
  assert.equal(write('password: "changeme"', 'C:/tmp/a.yml').status, 0);
  assert.equal(write('token = "abcd1234" # pragma: allowlist secret').status, 0);
  assert.equal(write('server.port=8080').status, 0);
});

test('subagent-command-allowlist enforces profiles', () => {
  const ok = (cmd, p) => run('subagent-command-allowlist.mjs', bash(cmd), [p]).status;
  assert.equal(ok('git diff origin/main', 'reviewer'), 0);
  assert.equal(ok('git log --oneline | head', 'reviewer'), 2); // head not in reviewer list
  assert.equal(ok('git commit -m x', 'reviewer'), 2);
  assert.equal(ok('mvn -q test', 'reviewer'), 2);
  assert.equal(ok('mvn -q test', 'tester'), 0);
  assert.equal(ok('git status && npm test', 'tester'), 0);
  assert.equal(ok('npm install lodash', 'tester'), 2);
  assert.equal(ok('git status', 'nope'), 2);
});

test('tests-before-stop blocks when code changed without a test run', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tbs-'));
  writeFileSync(join(dir, 'pom.xml'), '<project/>');
  const tx = (uses) => {
    const f = join(dir, `t${Math.random()}.jsonl`);
    writeFileSync(f, uses.map((u) => JSON.stringify({ message: { content: [{ type: 'tool_use', ...u }] } })).join('\n'));
    return f;
  };
  const edit = { name: 'Edit', input: { file_path: 'src/main/java/Payslip.java' } };
  const env = { CLAUDE_PROJECT_DIR: dir };
  let r = run('tests-before-stop.mjs', { transcript_path: tx([edit]) }, [], env);
  assert.match(r.stdout, /"decision":"block"/);
  assert.match(r.stdout, /mvn -q test/);
  r = run('tests-before-stop.mjs', { transcript_path: tx([edit, { name: 'Bash', input: { command: 'mvn -q test' } }]) }, [], env);
  assert.equal(r.stdout, '');
  r = run('tests-before-stop.mjs', { transcript_path: tx([edit, { name: 'Bash', input: { command: 'mvn -q test -Dtest=One' } }]) }, [], env);
  assert.match(r.stdout, /block/, 'a partial run does not count');
  r = run('tests-before-stop.mjs', { transcript_path: tx([edit]), stop_hook_active: true }, [], env);
  assert.equal(r.stdout, '', 'never loops');
  r = run('tests-before-stop.mjs', { transcript_path: tx([{ name: 'Edit', input: { file_path: 'README.md' } }]) }, [], env);
  assert.equal(r.stdout, '', 'docs-only edits do not need tests');
});

test('session-branch-check reports branch and warns on main', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sbc-'));
  const g = (...a) => spawnSync('git', a, { cwd: dir, encoding: 'utf8' });
  g('init', '-q', '-b', 'main'); g('config', 'user.email', 't@t'); g('config', 'user.name', 't');
  writeFileSync(join(dir, 'a.txt'), 'a'); g('add', '.'); g('commit', '-qm', 'one');
  let r = run('session-branch-check.mjs', {}, [], { CLAUDE_PROJECT_DIR: dir });
  assert.match(r.stdout, /on branch "main", clean/);
  assert.match(r.stdout, /create a feature branch/);
  g('switch', '-qc', 'feature/x'); g('switch', '-q', 'main');
  writeFileSync(join(dir, 'b.txt'), 'b'); g('add', '.'); g('commit', '-qm', 'two'); g('switch', '-q', 'feature/x');
  writeFileSync(join(dir, 'c.txt'), 'c');
  r = run('session-branch-check.mjs', {}, [], { CLAUDE_PROJECT_DIR: dir });
  assert.match(r.stdout, /1 uncommitted/);
  assert.match(r.stdout, /1 commit\(s\) behind main/);
});

test('compile-check and auto-format stay silent when nothing applies', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cc-'));
  mkdirSync(join(dir, 'docs'));
  writeFileSync(join(dir, 'docs', 'x.md'), '# x');
  const ev = { tool_name: 'Edit', tool_input: { file_path: join(dir, 'docs', 'x.md') } };
  assert.equal(run('compile-check.mjs', ev, [], { CLAUDE_PROJECT_DIR: dir }).status, 0);
  const f = run('auto-format.mjs', ev, [], { CLAUDE_PROJECT_DIR: dir });
  assert.equal(f.status, 0);
  assert.equal(f.stdout, '');
});

