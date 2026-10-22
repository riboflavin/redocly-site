import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type ConsentRuntime = { open: () => void };

function getConsent(): ConsentRuntime | undefined {
  return (window as Window & { redocly?: { consent?: ConsentRuntime } }).redocly?.consent;
}

/**
 * Opens the Realm consent settings dialog. The custom footer replaces the Realm footer,
 * so Realm cannot place its own "Cookie preferences" link (`consent.settingsLink: none`).
 * Renders only in the browser and only when the consent runtime is on the page.
 */
export function CookiePreferencesButton(): JSX.Element | null {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    setAvailable(Boolean(getConsent()));
  }, []);

  if (!available) {
    return null;
  }

  return (
    <FooterButton type="button" data-cy="Cookie preferences" onClick={() => getConsent()?.open()}>
      Cookie preferences
    </FooterButton>
  );
}

const FooterButton = styled.button`
  align-self: flex-start;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  text-align: left;
  color: var(--text-color-secondary);
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 8px;
`;
