// Presentational metadata for the Products navbar menu (desktop dropdown and
// mobile drilldown). The structure itself (sections, labels, links, icons)
// comes from the `navbar.items` Products group in `redocly.yaml`; this file
// only adds what the config schema cannot express. Entries are keyed by the
// resolved page link so that items with the same label (e.g. "Redoc") stay
// distinguishable.

export type ProductMeta = {
  description: string;
  /** Short highlight rendered as a tag next to the title. */
  tag?: string;
};

export const PRODUCT_META: Record<string, ProductMeta> = {
  '/reunite': { description: 'Build your API with Reunite' },
  '/revel': { description: 'External developer showcase' },
  '/reef': { description: 'Internal service catalog' },
  '/realm': { description: 'Combo of Redoc, Revel, and Reef' },
  '/redoc': { description: 'API reference and mock server' },
  '/respect': { description: 'API monitoring' },
  '/redoc-ce': { description: 'Open source API docs', tag: '3.0 coming soon' },
  '/redocly-cli': { description: 'Open source command line' },
  '/reviewer': { description: 'Reads pull requests, leaves expert feedback', tag: 'New' },
};

/** Products that render in the left column of the desktop dropdown, under Reunite. */
export const SIDEBAR_PRODUCT_LINKS = ['/respect'];

export const REUNITE_LINK = '/reunite';
export const REDOCLY_CLI_LINK = '/redocly-cli';

/** `redocly <command>` shortcuts shown inside the Redocly CLI card. */
export const CLI_COMMANDS: { command: string; link: string }[] = [
  { command: 'score', link: '/score' },
  { command: 'respect', link: '/respect-cli' },
  { command: 'generate-arazzo', link: '/generate-arazzo' },
  { command: 'generate-client', link: '/client-generator' },
  { command: 'generate-spec', link: '/generate-spec' },
  { command: 'drift', link: '/drift' },
  { command: 'recheck', link: '/recheck' },
];

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
