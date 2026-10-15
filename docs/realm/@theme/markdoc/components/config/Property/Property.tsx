import * as React from 'react';
import styled from 'styled-components';
import { Products, Plan } from '../utils/types';
import PropertyCondition from './PropertyCondition';
import { useThemeHooks } from '@redocly/theme/core/hooks';
import { withPathPrefix } from '@redocly/theme/core/utils';

type PropertyManifestItem = {
  route: string;
  title: string;
  description: string;
  products?: Products[];
  plans?: Plan[];
};

type SharedDataHooks = {
  usePageSharedData: <T>(key: string) => T | undefined;
};

// Built by docs/realm/@theme/plugins/config-properties.js, keyed by the
// option page's path relative to docs/realm/config/.
const PROPERTIES_KEY = 'realm-config-properties';

function normalizeFileKey(p: string): string {
  let r = p.trim();
  if (r.startsWith('./')) r = r.slice(2);
  if (r.startsWith('/')) r = r.slice(1);
  if (r.startsWith('docs/realm/config/')) r = r.slice('docs/realm/config/'.length);
  return r;
}

export interface ConfigPropertyProps {
  file: string;
}

export function ConfigProperty({ file }: ConfigPropertyProps): React.ReactElement {
  const { usePageSharedData } = useThemeHooks() as unknown as SharedDataHooks;
  const properties = usePageSharedData<Record<string, PropertyManifestItem>>(PROPERTIES_KEY);
  const meta = properties?.[normalizeFileKey(file)];

  if (!meta) {
    return (
      <PropertyItem>
        <PropertyTitleContainer>
          <PropertyTitle as={'span'}>Unknown config property</PropertyTitle>
        </PropertyTitleContainer>
        <PropertyDescription>No metadata found for: {file}</PropertyDescription>
      </PropertyItem>
    );
  }
  return (
    <PropertyItem>
      <PropertyTitleContainer>
        <PropertyTitle href={withPathPrefix(meta.route)}>{meta.title}</PropertyTitle>
        <PropertyCondition plans={meta.plans} products={meta.products} />
      </PropertyTitleContainer>
      <PropertyDescription>{meta.description}</PropertyDescription>
    </PropertyItem>
  );
}

const PropertyItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  gap: 4px;
`;

const PropertyTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const PropertyTitle = styled.a`
  font-size: var(--font-size-lg);
  color: var(--link-color-primary);
`;

const PropertyDescription = styled.p`
  line-height: var(--line-height-base);
  color: var(--text-color-secondary);
  font-size: var(--font-size-base);
  margin: 0 !important;
`;
