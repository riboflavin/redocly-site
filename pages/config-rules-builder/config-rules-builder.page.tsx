import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { RulesBuilder } from '@redocly/config-rules-builder';

export const frontmatter = {
  seo: {
    title: 'Config Rules Builder',
    description: 'Build and manage your configuration rules with ease.',
  },
  slug: '/config-rules-builder',
};

const PAGE_PADDING = 24;
const MIN_BUILDER_HEIGHT = 480;
// Below this width the builder stacks its panels and ignores `height`.
const STACKED_LAYOUT_MAX_WIDTH = 1024;

export default function RulesBuilderPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClientSide, setIsClientSide] = useState(false);
  const [builderHeight, setBuilderHeight] = useState(MIN_BUILDER_HEIGHT);

  useEffect(() => setIsClientSide(true), []);

  // The `height` prop sizes only the two-panel area; the builder's own header sits above it.
  // Measure how much the rendered builder exceeds that height and subtract it from the viewport.
  useLayoutEffect(() => {
    if (!isClientSide) return;

    const fit = () => {
      const builder = containerRef.current?.firstElementChild;
      if (!builder || window.innerWidth <= STACKED_LAYOUT_MAX_WIDTH) return;
      const rect = builder.getBoundingClientRect();
      const chromeHeight = rect.height - builderHeight;
      const next = Math.max(
        MIN_BUILDER_HEIGHT,
        Math.floor(window.innerHeight - rect.top - chromeHeight - PAGE_PADDING),
      );
      if (Math.abs(next - builderHeight) > 1) setBuilderHeight(next);
    };

    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [isClientSide, builderHeight]);

  return (
    <PageBackground>
      <PageContainer ref={containerRef}>
        {isClientSide ? (
          <RulesBuilder height={builderHeight} />
        ) : (
          <div style={{ minHeight: MIN_BUILDER_HEIGHT }} />
        )}
      </PageContainer>
    </PageBackground>
  );
}

const PageBackground = styled.div`
  background: var(--color-warm-grey-2);
  min-height: calc(100vh - var(--navbar-offset));
`;

const PageContainer = styled.div`
  max-width: 1504px;
  margin: 0 auto;
  padding: ${PAGE_PADDING}px;
  box-sizing: border-box;
`;
