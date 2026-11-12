// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL / BASE_PATH are set by the GitHub Pages workflow. Local builds use these defaults.
const site = process.env.SITE_URL ?? 'https://example.github.io';
const base = process.env.BASE_PATH ?? '/claude-resource-hub';
const FILES = `${site.replace(/\/$/, '')}${base}/files`;

/** Replace the {files} token in markdown text, code and links with the absolute downloads URL. */
function remarkFilesToken() {
  const walk = (node) => {
    if (typeof node.value === 'string') node.value = node.value.replaceAll('{files}', FILES);
    if (typeof node.url === 'string') node.url = node.url.replaceAll('{files}', FILES);
    node.children?.forEach(walk);
  };
  return walk;
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: { define: { __FILES_URL__: JSON.stringify(FILES) } },
  markdown: {
    remarkPlugins: [remarkFilesToken],
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
  },
});
