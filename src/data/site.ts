export const TYPES = {
  command: { label: 'Commands', one: 'Command', blurb: 'Slash commands you type in a session: /init, /rewind, /code-review.',
    what: 'A shortcut you trigger yourself by typing /name. Built-in ones ship with Claude Code, and you can write your own.',
    where: 'Built in, or your own in .claude/commands/<name>.md. A skill also gets a /name.',
    when: 'You want to start a known task on purpose, the same way every time.' },
  agent: { label: 'Agents', one: 'Agent', blurb: 'Subagents with their own context and tools. Claude hands them a focused job.',
    what: 'A helper Claude hands a focused job to. It works in a fresh context with only the tools you give it, then reports back a summary.',
    where: '.claude/agents/<name>.md in the project, or ~/.claude/agents/ for all your projects.',
    when: 'The job is big or noisy (a review, a search across the codebase), or it should be limited, for example read-only.' },
  skill: { label: 'Skills', one: 'Skill', blurb: 'Folders of instructions Claude loads when the task matches.',
    what: 'A folder of instructions and files that Claude loads only when your task matches its description, so it costs nothing until needed.',
    where: '.claude/skills/<name>/SKILL.md, or ~/.claude/skills/ for all your projects.',
    when: 'You keep explaining the same how-to: your conventions, a checklist, a build or release recipe.' },
  hook: { label: 'Hooks', one: 'Hook', blurb: 'Scripts that run on session events. Exit code 2 blocks the action.',
    what: 'A script that runs automatically at a set moment, such as before a command or after an edit. It always runs; it does not rely on Claude remembering.',
    where: 'The hooks section of .claude/settings.json, with the scripts usually in .claude/hooks/.',
    when: 'Something must happen every time: block a dangerous command, format a file, run the tests before Claude stops.' },
  mcp: { label: 'MCP servers', one: 'MCP server', blurb: 'Connect Claude to outside tools: docs, GitHub, a browser.',
    what: 'A connector that gives Claude tools and data from outside your code: library docs, GitHub, a database, a browser.',
    where: '.mcp.json in the project root, or added with claude mcp add.',
    when: 'Claude needs information or actions that are not in your repository.' },
  plugin: { label: 'Plugins', one: 'Plugin', blurb: 'Installable bundles of commands, agents, skills and hooks.',
    what: 'A packaged bundle of commands, agents, skills, hooks and MCP servers that installs in one step.',
    where: 'Installed with /plugin from a marketplace. Claude Code manages the files.',
    when: 'You want to share a whole set-up with your team, or install one someone else made.' },
  harness: { label: 'Harness', one: 'Harness', blurb: 'Ways to run Claude Code: modes, headless, CI.',
    what: 'How you run Claude Code, rather than what you add to it: in the terminal, in a permission mode, headless with claude -p, or in CI.',
    where: 'Not a file you install: command-line flags, permission modes (Shift+Tab) and .claude/settings.json.',
    when: 'You are choosing how much Claude may do on its own, or running it from scripts and pipelines.' },
} as const;
export type TypeKey = keyof typeof TYPES;
export const TYPE_KEYS = Object.keys(TYPES) as [TypeKey, ...TypeKey[]];

export const STACKS = {
  all: 'Any stack',
  java: 'Java / Spring',
  jsf: 'JSF',
  react: 'React',
  angular: 'Angular',
  astro: 'Astro',
  dotnet: '.NET',
  python: 'Python',
  node: 'Node',
  sql: 'SQL',
  mobile: 'Mobile',
} as const;
export const STACK_GROUPS = [
  { label: 'Backend', stacks: ['java', 'dotnet', 'python', 'node', 'sql'] },
  { label: 'Frontend', stacks: ['react', 'angular', 'astro', 'jsf'] },
  { label: 'Mobile', stacks: ['mobile'] },
] as const;
export type StackKey = keyof typeof STACKS;
export const STACK_KEYS = Object.keys(STACKS) as [StackKey, ...StackKey[]];

// The session step bar: where in a Claude Code session each resource acts.
export const STEPS = {
  setup: { label: 'Setup', event: 'Before you start', text: 'Install plugins and pick how you run Claude Code: in the terminal, headless or in CI.' },
  start: { label: 'Start', event: 'SessionStart', text: 'Claude reads CLAUDE.md, your mode is set, and SessionStart hooks run.' },
  prompt: { label: 'Prompt', event: 'UserPromptSubmit', text: 'You type a request or a slash command. Matching skills load.' },
  agent: { label: 'Agent', event: 'SubagentStart', text: 'Claude hands a focused job to a subagent with its own context.' },
  pre: { label: 'Before tool', event: 'PreToolUse', text: 'Guard hooks check each command or edit. Exit code 2 blocks it.' },
  tool: { label: 'Tool', event: 'Tool call', text: 'Claude reads, edits, runs commands or calls an MCP server.' },
  post: { label: 'After tool', event: 'PostToolUse', text: 'Tidy-up hooks format and compile what just changed.' },
  stop: { label: 'Stop', event: 'Stop', text: 'Before Claude finishes, Stop hooks can send it back to run the tests.' },
} as const;
export type StepKey = keyof typeof STEPS;
export const STEP_KEYS = Object.keys(STEPS) as [StepKey, ...StepKey[]];

export const ORIGINS = { official: 'Official', community: 'Community', ours: 'Ours' } as const;

/** Prefix a site path with the configured base. */
export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.replace(/^\//, '');
  if (!p) return `${base}/`;
  // Pages get a trailing slash (matches GitHub Pages folders); files and anchors do not.
  const last = p.split('/').pop() ?? '';
  return /[.#?]/.test(last) || p.endsWith('/') ? `${base}/${p}` : `${base}/${p}/`;
}

declare const __FILES_URL__: string;
/** Absolute URL of the downloadable files (our agents, skills, hooks, templates). */
export const FILES_URL: string = __FILES_URL__;
export const withFiles = (s: string) => s.replaceAll('{files}', FILES_URL);
