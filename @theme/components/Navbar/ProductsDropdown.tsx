import React from 'react';
import styled from 'styled-components';

import type { ResolvedNavItem, ResolvedNavLinkItem } from '@redocly/config';

import { Link } from '@redocly/theme/components/Link/Link';
import { ArrowRightIcon } from '@redocly/theme/icons/ArrowRightIcon/ArrowRightIcon';

import {
  CLI_COMMANDS,
  REDOCLY_CLI_LINK,
  REUNITE_LINK,
  SIDEBAR_PRODUCT_LINKS,
  getProductMeta,
  groupBySeparator,
} from './productsMenuData';

export function ProductsDropdown({ items }: { items: ResolvedNavItem[] }): JSX.Element {
  const sections = groupBySeparator(items as ResolvedNavLinkItem[]);
  const products = sections['Products'] ?? [];
  const agents = sections['Agents'] ?? [];
  const openSource = sections['Open Source'] ?? [];

  const reunite = products.find((item) => item.link === REUNITE_LINK);
  const sidebarProducts = products.filter((item) => SIDEBAR_PRODUCT_LINKS.includes(item.link));
  const gridProducts = products.filter(
    (item) => item !== reunite && !SIDEBAR_PRODUCT_LINKS.includes(item.link),
  );
  const cli = openSource.find((item) => item.link === REDOCLY_CLI_LINK);
  const openSourceCards = openSource.filter((item) => item !== cli);

  return (
    <Panel data-component-name="Navbar/ProductsDropdown">
      <Sidebar>
        {reunite && (
          <FeaturedLink to={reunite.link}>
            <HeaderRow>
              <IconText>
                {reunite.icon && <ProductIcon src={reunite.icon} alt="" />}
                <Title>{reunite.label}</Title>
              </IconText>
              <ArrowButton />
            </HeaderRow>
          </FeaturedLink>
        )}
        <Divider />
        <SidebarList>
          {sidebarProducts.map((item) => (
            <ProductItem key={item.link} item={item} />
          ))}
          {agents.length > 0 && (
            <Section>
              <SectionLabel>Agents</SectionLabel>
              {agents.map((item) => (
                <ProductItem key={item.link} item={item} />
              ))}
            </Section>
          )}
        </SidebarList>
      </Sidebar>

      <Main>
        <SectionLabel>Products</SectionLabel>
        <ProductsGrid>
          {gridProducts.map((item) => (
            <ProductItem key={item.link} item={item} />
          ))}
        </ProductsGrid>
        <Cards>
          {cli && (
            <Card>
              <CardLink to={cli.link}>
                <CardText>
                  <Title>{cli.label}</Title>
                  <Description>{getProductMeta(cli.link)?.description}</Description>
                </CardText>
                <ArrowButton />
              </CardLink>
              <Commands>
                {CLI_COMMANDS.map(({ command, link }) => (
                  <Command key={command} to={link}>
                    <Prompt aria-hidden="true">$</Prompt>
                    <CommandName>{command}</CommandName>
                  </Command>
                ))}
              </Commands>
            </Card>
          )}
          {openSourceCards.map((item) => {
            const meta = getProductMeta(item.link);
            return (
              <Card key={item.link}>
                <CardLink to={item.link}>
                  <CardText>
                    <TitleWithTag>
                      <Title>{item.label}</Title>
                      {meta?.tag && <PillTag>{meta.tag}</PillTag>}
                    </TitleWithTag>
                    <Description>{meta?.description}</Description>
                  </CardText>
                  <ArrowButton />
                </CardLink>
              </Card>
            );
          })}
        </Cards>
      </Main>
    </Panel>
  );
}

function ProductItem({ item }: { item: ResolvedNavLinkItem }): JSX.Element {
  const meta = getProductMeta(item.link);
  return (
    <ItemLink to={item.link} $product={item.link.replace(/^\//, '')}>
      <TitleRow>
        <IconText>
          {item.icon && <ProductIcon src={item.icon} alt="" />}
          <Title>{item.label}</Title>
        </IconText>
        {meta?.tag && <Tag>{meta.tag}</Tag>}
      </TitleRow>
      {meta?.description && <ItemDescription>{meta.description}</ItemDescription>}
    </ItemLink>
  );
}

function ArrowButton(): JSX.Element {
  return (
    <ArrowCircle aria-hidden="true">
      <ArrowRightIcon size="14px" color="--color-arrow" />
    </ArrowCircle>
  );
}

const Panel = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: 769px;
  padding: 8px;
  box-sizing: border-box;
  background: var(--products-menu-bg);
  border-bottom: 1px solid var(--products-menu-border-color);
  border-radius: 12px;
  box-shadow: var(--products-menu-shadow);
  font-family: Inter, var(--font-family-base);
  white-space: normal;
  text-align: left;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  width: 256px;
  min-height: 376px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 12px;
  background: var(--products-menu-layer-bg);
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 473px;
  width: 473px;
  padding-top: 8px;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--products-menu-border-color);
`;

const SidebarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SectionLabel = styled.p`
  margin: 0;
  padding-left: 12px;
  color: var(--text-color-description);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 232px);
  gap: 4px 0;
  margin: 8px 0;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const HeaderRow = styled(TitleRow)`
  justify-content: space-between;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const ProductIcon = styled.img`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const Title = styled.span`
  color: var(--text-color-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleWithTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Description = styled.span`
  color: var(--text-color-secondary);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

const ItemDescription = styled(Description)`
  padding-left: 24px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  min-width: 20px;
  padding: 0 4px;
  border-radius: 4px;
  background: var(--products-menu-tag-bg);
  color: var(--products-menu-tag-color);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
`;

const PillTag = styled(Tag)`
  padding: 0 8px;
  border-radius: 9999px;
`;

const ItemLink = styled(Link)<{ $product?: string }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${({ $product }) =>
      `var(--${$product}-color-hover, var(--products-menu-item-bg-hover))`};
  }

  &:focus-visible {
    outline: 1px solid var(--color-focus);
  }
`;

const FeaturedLink = styled(Link)`
  display: flex;
  padding: 8px 12px;
  border-radius: 6px;
`;

const ArrowCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-ontonal);

  svg {
    transition: transform 0.3s ease-in-out;
  }

  ${FeaturedLink}:hover & svg {
    transform: rotate(-45deg);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--products-menu-layer-bg);
`;

const CardLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;

  &:hover ${ArrowCircle} svg {
    transform: rotate(-45deg);
  }
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
  min-width: 0;
`;

const Commands = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;
`;

const Command = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 6px;
  background: var(--products-menu-command-bg);
  font-family: 'DM Mono', var(--code-font-family);
  font-size: 12px;
  line-height: 18px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: var(--products-menu-command-bg-hover);
  }
`;

const Prompt = styled.span`
  color: var(--text-color-disabled);
`;

const CommandName = styled.span`
  color: var(--text-color-primary);
`;
