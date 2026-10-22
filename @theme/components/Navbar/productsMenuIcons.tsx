import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg.attrs({ 'aria-hidden': true, focusable: false })`
  display: block;
  flex: none;
  width: 14px;
  height: 14px;
`;

const Carbon = ({ children }: { children: React.ReactNode }) => (
  <Svg viewBox="0 0 32 32" fill="currentColor">
    {children}
  </Svg>
);

export const ArrowIcon = () => (
  <Carbon>
    <path d="M18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6z" />
  </Carbon>
);

export const StarIcon = () => (
  <Carbon>
    <path d="M16,2l-4.55,9.22L1.28,12.69l7.36,7.18L6.9,30,16,25.22,25.1,30,23.36,19.87l7.36-7.17L20.55,11.22Z" />
  </Carbon>
);

/** Purple-to-pink sparkle used for Platform and the agents. */
export const AiIcon = () => (
  <Svg viewBox="0 0 32 32">
    <defs>
      <linearGradient id="products-menu-ai" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#7a69ee" />
        <stop offset="1" stopColor="#d72e81" />
      </linearGradient>
    </defs>
    <path
      fill="url(#products-menu-ai)"
      d="M13 6l2.4 7.6L23 16l-7.6 2.4L13 26l-2.4-7.6L3 16l7.6-2.4zM24 3l1.1 3.4L28.5 7.5l-3.4 1.1L24 12l-1.1-3.4L19.5 7.5l3.4-1.1z"
    />
  </Svg>
);

export const GithubIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
);
