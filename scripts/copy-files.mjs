// Copies the downloadable resources (our agents, skills, hooks, CLAUDE.md templates)
// into public/files so install commands can fetch them straight from the site.
import { cpSync, rmSync, existsSync } from 'node:fs';
const out = 'public/files';
if (existsSync(out)) rmSync(out, { recursive: true });
cpSync('resources-src', out, { recursive: true, filter: (p) => !p.endsWith('hooks.test.mjs') });
console.log('copied resources-src -> public/files');
