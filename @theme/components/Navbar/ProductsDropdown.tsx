import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import type { ResolvedNavItem, ResolvedNavLinkItem } from '@redocly/config';

import { Link } from '@redocly/theme/components/Link/Link';

import { AiIcon, ArrowIcon, GithubIcon } from './productsMenuIcons';
import {
  CLI_COMMANDS,
  GITHUB_REPOS,
  getProductMeta,
  resolveProductsMenu,
} from './productsMenuData';
import { useGithubStars } from './useGithubStars';

import type { MenuItem } from './productsMenuData';

// Variant E ("Everything visible, dropdown") of the navbar menu design artifact: The platform and
// its tools with the API docs framework on the left, the open source tools on the right.

export function ProductsDropdown({ items }: { items: ResolvedNavItem[] }): JSX.Element {
  const { studio, framework, cli, redocCe, studioItems } = resolveProductsMenu(
    items as ResolvedNavLinkItem[],
  );

  return (
    <Panel data-component-name="Navbar/ProductsDropdown">
      <Columns>
        <Core>
          {studio && <Head item={studio} />}
          <Items>
            {studioItems.map((item) => (
              <Item key={item.label} item={item} />
            ))}
          </Items>
          {framework && (
            <FrameworkRow>
              <Head item={framework} />
            </FrameworkRow>
          )}
        </Core>
        <OpenSource>
          {cli && (
            <Card $grow>
              <CardHead item={cli} />
              <CommandsBlock>
                <CommandsLabel>Explore commands</CommandsLabel>
                <Commands>
                  {CLI_COMMANDS.map(({ command, link }) => (
                    <Command key={command} to={link}>
                      {command}
                    </Command>
                  ))}
                </Commands>
              </CommandsBlock>
            </Card>
          )}
          {redocCe && (
            <Card>
              <CardHead item={redocCe} />
            </Card>
          )}
        </OpenSource>
      </Columns>
    </Panel>
  );
}

const Head = ({ item }: { item: ResolvedNavLinkItem }) => (
  <HeadLink to={item.link}>
    <HeadName>{item.label}</HeadName>
    <HeadDescription>{getProductMeta(item.link)?.description}</HeadDescription>
    <Go aria-hidden="true">
      <ArrowIcon />
    </Go>
  </HeadLink>
);

const Item = ({ item }: { item: MenuItem }) => (
  <ItemLink to={item.link}>
    <ItemName>
      {item.label}
      {item.tag && (
        <AiNew>
          {item.ai && <AiIcon />}
          {item.tag}
        </AiNew>
      )}
    </ItemName>
    <ItemDescription>{item.description}</ItemDescription>
    <ItemArrow aria-hidden="true">
      <ArrowIcon />
    </ItemArrow>
  </ItemLink>
);

const CardHead = ({ item }: { item: ResolvedNavLinkItem }) => {
  const meta = getProductMeta(item.link);
  const github = GITHUB_REPOS[item.link];
  const stars = useGithubStars(github.repo, github.fallbackStars);
  return (
    <CardLink to={item.link}>
      <CardName>
        {item.label}
        {meta?.tag && <Version>{meta.tag}</Version>}
        <Stars aria-label={`${stars} GitHub stars`}>
          <GithubIcon />
          {stars}
        </Stars>
      </CardName>
      <CardDescription>{meta?.description}</CardDescription>
      <Go aria-hidden="true">
        <ArrowIcon />
      </Go>
    </CardLink>
  );
};

const ease = 'cubic-bezier(0.2, 0, 0, 1)';

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const Panel = styled.div`
  width: min(920px, calc(100vw - 80px));
  box-sizing: border-box;
  padding: 8px;
  background: var(--products-menu-bg);
  border: 1px solid var(--products-menu-border-color);
  border-radius: 16px;
  box-shadow:
    0 8px 24px 8px rgba(0, 0, 0, 0.04),
    0 4px 12px 0 rgba(0, 0, 0, 0.08);
  font-family: var(--font-inter);
  white-space: normal;
  text-align: left;

  a {
    text-decoration: none;
    color: inherit;
  }

  > * {
    animation: ${appear} 220ms ${ease} 60ms both;
  }

  @media (prefers-reduced-motion: reduce) {
    > * {
      animation: none;
    }
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 16px;
  align-items: stretch;
`;

const Core = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding: 0 0 4px;
`;

// Arrow in a circle; the link it belongs to fills it on hover.
const Go = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-top: -15px;
  box-sizing: border-box;
  border: 1px solid var(--color-warm-grey-3);
  border-radius: 50%;
  background: var(--products-menu-bg);
  color: var(--text-color-primary);
  transition:
    background-color 0.15s ${ease},
    border-color 0.15s ${ease};

  svg {
    transition: transform 0.25s ${ease};
  }
`;

// Same hover as the cards on the home page: the ring fills and the arrow points up-right.
const goHover = css`
  border-color: transparent;
  background: var(--bg-color-active);

  svg {
    transform: rotate(-45deg);
  }
`;

const HeadLink = styled(Link)`
  position: relative;
  display: block;
  margin-bottom: 6px;
  padding: 6px 56px 6px 10px;
  border-radius: 10px;

  &:hover ${Go}, &:focus-visible ${Go} {
    ${goHover}
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
  }
`;

const HeadName = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color-primary);
  font-family: var(--font-red-hat-display);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const HeadDescription = styled.span`
  display: block;
  margin-top: 2px;
  color: var(--text-color-description);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const Items = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2px 24px;
  align-content: center;
`;

const ItemArrow = styled.span`
  position: absolute;
  top: 50%;
  right: 20px;
  display: flex;
  width: 14px;
  height: 14px;
  margin-top: -7px;
  color: var(--text-color-primary);
  opacity: 0;
  transition: opacity 0.15s ${ease};
`;

const ItemLink = styled(Link)`
  position: relative;
  display: block;
  padding: 7px 40px 7px 10px;
  border-radius: 10px;
  transition: background 0.15s ${ease};

  &:hover,
  &:focus-visible {
    background: var(--products-menu-item-bg-hover);
  }

  &:hover ${ItemArrow}, &:focus-visible ${ItemArrow} {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
  }
`;

const ItemName = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-color-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

const ItemDescription = styled.span`
  display: block;
  color: var(--text-color-description);
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
`;

const AiNew = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 20px;
  padding: 0 6px 0 5px;
  border-radius: 4px;
  background: var(--color-purple-1);
  color: var(--color-purple-7);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;

  svg {
    width: 11px;
    height: 11px;
  }
`;

const FrameworkRow = styled.div`
  margin-top: 6px;
  padding-top: 7px;
  border-top: 1px solid var(--products-menu-border-color);

  ${HeadLink} {
    margin-bottom: 0;
  }
`;

const OpenSource = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const Card = styled.div<{ $grow?: boolean }>`
  display: flex;
  flex: ${({ $grow }) => ($grow ? '1' : 'none')};
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--products-menu-border-color);
  border-radius: 12px;
  background: var(--products-menu-layer-bg);
`;

const CardLink = styled(Link)`
  position: relative;
  display: block;
  padding: 14px 56px 6px 16px;

  &:only-child {
    padding-bottom: 14px;
  }

  &:hover ${Go}, &:focus-visible ${Go} {
    ${goHover}
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: -2px;
  }
`;

const CardName = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color-primary);
  font-family: var(--font-red-hat-display);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const Version = styled.span`
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--color-warm-grey-2);
  color: var(--text-color-secondary);
  font-family: var(--font-dm-mono);
  font-size: 11px;
  font-weight: 500;
`;

const Stars = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text-color-secondary);
  font-family: var(--font-inter);
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;

  svg {
    width: 13px;
    height: 13px;
  }
`;

const CardDescription = styled.span`
  display: block;
  color: var(--text-color-secondary);
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
`;

const CommandsBlock = styled.div`
  margin-top: auto;
`;

const CommandsLabel = styled.p`
  margin: 0;
  padding: 0 16px 4px;
  color: var(--text-color-helper);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

const Commands = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0 16px 12px;
`;

const Command = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 7px;
  box-sizing: border-box;
  border: 1px solid var(--products-menu-border-color);
  border-radius: 6px;
  background: var(--products-menu-bg);
  font-family: var(--font-dm-mono);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  transition:
    background 0.15s ${ease},
    color 0.15s ${ease},
    border-color 0.15s ${ease};

  &&,
  &&:visited {
    color: var(--text-color-primary);
  }

  &::before {
    content: '$';
    margin-right: 6px;
    color: var(--text-color-helper);
  }

  &&:hover {
    border-color: var(--color-blue-1);
    background: var(--color-blue-1);
    color: var(--color-blue-7);
  }

  &:hover::before {
    color: var(--color-blue-5);
  }
`;
