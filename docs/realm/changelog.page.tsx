import * as React from 'react';
import styled from 'styled-components';

import { DocumentationLayout } from '@redocly/theme/layouts/DocumentationLayout';
import { Markdown } from '@redocly/theme/components/Markdown/Markdown';
import { Heading } from '@redocly/theme/markdoc/components/Heading/Heading';
import { SearchInput } from '@redocly/theme/components/Search/SearchInput';
import { Button } from '@redocly/theme/components/Button/Button';

import { HighlightContext } from './@theme/_components/Highlight';
import {
  ChangelogSection,
  SectionHeader,
  matchesSearch,
} from './@theme/_components/ChangelogSection';
import { hasChanges, type ChangelogEntry } from './@theme/_utils/changelog';
import { RssSubscription } from './@theme/_components/RssSubscription';

// @ts-expect-error -- the YAML module has no type declaration
import changelogData from './changelogs.yaml';

export enum CHANGE_TYPE {
  minor = 'minor',
  patch = 'patch',
}

export const SHORT_NAMES = {
  '@redocly/framework': 'Framework',
  '@redocly/realm': 'Realm',
  '@redocly/reef': 'Reef',
  '@redocly/revel': 'Revel',
  '@redocly/redoc': 'Redoc',
  reunite: 'Platform',
  '@redocly/ai-assistant': 'AI assistant web component',
  // TODO: uncomment before first replay release
  // replay: 'Replay',
};

export type ShortNameValues = (typeof SHORT_NAMES)[keyof typeof SHORT_NAMES];

/** Entry ids and hash links use this form, because an HTML id cannot contain spaces. */
export function toAnchorName(shortName: string): string {
  return shortName.replaceAll(' ', '-');
}

const PRODUCTS: ShortNameValues[] = ['Framework', 'Platform', 'AI assistant web component'];
/** Releases of these products are on the archived changelog page. */
const ARCHIVED_PRODUCTS: ShortNameValues[] = ['Realm', 'Reef', 'Revel', 'Redoc'];

/**
 * The time from which the releases of a package are on this page.
 * Earlier releases, and every release of a package that is not listed here, are on the archived page.
 */
const FIRST_LISTED_RELEASE: Record<string, number> = {
  '@redocly/framework': 0,
  reunite: Date.UTC(2026, 9, 22),
  '@redocly/ai-assistant': Date.UTC(2026, 9, 21),
};

export function isListedRelease(packageName: string, record: ChangelogEntry): boolean {
  const start = FIRST_LISTED_RELEASE[packageName];
  return start !== undefined && record.timestamp >= start;
}

const DEFAULT_ITEMS_TO_RENDER = 20;

type Changelogs = Record<string, Record<string, ChangelogEntry>>;

interface Release {
  record: ChangelogEntry;
  packageName: string;
  version: string;
}

export const frontmatter = {
  seo: {
    title: 'Redocly Changelog',
  },
};

export default function Changelog() {
  const changelogs = changelogData as Changelogs;

  const { latestReleases, previousReleases } = React.useMemo(() => {
    const latest: Release[] = [];
    const previous: Release[] = [];
    for (const packageName of Object.keys(changelogs)) {
      if (!PRODUCTS.includes(SHORT_NAMES[packageName])) continue;
      const [first, ...rest] = listReleases(changelogs, packageName);
      if (first) latest.push(first);
      previous.push(...rest);
    }
    const byDate = (a: Release, b: Release) => b.record.timestamp - a.record.timestamp;
    return { latestReleases: latest.sort(byDate), previousReleases: previous.sort(byDate) };
  }, [changelogs]);

  const [product, setProduct] = React.useState<ShortNameValues | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [itemsToRender, setItemsToRender] = React.useState(DEFAULT_ITEMS_TO_RENDER);
  const packages = product ? [product] : PRODUCTS;

  const previousCount = React.useMemo(
    () =>
      previousReleases.filter(
        (item) =>
          packages.includes(SHORT_NAMES[item.packageName]) && matchesSearch(searchTerm, item),
      ).length,
    [previousReleases, packages, searchTerm],
  );

  const hasHandledHashRef = React.useRef(false);

  React.useEffect(() => {
    if (hasHandledHashRef.current || typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash.startsWith('#')) return;

    const [productPart, version] = decodeHash(hash).split('@');
    const platformPart =
      productPart === 'Reunite' || productPart === 'Studio' ? 'Platform' : productPart;
    const isTarget = (release: Release) =>
      toAnchorName(SHORT_NAMES[release.packageName]) === platformPart &&
      release.version === version;

    const previousIndex = previousReleases.findIndex(isTarget);
    if (latestReleases.some(isTarget) || previousIndex >= 0) {
      if (previousIndex >= itemsToRender) {
        setItemsToRender(previousIndex + 1);
        return;
      }
      hasHandledHashRef.current = true;
      const targetId = `${platformPart}@${version}`;
      if (`#${targetId}` !== hash) {
        window.history.replaceState(null, '', `#${targetId}`);
      }
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
      });
      return;
    }

    hasHandledHashRef.current = true;
    if (
      !ARCHIVED_PRODUCTS.map(toAnchorName).includes(productPart) &&
      !PRODUCTS.map(toAnchorName).includes(platformPart)
    ) {
      return;
    }

    // The archive keeps the historical name of the platform.
    const archiveHash = `#${platformPart === 'Platform' ? 'Reunite' : productPart}@${version}`;
    const archivePath = window.location.pathname.replace(/\/changelog\/?$/, '/changelog-realm');
    window.location.replace(`${archivePath}${archiveHash}`);
  }, [latestReleases, previousReleases, itemsToRender]);

  return (
    <HighlightContext.Provider value={[searchTerm]}>
      <Wrapper>
        <DocumentationLayout tableOfContent={null} feedback={null}>
          <Markdown>
            <HeaderSection>
              <CustomHeading level={1} id="changelog">
                Changelog
              </CustomHeading>
              <RssSubscription initialSelectedProducts={PRODUCTS} productLabels={PRODUCTS} />
            </HeaderSection>
            <ControlsWrap>
              <ProductFilter role="group" aria-label="Filter releases by product">
                {[null, ...PRODUCTS].map((option) => (
                  <Button
                    key={option ?? 'all'}
                    size="small"
                    variant={option === product ? 'primary' : 'outlined'}
                    aria-pressed={option === product}
                    onClick={() => {
                      setProduct(option);
                      setItemsToRender(DEFAULT_ITEMS_TO_RENDER);
                    }}
                  >
                    {option ?? 'All'}
                  </Button>
                ))}
              </ProductFilter>
              <SearchInput
                placeholder="Search changelog"
                value={searchTerm}
                onChange={(value) => {
                  setSearchTerm(value);
                  setItemsToRender(DEFAULT_ITEMS_TO_RENDER);
                }}
                isLoading={false}
              />
            </ControlsWrap>

            <ChangelogSection items={latestReleases} packages={packages} isLatestRelease={true}>
              {(filteredItems) =>
                filteredItems.length > 0 && (
                  <LatestReleaseSection>
                    <SectionHeader>Latest releases</SectionHeader>
                    {filteredItems}
                  </LatestReleaseSection>
                )
              }
            </ChangelogSection>

            <ChangelogSection
              items={previousReleases}
              packages={packages}
              itemsToRender={itemsToRender}
              isPreviousRelease={true}
            >
              {(filteredItems) =>
                filteredItems.length > 0 && (
                  <PreviousReleasesSection>
                    <SectionHeader>Previous releases</SectionHeader>
                    {filteredItems}
                  </PreviousReleasesSection>
                )
              }
            </ChangelogSection>

            {previousCount > itemsToRender && (
              <ShowMoreSection>
                <Button onClick={() => setItemsToRender((prev) => prev + DEFAULT_ITEMS_TO_RENDER)}>
                  Load more
                </Button>
              </ShowMoreSection>
            )}

            <ArchiveNote>
              Looking for earlier releases? See the{' '}
              <a href="./changelog-realm">
                archived changelog of Reunite, Realm, Redoc, Revel, and Reef
              </a>
              .
            </ArchiveNote>
          </Markdown>
        </DocumentationLayout>
      </Wrapper>
    </HighlightContext.Provider>
  );
}

/** The hash without `#`; feed links percent-encode the `@`. */
function decodeHash(hash: string): string {
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return hash.slice(1);
  }
}

/** The stable releases of the package that are on this page and have changes, newest first, with the changes of the dependencies released together with each. */
function listReleases(changelogs: Changelogs, packageName: string): Release[] {
  const releases: Release[] = [];
  for (const [version, record] of Object.entries(changelogs[packageName])) {
    if (version.includes('-next') || !isListedRelease(packageName, record)) continue;
    const resolvedRecord = resolveDepsDeep(changelogs, record);
    if (hasChanges(resolvedRecord)) {
      releases.push({ record: resolvedRecord, packageName, version });
    }
  }
  return releases.sort((a, b) => b.record.timestamp - a.record.timestamp);
}

function resolveDepsDeep(
  changelogs: Changelogs,
  entry: ChangelogEntry,
  seen: string[] = [],
): ChangelogEntry {
  const resolved = { ...entry };
  resolved.changes = { ...entry.changes };

  if (Object.keys(entry?.dependencies || []).length > 0) {
    for (const [depPackage, depVersion] of Object.entries(entry.dependencies)) {
      if (seen.includes(depPackage)) {
        continue;
      }

      const normPackage = depPackage === '@redocly/portal' ? '@redocly/realm' : depPackage;
      const depEntry = changelogs[normPackage]?.[depVersion];

      // If timestamp is different, it means the dependency was updated in a previous release, so no need to include it again
      if (!depEntry || depEntry.timestamp !== entry.timestamp) continue;

      const resolvedDep = resolveDepsDeep(changelogs, depEntry, [...seen, depPackage]);

      resolved.changes.minor = resolved.changes.minor.concat(resolvedDep.changes.minor);
      resolved.changes.patch = resolved.changes.patch.concat(resolvedDep.changes.patch);
    }
  }
  resolved.changes.minor = Array.from(new Set(resolved.changes.minor));
  resolved.changes.patch = Array.from(new Set(resolved.changes.patch));
  return resolved;
}

const ProductFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Wrapper = styled.div`
  [data-component-name='Breadcrumbs/Breadcrumb'] {
    display: none;
  }

  [data-component-name='Markdown/Markdown'] {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .tag-product-realm,
  .tag-product-reunite,
  .tag-product-reef,
  .tag-product-revel,
  .tag-product-redoc {
    border-radius: 6px;
    color: white;
    border: 0;
    gap: 0;
    text-transform: inherit;
  }

  .tag-product-realm {
    background: linear-gradient(90deg, #1677ff 0%, #08c7e0 100%);
  }

  .tag-product-reunite {
    background: linear-gradient(134deg, #207dff 0%, #9461ff 91.65%);
  }

  .tag-product-reef {
    background: #a45cff;
  }

  .tag-product-revel {
    background: #735cff;
  }

  .tag-product-redoc {
    background: linear-gradient(270deg, #1677ff 0%, #30a9ff 100%);
  }

  .tag-version {
    background-color: transparent;
    border: 1px solid var(--text-color-primary);
    border-radius: 6px;
    gap: 0;
    text-transform: inherit;
  }
`;

const ControlsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 12px;
  flex-wrap: wrap;

  [data-component-name='Search/SearchInput'] {
    --search-input-icon-color: var(--input-content-placeholder-color);
    --search-input-gap: 8px;

    max-width: 250px;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
    height: 34px;

    [data-component-name='icons/SearchIcon/SearchIcon'] {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
    }

    input {
      background: transparent;
    }
  }
`;

const ArchiveNote = styled.p`
  margin-top: 24px;
  color: var(--text-color-secondary);
`;

const ShowMoreSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;

  button {
    font-size: var(--font-size-base);
    line-height: 22px;
    background: var(--border-color-secondary);
    border: 1px solid var(--border-color-primary);
  }
`;

const LatestReleaseSection = styled.div`
  border-bottom: 1px solid var(--border-color-primary);
`;

const PreviousReleasesSection = styled.div`
  margin-top: 24px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const CustomHeading = styled(Heading)`
  margin-top: 0 !important;
  margin-bottom: 0 !important;
`;
