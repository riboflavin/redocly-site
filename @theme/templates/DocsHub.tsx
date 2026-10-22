import * as React from 'react';
import styled from 'styled-components';

import { useThemeHooks } from '@redocly/theme/core/hooks';
import { PageActionsContext } from '@redocly/theme/core/contexts';
import { Markdown } from '@redocly/theme/components/Markdown/Markdown';

type HubHooks = {
  usePageSharedData: <T>(key: string) => T | undefined;
  useMarkdocRenderer: (ast: unknown) => React.ReactNode;
};

// The docs hub is a page of card groups, so it gets the full content width
// instead of the reading column the docs layout reserves for prose.
export default function DocsHub() {
  const { usePageSharedData, useMarkdocRenderer } = useThemeHooks() as unknown as HubHooks;
  const document = usePageSharedData<{ ast?: unknown }>('document');
  const body = useMarkdocRenderer(document?.ast);

  return (
    <Wrapper data-component-name="Templates/DocsHub">
      <PageActionsContext.Provider value={true}>
        <Markdown>{body}</Markdown>
      </PageActionsContext.Provider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 48px 16px 96px;
  max-width: 1200px;

  @media screen and (min-width: 900px) {
    padding: 64px 48px 120px;
  }
`;
