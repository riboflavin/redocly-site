import styled from 'styled-components';
import React from 'react';

import type { DrilldownMenuItemDetails, ItemState } from '@redocly/theme/core/types';

import { Link } from '@redocly/theme/components/Link/Link';
import { ArrowRightIcon } from '@redocly/theme/icons/ArrowRightIcon/ArrowRightIcon';

import {
  CLI_COMMANDS,
  REDOCLY_CLI_LINK,
  REUNITE_LINK,
  SIDEBAR_PRODUCT_LINKS,
  getProductMeta,
  groupBySeparator,
} from '../Navbar/productsMenuData';
import { FooterBlock, StyledLogInButton, StyledSignUpButton } from './MainMenu';

export type MenuListProps = {
  items: ItemState[];
  depth?: number;
  isMobile?: boolean;
  className?: string;
  onDrilldownOpen?: (drilldownDetails: DrilldownMenuItemDetails) => void;
};

/**
 * Mobile drilldown for the Products navbar group. Mirrors the desktop
 * `ProductsDropdown` grouping: Reunite, Respect Monitoring and the agents come
 * first, then the remaining products, then the open-source cards. Section
 * headings are intentionally not rendered; a divider separates the two groups.
 */
export function ProductsMenu({ items, className }: MenuListProps): JSX.Element {
  const sections = groupBySeparator(items);
  const products = sections['Products'] ?? [];
  const agents = sections['Agents'] ?? [];
  const openSource = sections['Open Source'] ?? [];

  const reunite = products.find((item) => item.link === REUNITE_LINK);
  const platformItems = [
    ...(reunite ? [reunite] : []),
    ...products.filter((item) => SIDEBAR_PRODUCT_LINKS.includes(item.link as string)),
    ...agents,
  ];
  const productItems = products.filter(
    (item) => item !== reunite && !SIDEBAR_PRODUCT_LINKS.includes(item.link as string),
  );
  const cli = openSource.find((item) => item.link === REDOCLY_CLI_LINK);
  const openSourceCards = openSource.filter((item) => item !== cli);

  return (
    <MenuWrapper className={className} data-component-name="Menu/ProductsMenu">
      <Content>
        <Group>
          {platformItems.map((item) => (
            <ProductItem key={item.link} item={item} />
          ))}
        </Group>
        <Divider />
        <Group>
          {productItems.map((item) => (
            <ProductItem key={item.link} item={item} />
          ))}
        </Group>
        <Cards>
          {cli && (
            <Card>
              <CardLink to={cli.link as string}>
                <CardText>
                  <Title>{cli.label}</Title>
                  <Description>{getProductMeta(cli.link)?.description}</Description>
                </CardText>
                <ArrowCircle aria-hidden="true">
                  <ArrowRightIcon size="14px" color="--color-arrow" />
                </ArrowCircle>
              </CardLink>
              <Commands>
                {CLI_COMMANDS.map(({ command, link }) => (
                  <Command key={command} to={link}>
                    <Prompt aria-hidden="true">$</Prompt>
                    <CommandName>{command}</CommandName>
                  </Command>
                ))}
              </Commands>
              <SeeAll to={cli.link as string}>
                See all commands
                <SeeAllArrow aria-hidden="true">
                  <ArrowRightIcon size="13px" color="--bg-color" />
                </SeeAllArrow>
              </SeeAll>
            </Card>
          )}
          {openSourceCards.map((item) => {
            const meta = getProductMeta(item.link);
            return (
              <Card key={item.link}>
                <CardLink to={item.link as string}>
                  <CardText>
                    <TitleRow>
                      <Title>{item.label}</Title>
                      {meta?.tag && <PillTag>{meta.tag}</PillTag>}
                    </TitleRow>
                    <Description>{meta?.description}</Description>
                  </CardText>
                  <ArrowCircle aria-hidden="true">
                    <ArrowRightIcon size="14px" color="--color-arrow" />
                  </ArrowCircle>
                </CardLink>
              </Card>
            );
          })}
        </Cards>
      </Content>
      <FooterBlock>
        <StyledSignUpButton
          to="https://auth.cloud.redocly.com/registration"
          className="landing-button"
        >
          Start 30-day free trial
        </StyledSignUpButton>
        <StyledLogInButton to="https://auth.cloud.redocly.com/login" className="landing-button">
          Log In
        </StyledLogInButton>
      </FooterBlock>
    </MenuWrapper>
  );
}

function ProductItem({ item }: { item: ItemState }): JSX.Element {
  const meta = getProductMeta(item.link);
  return (
    <ItemLink to={item.link as string}>
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

const MenuWrapper = styled.ul`
  padding: var(--menu-padding);
  margin: var(--menu-margin);
  list-style: var(--menu-list-style);
  color: var(--menu-content-color);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: Inter, var(--font-family-base);

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 20px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--products-menu-border-color);
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
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

const ItemLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 8px;
  border-radius: 8px;

  &:active {
    background: var(--products-menu-item-bg-hover);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--products-menu-layer-bg);

  &:last-child {
    padding: 14px 16px;
  }
`;

const CardLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
  min-width: 0;
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
`;

const Commands = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding-bottom: 16px;
`;

const Command = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--products-menu-command-bg);
  font-family: 'DM Mono', var(--code-font-family);
  font-size: 12px;
  line-height: 18px;
`;

const Prompt = styled.span`
  color: var(--text-color-disabled);
`;

const CommandName = styled.span`
  color: var(--text-color-primary);
`;

const SeeAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color-primary);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const SeeAllArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--button-bg);
`;
