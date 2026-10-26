// Presentational metadata for the Products navbar menu (desktop rail + panel and
// mobile drilldown). The structure itself (sections, labels, links) comes from the
// `navbar.items` Products group in `redocly.yaml`; this file only adds what the
// config schema cannot express. Entries are keyed by the resolved page link.

export type ProductMeta = {
  /** One line under the name in the rail, and the panel's lead. */
  description: string;
  /** Short highlight rendered as a badge next to the name. */
  tag?: string;
  /** Marks AI-powered items with the sparkle icon. */
  ai?: boolean;
};

export const PRODUCT_META: Record<string, ProductMeta> = {
  '/platform': { description: 'Edit, review and publish your API docs in one place.' },
  '/product': { description: 'Docs as code, from Markdown to React' },
  '/redocly-cli': { description: 'Lint, bundle and ship API descriptions.' },
  '/redoc-ce': { description: 'Turn an API description into reference docs.', tag: '3.0' },
  '/respect': { description: 'Checks live APIs on a schedule' },
  '/reviewer': { description: 'Comments on every docs PR', tag: 'New', ai: true },
  '/writer': { description: 'Turns user signals into docs PRs', tag: 'New', ai: true },
};

export const PLATFORM_LINK = '/platform';
export const FRAMEWORK_LINK = '/product';
export const REDOCLY_CLI_LINK = '/redocly-cli';
export const REDOC_CE_LINK = '/redoc-ce';

/** Products from the `Products` section that are listed inside Platform. */
export const PLATFORM_SUBLINKS = ['/respect'];

export type MenuItem = {
  label: string;
  link: string;
  description: string;
  tag?: string;
  ai?: boolean;
};

/** The Redocly editor has no page of its own, so the item opens its section of the platform page. */
export const CONTENT_EDITOR: MenuItem = {
  label: 'Content editor',
  link: '/platform#editor',
  description: 'Edit pages right in the browser',
};

/** `redocly <command>` shortcuts shown under Redocly CLI. */
export const CLI_COMMANDS: { command: string; link: string }[] = [
  { command: 'score', link: '/score' },
  { command: 'respect', link: '/respect-cli' },
  { command: 'generate-arazzo', link: '/generate-arazzo' },
  { command: 'generate-client', link: '/client-generator' },
  { command: 'generate-spec', link: '/generate-spec' },
  { command: 'drift', link: '/drift' },
  { command: 'recheck', link: '/recheck' },
];

/** GitHub repositories of the open source tools, keyed by page link. */
export const GITHUB_REPOS: Record<string, { repo: string; fallbackStars: string }> = {
  [REDOCLY_CLI_LINK]: { repo: 'Redocly/redocly-cli', fallbackStars: '1.5k' },
  [REDOC_CE_LINK]: { repo: 'Redocly/redoc', fallbackStars: '25.8k' },
};

export function getProductMeta(link?: string): ProductMeta | undefined {
  return link ? PRODUCT_META[link] : undefined;
}

type SeparatedItem = { type?: string; label?: string; link?: string };

/**
 * Splits the flat Products group into sections delimited by `separator` items,
 * keyed by the separator label. Works for both the navbar's resolved items and
 * the mobile menu's `ItemState` items.
 */
export function groupBySeparator<T extends SeparatedItem>(items: T[]): Record<string, T[]> {
  const sections: Record<string, T[]> = {};
  let current = 'Products';
  for (const item of items) {
    if (item.type?.startsWith('separator')) {
      current = item.label || current;
      sections[current] = sections[current] ?? [];
    } else if (item.link) {
      sections[current] = sections[current] ?? [];
      sections[current].push(item);
    }
  }
  return sections;
}

type LinkedItem = SeparatedItem & { label?: string; link?: string };

const toMenuItem = (item: LinkedItem): MenuItem => {
  const meta = getProductMeta(item.link);
  return {
    label: item.label ?? '',
    link: item.link ?? '',
    description: meta?.description ?? '',
    tag: meta?.tag,
    ai: meta?.ai,
  };
};

/**
 * Resolves the menu from the config items: The platform and its items (the content editor,
 * the agents and Respect Monitoring, in the design's reading order), the API docs
 * framework, and the open source tools.
 */
export function resolveProductsMenu<T extends LinkedItem>(items: T[]) {
  const sections = groupBySeparator(items);
  const byLink = new Map(
    Object.values(sections)
      .flat()
      .map((item) => [item.link, item]),
  );
  const find = (link: string) => byLink.get(link);
  const agents = (sections['Agents'] ?? []).map(toMenuItem);
  const studioProducts = PLATFORM_SUBLINKS.map(find)
    .filter((item): item is T => !!item)
    .map(toMenuItem);
  return {
    studio: find(PLATFORM_LINK),
    framework: find(FRAMEWORK_LINK),
    cli: find(REDOCLY_CLI_LINK),
    redocCe: find(REDOC_CE_LINK),
    studioItems: [CONTENT_EDITOR, ...agents.slice(0, 1), ...studioProducts, ...agents.slice(1)],
  };
}
