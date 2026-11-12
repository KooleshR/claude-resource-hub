#!/usr/bin/env node
// Hook: desktop-notify
// Event: Notification (Claude needs your input / permission) and optionally Stop (task finished)
// Shows a desktop notification so you can work elsewhere while Claude runs.
//   Windows -> toast via built-in PowerShell + WinRT (nothing to install)
//   macOS   -> osascript
//   Linux   -> notify-send (libnotify)
// Never blocks. Node 18+, no dependencies.

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { spawn } from 'node:child_process';

function readInput() {
  try { return JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

const input = readInput();
const project = basename(process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd());
const title = `Claude Code · ${project}`;
const message = String(input.message || (input.hook_event_name === 'Stop' ? 'Task finished' : 'Claude needs your attention'))
  .replace(/["'`$]/g, '').slice(0, 200);

const run = (cmd, args) => spawn(cmd, args, { detached: true, stdio: 'ignore', windowsHide: true }).unref();

if (process.platform === 'win32') {
  const ps = `
[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
$t = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02)
$x = $t.GetElementsByTagName('text'); $x.Item(0).AppendChild($t.CreateTextNode('${title}')) | Out-Null; $x.Item(1).AppendChild($t.CreateTextNode('${message}')) | Out-Null
[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\\WindowsPowerShell\\v1.0\\powershell.exe').Show([Windows.UI.Notifications.ToastNotification]::new($t))`;
  run('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps]);
} else if (process.platform === 'darwin') {
  run('osascript', ['-e', `display notification "${message}" with title "${title}"`]);
} else {
  run('notify-send', [title, message]);
}
process.exit(0);
