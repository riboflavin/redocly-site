// Resolves the cards on the Realm configuration overview at build time. Each
// `{% configProperty file="…" /%}` reads its option page's title, description,
// products, and plans from this map instead of fetching page data at runtime.

import { createInlineEntity, defineContentPlugin } from 'realm-plus/plugin';

const PLUGIN_ID = 'realm-config-properties';
const CONFIG_DIR = 'docs/realm/config/';
const OVERVIEW_PATH = `${CONFIG_DIR}index.md`;

// Dependency key `ConfigProperty` reads through `usePageSharedData`.
const PROPERTIES_KEY = 'realm-config-properties';

function isConfigPage(path) {
  return path.startsWith(CONFIG_DIR) && path.endsWith('.md');
}

/** The first `# heading` after the front matter, without inline-code backticks. */
function readTitle(source) {
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const heading = body.match(/^#\s+(.+?)\s*$/m)?.[1];
  return heading?.replace(/`/g, '');
}

export default defineContentPlugin({
  id: PLUGIN_ID,
  version: '1.0.0',
  content: {
    filter: { match: isConfigPage },
  },
  async finalize(ctx) {
    const overview = ctx.routes.byFilePath(OVERVIEW_PATH);
    if (!overview) return {};

    // Keyed by path relative to the config directory, as the tag's `file` is.
    const properties = {};
    for (const file of ctx.files) {
      if (file.path === OVERVIEW_PATH || file.manifest.ignore === true) continue;
      const route = ctx.routes.byFilePath(file.path);
      if (!route) continue;
      const { description, products, plans, seo } = file.manifest;
      properties[file.path.slice(CONFIG_DIR.length)] = {
        route: route.slug,
        title: seo?.title ?? readTitle(await ctx.io.readFile(file.path)) ?? file.basename,
        description: description ?? seo?.description ?? '',
        products,
        plans,
      };
    }

    const ref = createInlineEntity(properties, { stableKey: `${PLUGIN_ID}:properties` });
    return { entities: [ref], attach: [{ slug: overview.slug, deps: { [PROPERTIES_KEY]: ref } }] };
  },
});
