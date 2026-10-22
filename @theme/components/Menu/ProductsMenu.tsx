import styled from 'styled-components';
import React from 'react';

import type { DrilldownMenuItemDetails, ItemState } from '@redocly/theme/core/types';

import { Link } from '@redocly/theme/components/Link/Link';
import { ArrowRightIcon } from '@redocly/theme/icons/ArrowRightIcon/ArrowRightIcon';

import {
  CLI_COMMANDS,
  GITHUB_REPOS,
  getProductMeta,
  resolveProductsMenu,
} from '../Navbar/productsMenuData';
import { AiIcon, GithubIcon } from '../Navbar/productsMenuIcons';
import { useGithubStars } from '../Navbar/useGithubStars';
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
 * `ProductsDropdown`: The platform with its tools, the API docs framework, then the open source
 * tools with their GitHub stars and, for Redocly CLI, its commands.
 */
export function ProductsMenu({ items, className }: MenuListProps): JSX.Element {
  const { studio, framework, cli, redocCe, studioItems } = resolveProductsMenu(items);

  return (
    <MenuWrapper className={className} data-component-name="Menu/ProductsMenu">
      <Content>
        {studio && (
          <Card>
            <CardHead item={studio} />
            <SubItems>
              {studioItems.map((item) => (
                <SubItem key={item.label} to={item.link}>
                  <SubItemName>
                    {item.label}
                    {item.tag && (
                      <AiNew>
                        {item.ai && <AiIcon />}
                        {item.tag}
                      </AiNew>
                    )}
                  </SubItemName>
                  <Description>{item.description}</Description>
                </SubItem>
              ))}
            </SubItems>
          </Card>
        )}
        {framework && (
          <Card>
            <CardHead item={framework} />
          </Card>
        )}
        <GroupLabel>Open source</GroupLabel>
        {cli && (
          <Card>
            <CardHead item={cli} stars />
            <Chips>
              {CLI_COMMANDS.map(({ command, link }) => (
                <Command key={command} to={link}>
                  <Prompt aria-hidden="true">$</Prompt>
                  {command}
                </Command>
              ))}
            </Chips>
          </Card>
        )}
        {redocCe && (
          <Card>
            <CardHead item={redocCe} stars />
          </Card>
        )}
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

const CardHead = ({ item, stars }: { item: ItemState; stars?: boolean }) => {
  const meta = getProductMeta(item.link);
  return (
    <CardLink to={item.link as string}>
      <CardText>
        <TitleRow>
          <Title>{item.label}</Title>
          {meta?.tag && <Tag>{meta.tag}</Tag>}
          {stars && <GithubStars link={item.link as string} />}
        </TitleRow>
        <Description>{meta?.description}</Description>
      </CardText>
      <ArrowCircle aria-hidden="true">
        <ArrowRightIcon size="14px" color="--color-arrow" />
      </ArrowCircle>
    </CardLink>
  );
};

const GithubStars = ({ link }: { link: string }) => {
  const { repo, fallbackStars } = GITHUB_REPOS[link];
  const count = useGithubStars(repo, fallbackStars);
  return (
    <Stars aria-label={`${count} GitHub stars`}>
      <GithubIcon />
      {count}
    </Stars>
  );
};

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Inter, var(--font-family-base);

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 12px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--products-menu-layer-bg);
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
`;

const CardLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;

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

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > svg {
    width: 14px;
    height: 14px;
  }
`;

const Title = styled.span`
  color: var(--text-color-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`;

const Description = styled.span`
  display: block;
  color: var(--text-color-secondary);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 6px;
  border-radius: 9999px;
  background: var(--color-warm-grey-2);
  color: var(--text-color-secondary);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
`;

const SubItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 6px;
  border-top: 1px solid var(--products-menu-border-color);
`;

const SubItem = styled(Link)`
  display: block;
  padding: 6px 0;
`;

const SubItemName = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Command = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 8px;
  border-radius: 6px;
  background: var(--products-menu-command-bg);
  color: var(--text-color-primary);
  font-family: 'DM Mono', var(--code-font-family);
  font-size: 12px;
  line-height: 1;
`;

const Prompt = styled.span`
  color: var(--text-color-disabled);
`;

const GroupLabel = styled.p`
  margin: 8px 0 0;
  padding: 0 4px;
  color: var(--text-color-helper);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

const AiNew = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 20px;
  padding: 0 7px 0 6px;
  border-radius: 999px;
  background: var(--color-purple-1);
  color: var(--color-purple-7);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;

  svg {
    width: 11px;
    height: 11px;
  }
`;

const Stars = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text-color-secondary);
  font-size: 12px;
  line-height: 18px;

  svg {
    width: 11px;
    height: 11px;
  }
`;
