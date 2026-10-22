import type { COLOR_KEYS, COLOR_MODES, POSITIONS, TABS, VARIANTS } from './constants';

export type Variant = (typeof VARIANTS)[number];
export type Position = (typeof POSITIONS)[number];
export type ColorMode = (typeof COLOR_MODES)[number];
export type ColorKey = (typeof COLOR_KEYS)[number];
export type Tab = (typeof TABS)[number];

export type Palette = Record<ColorKey, string>;

export type PlaygroundConfig = {
  variant: Variant;
  position: Position;
  colorMode: ColorMode;
  width: string;
  height: string;
  resizable: boolean;
  movable: boolean;
  lightColors: Palette;
  darkColors: Palette;
  fontFamily: string;
  cornerRadius: string;
  headerTitle: string;
  logo: string;
  triggerText: string;
  welcomeMessage: string;
  suggestions: string;
  suggestionsHeading: string;
  placeholder: string;
  disclaimer: string;
};
