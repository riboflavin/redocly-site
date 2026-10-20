import type { ColorKey, Palette, PlaygroundConfig } from './types';

export const CDN_SCRIPT_URL = 'https://cdn.redocly.com/ai-assistant/releases/latest/main.js';

export const PROJECT_URL_PLACEHOLDER = 'https://your-project.com';

export const VARIANTS = ['widget', 'modal', 'panel'] as const;

export const POSITIONS = [
  'bottom-right',
  'bottom-left',
  'bottom-center',
  'top-right',
  'top-left',
  'top-center',
] as const;

export const COLOR_MODES = ['system', 'light', 'dark'] as const;

export const COLOR_KEYS = ['accent', 'background', 'header', 'text', 'border', 'launcher'] as const;

export const TABS = ['Layout', 'Style', 'Branding', 'Content'] as const;

export const COLOR_LABELS: Record<ColorKey, string> = {
  accent: 'Accent',
  background: 'Background',
  header: 'Header',
  text: 'Text',
  border: 'Borders',
  launcher: 'Ask AI button',
};

export const COLOR_VARIABLES: Record<ColorKey, readonly string[]> = {
  accent: ['--button-bg-color-primary', '--search-ai-user-bg-color', '--link-color-primary'],
  background: ['--bg-color'],
  header: ['--search-ai-dialog-header-bg-color'],
  text: ['--text-color-primary', '--text-color-secondary'],
  border: ['--border-color-secondary'],
  launcher: ['--ai-assistant-trigger-bg-color'],
};

export const LIGHT_COLORS: Palette = {
  accent: '#1f7cff',
  background: '#ffffff',
  header: '#fbfbfc',
  text: '#1a1c21',
  border: '#ededf2',
  launcher: '#ffffff',
};

export const DARK_COLORS: Palette = {
  accent: '#1f7cff',
  background: '#22242b',
  header: '#2a2b33',
  text: '#fbfbfc',
  border: '#3b3c45',
  launcher: '#2a2b33',
};

export const DEFAULT_CONFIG: PlaygroundConfig = {
  variant: 'widget',
  position: 'bottom-right',
  colorMode: 'system',
  width: '',
  height: '',
  resizable: false,
  movable: false,
  lightColors: LIGHT_COLORS,
  darkColors: DARK_COLORS,
  fontFamily: '',
  cornerRadius: '',
  headerTitle: '',
  logo: '',
  triggerText: '',
  welcomeMessage: 'Hi! Ask me anything about these docs.',
  suggestions: 'How do I get started?\nHow do I authenticate?',
  suggestionsHeading: '',
  placeholder: '',
  disclaimer: '',
};

export const BOOLEAN_ATTRIBUTES: ReadonlySet<string> = new Set(['resizable', 'movable']);

/** Every attribute the playground writes, so a cleared control removes it from the element. */
export const MANAGED_ATTRIBUTES = [
  'variant',
  'position',
  'color-mode',
  'width',
  'height',
  'resizable',
  'movable',
  'header-title',
  'logo',
  'trigger-text',
  'welcome-message',
  'suggestions',
  'suggestions-heading',
  'placeholder',
  'disclaimer',
] as const;
