import React from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router';

import type { ResolvedNavItem, ResolvedNavLinkItem, ResolvedNavGroupItem } from '@redocly/config';

import { getPathnameForLocale, withPathPrefix } from '@redocly/theme/core/utils';
import { useThemeHooks } from '@redocly/theme/core/hooks';
import { LaunchIcon } from '@redocly/theme/icons/LaunchIcon/LaunchIcon';
import { Link } from '@redocly/theme/components/Link/Link';
import { Dropdown } from '@redocly/theme/components/Dropdown/Dropdown';

import { ProductsDropdown } from './ProductsDropdown';

type NavbarItemProps = {
  navItem: ResolvedNavItem;
  className?: string;
};

export function NavbarItem({ navItem, className }: NavbarItemProps): JSX.Element | null {
  const { pathname } = useLocation();
  const { useTranslate, useI18nConfig, useTelemetry } = useThemeHooks();
  const { translate } = useTranslate();
  const { defaultLocale, currentLocale, locales } = useI18nConfig();
  const telemetry = useTelemetry();
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    setIsTouch(window.ontouchstart !== undefined);
  }, []);

  if ((navItem as ResolvedNavLinkItem).link) {
    const item = navItem as ResolvedNavLinkItem;

    const isActive =
      pathname ===
      withPathPrefix(getPathnameForLocale(item.link, defaultLocale, currentLocale, locales));
    return (
      <NavbarMenuItem
        active={isActive}
        data-component-name="Navbar/NavbarItem"
        className={className}
        onClick={() => telemetry.send('navbar_menu_item_clicked', { type: 'link' })}
      >
        <NavbarLink to={item.link} external={item.external} target={item.target} active={isActive}>
          {item.icon ? <NavbarIcon url={item.icon} /> : null}
          <NavbarLabel>{translate(item.labelTranslationKey, item.label)}</NavbarLabel>
          {item.external ? <LaunchIcon size="10px" /> : null}
        </NavbarLink>
      </NavbarMenuItem>
    );
  } else if ((navItem as ResolvedNavGroupItem).items) {
    const item = navItem as ResolvedNavGroupItem;
    const groupItems = item.items as ResolvedNavItem[];
    const isActive = groupItems.some(
      (groupItem) =>
        groupItem.link &&
        pathname ===
          withPathPrefix(
            getPathnameForLocale(groupItem.link, defaultLocale, currentLocale, locales),
          ),
    );

    return (
      <NavbarMenuItemDropdown
        trigger={
          <NavbarMenuItem
            active={isActive}
            data-component-name="Navbar/NavbarItem"
            className={className}
            onClick={() => telemetry.send('navbar_menu_item_clicked', { type: 'group' })}
          >
            <NavbarIcon url={item.icon} />
            <NavbarLabel>{translate(item.labelTranslationKey, item.label)}</NavbarLabel>
            <ArrowIcon
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="16" height="16" fill="none" style={{ mixBlendMode: 'multiply' }} />
              <path
                d="M8 10.9998L3 5.9998L3.7 5.2998L8 9.5998L12.3 5.2998L13 5.9998L8 10.9998Z"
                fill="#1C1C1C"
              />
            </ArrowIcon>
          </NavbarMenuItem>
        }
        triggerEvent={isTouch ? 'click' : 'hover'}
      >
        <DropdownCasket>
          <DropdownWrapper>
            <ProductsDropdown items={groupItems} />
          </DropdownWrapper>
        </DropdownCasket>
      </NavbarMenuItemDropdown>
    );
  } else return null;
}

// Transparent strip between the trigger and the panel so the hover does not
// break while the pointer travels down to the menu.
const DropdownCasket = styled.div`
  background-color: transparent;
  padding: 18px 0 0 0;
  position: relative;
  width: 200px;
`;

const DropdownWrapper = styled.div`
  && {
    position: absolute;
    top: 100%;
    left: -150px;
    margin: 0;
    cursor: default;
    z-index: 2;
  }
`;

const ArrowIcon = styled.svg`
  margin-left: 5px;
  transition: transform 0.6 ease-in-out;
`;

const NavbarMenuItemDropdown = styled(Dropdown)`
  height: 10px;

  li {
    padding: 5px 10px 5px 12px;
  }

  &:hover {
    ${ArrowIcon} {
      transform: rotate(180deg);
    }
  }
`;

const NavbarLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ active }) =>
    active ? 'var(--navbar-item-text-color-active)' : 'var(--navbar-text-color)'};
  text-decoration: ${({ active }) =>
    active ? 'var(--navbar-item-text-decoration-active)' : 'none'};
`;

const NavbarMenuItem = styled.li<{ active?: boolean }>`
  display: flex;
  padding: 5px 12px;
  font-family: var(--navbar-font-family);
  text-align: center;
  align-items: center;
  line-height: var(--navbar-item-line-height);
  font-weight: var(--navbar-item-font-weight);
  font-size: var(--navbar-font-size);
  z-index: 1;

  border-radius: var(--navbar-item-border-radius);
  border-bottom: ${({ active }) =>
    active ? 'var(--navbar-item-bottom-border-active)' : 'var(--navbar-item-bottom-border)'};

  background-color: ${({ active }) => active && 'var(--navbar-item-bg-color-active)'};
  color: ${({ active }) =>
    active ? 'var(--navbar-item-text-color-active)' : 'var(--navbar-text-color)'};
`;

const NavbarLabel = styled.span`
  cursor: pointer;
  vertical-align: middle;
`;

const NavbarIcon = styled.i<{ url?: string }>`
  ${({ url }) =>
    url &&
    css`
      background-image: url('${url}');
      width: var(--navbar-item-icon-width);
      height: var(--navbar-item-icon-height);
      display: inline-block;
      background-size: contain;
      margin-right: var(--navbar-item-icon-margin-right);
      vertical-align: middle;
      background-position: center;
      background-repeat: no-repeat;
    `}
`;
