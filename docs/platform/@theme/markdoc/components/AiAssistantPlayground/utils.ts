import type { Palette, PlaygroundConfig } from './types';

import {
  BOOLEAN_ATTRIBUTES,
  CDN_SCRIPT_URL,
  COLOR_KEYS,
  COLOR_VARIABLES,
  DARK_COLORS,
  LIGHT_COLORS,
  PROJECT_URL_PLACEHOLDER,
} from './constants';

/** `bottom-right` reads as "Bottom right" in the controls, while the attribute keeps its own value. */
export function formatOption(value: string): string {
  const spaced = value.replace(/-/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function parseSuggestions(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Attribute name/value pairs for the current config. `color-mode` is always present; every other
 * attribute is present only when its value differs from the widget default.
 */
export function toAttributes(config: PlaygroundConfig): Array<[string, string]> {
  const suggestions = parseSuggestions(config.suggestions);
  const pairs: Array<[string, string | null]> = [
    ['variant', config.variant === 'widget' ? null : config.variant],
    ['position', config.position === 'bottom-right' ? null : config.position],
    ['color-mode', config.colorMode],
    ['width', config.width.trim() || null],
    ['height', config.height.trim() || null],
    ['resizable', config.resizable ? '' : null],
    ['movable', config.movable && config.variant === 'widget' ? '' : null],
    ['header-title', config.headerTitle.trim() || null],
    ['logo', config.logo.trim() || null],
    ['trigger-text', config.triggerText.trim() || null],
    ['welcome-message', config.welcomeMessage.trim() || null],
    ['suggestions', suggestions.length > 0 ? JSON.stringify(suggestions) : null],
    ['suggestions-heading', config.suggestionsHeading.trim() || null],
    ['placeholder', config.placeholder.trim() || null],
    ['disclaimer', config.disclaimer.trim() || null],
  ];

  return pairs.filter((pair): pair is [string, string] => pair[1] !== null);
}

function toCssValue(value: string): string {
  return value.replace(/\/\*|\*\/|[;{}<>]/g, '').trim();
}

function colorDeclarations(palette: Palette, defaults: Palette): string[] {
  const declarations: string[] = [];
  for (const key of COLOR_KEYS) {
    const color = palette[key];
    if (color.toLowerCase() === defaults[key]) {
      continue;
    }
    for (const variable of COLOR_VARIABLES[key]) {
      declarations.push(`${variable}: ${color};`);
    }
    if (key === 'accent') {
      declarations.push(
        `--button-bg-color-primary-hover: color-mix(in srgb, ${color} 85%, black);`,
        `--button-bg-color-primary-pressed: color-mix(in srgb, ${color} 75%, black);`,
      );
    }
  }
  return declarations;
}

function sharedDeclarations(config: PlaygroundConfig): string[] {
  const declarations: string[] = [];
  const fontFamily = toCssValue(config.fontFamily);
  if (fontFamily) {
    declarations.push(`--font-family-base: ${fontFamily};`);
  }
  const cornerRadius = toCssValue(config.cornerRadius);
  if (cornerRadius) {
    declarations.push(`--ai-assistant-widget-panel-border-radius: ${cornerRadius};`);
  }
  return declarations;
}

function elementRule(declarations: string[], indent = ''): string {
  return [
    `${indent}redocly-ai-assistant {`,
    ...declarations.map((declaration) => `${indent}  ${declaration}`),
    `${indent}}`,
  ].join('\n');
}

function colorSchemeRule(scheme: 'light' | 'dark', declarations: string[]): string {
  return [`@media (prefers-color-scheme: ${scheme}) {`, elementRule(declarations, '  '), '}'].join(
    '\n',
  );
}

/**
 * The CSS of the snippet: only the values that differ from the widget defaults, or an empty string
 * when nothing changed. With the `system` color mode, each palette sits in its own
 * `prefers-color-scheme` block.
 */
export function buildStyleSheet(config: PlaygroundConfig): string {
  const shared = sharedDeclarations(config);
  const light = colorDeclarations(config.lightColors, LIGHT_COLORS);
  const dark = colorDeclarations(config.darkColors, DARK_COLORS);

  if (config.colorMode !== 'system') {
    const declarations = [...shared, ...(config.colorMode === 'dark' ? dark : light)];
    return declarations.length > 0 ? elementRule(declarations) : '';
  }

  const rules: string[] = [];
  if (shared.length > 0) {
    rules.push(elementRule(shared));
  }
  if (light.length > 0) {
    rules.push(colorSchemeRule('light', light));
  }
  if (dark.length > 0) {
    rules.push(colorSchemeRule('dark', dark));
  }
  return rules.join('\n\n');
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

export function buildSnippet(config: PlaygroundConfig, projectUrl: string): string {
  const lines = [`<script src="${CDN_SCRIPT_URL}"></script>`, ''];

  const styleSheet = buildStyleSheet(config);
  if (styleSheet) {
    lines.push(
      '<style>',
      ...styleSheet.split('\n').map((line) => (line ? `  ${line}` : line)),
      '</style>',
      '',
    );
  }

  lines.push(
    '<redocly-ai-assistant',
    `  api-url="${escapeAttribute(projectUrl.trim() || PROJECT_URL_PLACEHOLDER)}"`,
  );
  for (const [name, value] of toAttributes(config)) {
    if (BOOLEAN_ATTRIBUTES.has(name)) {
      lines.push(`  ${name}`);
    } else if (name === 'suggestions') {
      lines.push(`  suggestions='${value.replace(/&/g, '&amp;').replace(/'/g, '&#39;')}'`);
    } else {
      lines.push(`  ${name}="${escapeAttribute(value)}"`);
    }
  }
  lines.push('></redocly-ai-assistant>');

  return lines.join('\n');
}
