// Resolves the cards on the Realm configuration overview at build time. Each
// `{% configProperty file="…" /%}` reads its option page's title, description,
// and plans from this map instead of fetching page data at runtime.

import { relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createInlineEntity, defineContentPlugin } from '@redocly/realm-plus/plugin';

const PLUGIN_ID = 'realm-config-properties';

// The config pages sit beside `@theme`. These docs build on their own and also
// mount at `docs/platform/` in the website, so their path from the content root
// depends on which project loads this plugin.
const CONFIG_PATH = fileURLToPath(new URL('../../config', import.meta.url));

// Dependency key `ConfigProperty` reads through `usePageSharedData`.
const PROPERTIES_KEY = 'realm-config-properties';

/** The first `# heading` after the front matter, without inline-code backticks. */
function readTitle(source) {
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const heading = body.match(/^#\s+(.+?)\s*$/m)?.[1];
  return heading?.replace(/`/g, '');
}

export default function configPropertiesPlugin({ contentDir }) {
  // Content paths are relative to the content root and always use `/`.
  const configDir = `${relative(contentDir, CONFIG_PATH).split(sep).join('/')}/`;
  const overviewPath = `${configDir}index.md`;

  return defineContentPlugin({
    id: PLUGIN_ID,
    version: '1.0.0',
    content: {
      filter: { match: (path) => path.startsWith(configDir) && path.endsWith('.md') },
    },
    async finalize(ctx) {
      const overview = ctx.routes.byFilePath(overviewPath);
      if (!overview) return {};

      // Keyed by path relative to the config directory, as the tag's `file` is.
      const properties = {};
      for (const file of ctx.files) {
        if (file.path === overviewPath || file.manifest.ignore === true) continue;
        const route = ctx.routes.byFilePath(file.path);
        if (!route) continue;
        const { description, plans, seo } = file.manifest;
        properties[file.path.slice(configDir.length)] = {
          route: route.slug,
          title: seo?.title ?? readTitle(await ctx.io.readFile(file.path)) ?? file.basename,
          description: description ?? seo?.description ?? '',
          plans,
        };
      }

      const ref = createInlineEntity(properties, { stableKey: `${PLUGIN_ID}:properties` });
      return {
        entities: [ref],
        attach: [{ slug: overview.slug, deps: { [PROPERTIES_KEY]: ref } }],
      };
    },
  });
}
