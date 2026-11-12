#!/usr/bin/env node
// Hook: session-branch-check
// Event: SessionStart   Matcher: startup|resume
// When a session opens, tells you AND Claude: current branch, uncommitted changes, and how far
// the branch is behind/ahead of the main branch. Whatever this prints goes into Claude's context.
// Uses only local refs (no fetch), so it is instant and works offline. Set BRANCH_CHECK_FETCH=1
// to fetch first. Never blocks. Node 18+, no dependencies.

import { spawnSync } from 'node:child_process';

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const git = (...args) => {
  const r = spawnSync('git', args, { cwd: root, encoding: 'utf8', timeout: 15_000 });
  return r.status === 0 ? r.stdout.trim() : null;
};

if (git('rev-parse', '--is-inside-work-tree') !== 'true') process.exit(0);
if (process.env.BRANCH_CHECK_FETCH === '1') git('fetch', '--quiet');

const branch = git('branch', '--show-current') || '(detached HEAD)';
const base = ['origin/main', 'origin/master', 'origin/develop', 'main', 'master', 'develop']
  .find((b) => b !== branch && git('rev-parse', '--verify', '--quiet', b) !== null);
const dirty = (git('status', '--porcelain') || '').split('\n').filter(Boolean).length;

const lines = [`Git: on branch "${branch}"${dirty ? `, ${dirty} uncommitted change(s)` : ', clean'}.`];
if (base) {
  const [behind, ahead] = (git('rev-list', '--left-right', '--count', `${base}...HEAD`) || '0\t0').split(/\s+/).map(Number);
  if (behind > 0) lines.push(`Branch is ${behind} commit(s) behind ${base}: consider updating before starting work.`);
  if (ahead > 0) lines.push(`Branch is ${ahead} commit(s) ahead of ${base}.`);
}
if (['main', 'master'].includes(branch)) lines.push('You are on the main branch: create a feature branch before making changes.');

process.stdout.write(lines.join('\n') + '\n');
process.exit(0);
