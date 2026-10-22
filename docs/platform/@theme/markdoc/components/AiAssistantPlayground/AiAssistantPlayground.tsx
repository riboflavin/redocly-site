import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { CodeBlock } from '@redocly/theme/components/CodeBlock/CodeBlock';
import { useElementSize } from '@redocly/theme/core/hooks';
import { NumberedItem } from '@redocly/theme/markdoc/components/NumberedList/NumberedItem';
import { NumberedList } from '@redocly/theme/markdoc/components/NumberedList/NumberedList';

import type { ColorKey, ColorMode, PlaygroundConfig, Tab } from './types';

import {
  CDN_SCRIPT_URL,
  COLOR_KEYS,
  COLOR_LABELS,
  COLOR_MODES,
  DEFAULT_CONFIG,
  MANAGED_ATTRIBUTES,
  POSITIONS,
  PROJECT_URL_PLACEHOLDER,
  TABS,
  VARIANTS,
} from './constants';
import { buildSnippet, buildStyleSheet, formatOption, toAttributes } from './utils';

/**
 * The preview asks the page's own origin, so the published site, a preview deployment, and a
 * local server each reach their own endpoint without a CORS allowance. The path starts at the
 * origin root because the root project answers `_ask-ai`; the path-prefixed variants under
 * `/docs` do not exist. The parent resolves it and passes an absolute URL, because inside the
 * frame `window.location.href` is `about:srcdoc`, which `new URL()` rejects as a base.
 */
const ASK_AI_PATH = '/_ask-ai';

type RedoclyAssistantApi = {
  setConfig(config: Record<string, unknown> | null): void;
  close(): void;
};

type PreviewWindow = Window & { RedoclyAssistant?: RedoclyAssistantApi };

/**
 * At a width of 768px or less, the widget does not let users move or resize it. In the preview,
 * the widget measures the width of the iframe.
 */
const PREVIEW_MIN_WIDTH = 800;

const PREVIEW_MIN_SCALE = 0.75;

function toPreviewScale(stageWidth: number): number {
  const scale = stageWidth / PREVIEW_MIN_WIDTH;
  return scale >= 1 || scale < PREVIEW_MIN_SCALE ? 1 : scale;
}

/**
 * Two of the widget's own rules measure the iframe instead of the browser window. Its
 * `max-width: 768px` panel rules would give a frame narrower than 768px the full-width mobile
 * panel; the override points the mobile width variables back at the desktop one, on the panel
 * element itself, because a `width` attribute lands there as an inline
 * `--ai-assistant-widget-panel-width` that a host-level rule cannot see. The conversation input's
 * anti-zoom rule (16px minimum under 672px, for iOS Safari) also measures the iframe; the
 * override restores the desktop font size.
 */
const PREVIEW_LAYOUT_STYLE = `
@media screen and (max-width: 672px) {
  input, textarea { font-size: var(--search-ai-conversation-input-font-size, 14px) !important; }
}
[data-testid='ai-assistant-panel'] {
  --ai-assistant-widget-panel-width-mobile: var(--ai-assistant-widget-panel-width, 380px);
  --ai-assistant-widget-panel-width-mobile-full: var(--ai-assistant-widget-panel-width, 380px);
}`;

const PREVIEW_LAYOUT_ATTRIBUTE = 'data-preview-layout';

/** Idempotent: the parent applies every config change, and the style belongs to the frame. */
function injectPreviewLayoutStyle(shadowRoot: ShadowRoot): void {
  if (shadowRoot.querySelector(`style[${PREVIEW_LAYOUT_ATTRIBUTE}]`)) {
    return;
  }
  const style = shadowRoot.ownerDocument.createElement('style');
  style.setAttribute(PREVIEW_LAYOUT_ATTRIBUTE, '');
  style.textContent = PREVIEW_LAYOUT_STYLE;
  shadowRoot.append(style);
}

const PLAYGROUND_STYLE_ATTRIBUTE = 'data-playground-style';

function applyPlaygroundStyle(previewDoc: Document, styleSheet: string): void {
  let style = previewDoc.head.querySelector<HTMLStyleElement>(
    `style[${PLAYGROUND_STYLE_ATTRIBUTE}]`,
  );
  if (!style) {
    style = previewDoc.createElement('style');
    style.setAttribute(PLAYGROUND_STYLE_ATTRIBUTE, '');
    previewDoc.head.append(style);
  }
  style.textContent = styleSheet;
}

/**
 * The preview runs in an iframe so the widget's fixed-position launcher, backdrop, and drawer
 * anchor to the stage instead of the documentation page. The stage paints its own light and dark
 * grounds, which keeps `color-mode="system"` honest: it follows the reader's `prefers-color-scheme`.
 *
 * The document carries no script and no `api-url`. A `srcdoc` frame inherits the host page's
 * Content Security Policy, and redocly.com allows no inline script, so the parent sets the
 * attribute and injects the layout style over the frame's DOM instead.
 */
const PREVIEW_DOCUMENT = `<!DOCTYPE html>
<html data-stage-theme="${DEFAULT_CONFIG.colorMode}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { margin: 0; height: 100%; }
  body {
    --stage-bg: #f7f8fa;
    --stage-dot: rgba(15, 23, 42, 0.09);
    background-color: var(--stage-bg);
    background-image: radial-gradient(var(--stage-dot) 1px, transparent 1px);
    background-size: 16px 16px;
    transition: background-color 0.2s ease;
  }
  html[data-stage-theme='dark'] body {
    --stage-bg: #14161a;
    --stage-dot: rgba(255, 255, 255, 0.07);
  }
  @media (prefers-color-scheme: dark) {
    html[data-stage-theme='system'] body {
      --stage-bg: #14161a;
      --stage-dot: rgba(255, 255, 255, 0.07);
    }
  }
</style>
<script src="${CDN_SCRIPT_URL}"></script>
</head>
<body>
<redocly-ai-assistant open></redocly-ai-assistant>
</body>
</html>`;

function SlidersIcon(): React.ReactElement {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 4.5h8M12.5 4.5H14M2 11.5h1.5M6 11.5h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="11" cy="4.5" r="1.9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="4.75" cy="11.5" r="1.9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

type SelectRowProps<T extends string> = {
  id: string;
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

function SelectRow<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: SelectRowProps<T>): React.ReactElement {
  return (
    <Row>
      <RowLabel htmlFor={id}>{label}</RowLabel>
      <SelectField>
        <Select id={id} value={value} onChange={(event) => onChange(event.target.value as T)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {formatOption(option)}
            </option>
          ))}
        </Select>
        <Chevron viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M4 6.25 8 10l4-3.75"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Chevron>
      </SelectField>
    </Row>
  );
}

type TextRowProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  /** Label above a full-width input, for long labels or long values. */
  stacked?: boolean;
  onChange: (value: string) => void;
};

function TextRow({
  id,
  label,
  value,
  placeholder,
  stacked = false,
  onChange,
}: TextRowProps): React.ReactElement {
  const RowWrapper = stacked ? StackedRow : Row;
  return (
    <RowWrapper>
      <RowLabel htmlFor={id}>{label}</RowLabel>
      <TextInput
        id={id}
        value={value}
        placeholder={placeholder}
        $stacked={stacked}
        onChange={(event) => onChange(event.target.value)}
      />
    </RowWrapper>
  );
}

type TextAreaRowProps = {
  id: string;
  label: string;
  value: string;
  rows: number;
  placeholder?: string;
  onChange: (value: string) => void;
};

function TextAreaRow({
  id,
  label,
  value,
  rows,
  placeholder,
  onChange,
}: TextAreaRowProps): React.ReactElement {
  return (
    <StackedRow>
      <RowLabel htmlFor={id}>{label}</RowLabel>
      <TextArea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </StackedRow>
  );
}

type SwitchFieldProps = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function SwitchField({
  id,
  label,
  description,
  checked,
  onChange,
}: SwitchFieldProps): React.ReactElement {
  return (
    <SwitchRow>
      <SwitchText>
        <SwitchLabel htmlFor={id}>{label}</SwitchLabel>
        <SwitchDescription id={`${id}-description`}>{description}</SwitchDescription>
      </SwitchText>
      <SwitchControl>
        <SwitchInput
          id={id}
          type="checkbox"
          aria-describedby={`${id}-description`}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <SwitchTrack aria-hidden="true" />
      </SwitchControl>
    </SwitchRow>
  );
}

export type AiAssistantPlaygroundProps = {
  /** `_ask-ai` endpoint the preview asks. Defaults to the page's own origin. */
  apiUrl?: string;
  /** Color mode the preview starts with and returns to on reset. Defaults to `system`. */
  colorMode?: ColorMode;
};

export function AiAssistantPlayground({
  apiUrl,
  colorMode = DEFAULT_CONFIG.colorMode,
}: AiAssistantPlaygroundProps): React.ReactElement {
  const initialConfig = React.useMemo<PlaygroundConfig>(
    () => ({ ...DEFAULT_CONFIG, colorMode }),
    [colorMode],
  );
  const [config, setConfig] = React.useState<PlaygroundConfig>(initialConfig);
  const [projectUrl, setProjectUrl] = React.useState('');
  const [customizeOpen, setCustomizeOpen] = React.useState(true);
  const [tab, setTab] = React.useState<Tab>('Layout');
  const [frameEpoch, setFrameEpoch] = React.useState(0);
  const [canvasSize, canvasRef] = useElementSize<HTMLDivElement>({ detectSizes: 'width' });
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const customizeButtonRef = React.useRef<HTMLButtonElement>(null);
  const appliedPositionRef = React.useRef(DEFAULT_CONFIG.position);

  // Attribute changes go straight to the live element. `setConfig({})` makes every instance
  // re-read its attributes, so the preview updates without reloading the frame. The frame's CDN
  // script can still be loading when a change lands (or the frame just reloaded), so the effect
  // retries until the widget has upgraded instead of dropping the change.
  React.useEffect(() => {
    const askAiUrl = apiUrl ?? new URL(ASK_AI_PATH, window.location.origin).href;

    const apply = (): boolean => {
      const frame = iframeRef.current;
      const previewWindow = frame?.contentWindow as PreviewWindow | null;
      const previewDoc = frame?.contentDocument;
      const element = previewDoc?.querySelector('redocly-ai-assistant');
      const shadowRoot = element?.shadowRoot;
      if (!previewWindow?.RedoclyAssistant || !previewDoc || !element || !shadowRoot) {
        return false;
      }

      injectPreviewLayoutStyle(shadowRoot);
      applyPlaygroundStyle(previewDoc, buildStyleSheet(config));
      element.setAttribute('api-url', askAiUrl);

      const attributes = new Map(toAttributes(config));
      for (const name of MANAGED_ATTRIBUTES) {
        const next = attributes.get(name);
        if (next === undefined) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, next);
        }
      }

      previewDoc.documentElement.dataset.stageTheme = config.colorMode;
      previewWindow.RedoclyAssistant.setConfig({});

      // The open chat window hides the Ask AI button, so close it to show where the button goes.
      if (appliedPositionRef.current !== config.position) {
        appliedPositionRef.current = config.position;
        previewWindow.RedoclyAssistant.close();
      }
      return true;
    };

    if (apply()) {
      return;
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (apply() || attempts >= 150) {
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [apiUrl, config, frameEpoch]);

  React.useEffect(() => {
    if (!customizeOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && popoverRef.current?.contains(document.activeElement)) {
        setCustomizeOpen(false);
        customizeButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (popoverRef.current?.contains(target) || customizeButtonRef.current?.contains(target)) {
        return;
      }
      setCustomizeOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [customizeOpen]);

  const update = <K extends keyof PlaygroundConfig>(key: K, value: PlaygroundConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  const updateColor = (palette: 'lightColors' | 'darkColors', key: ColorKey, value: string) => {
    setConfig((current) => ({ ...current, [palette]: { ...current[palette], [key]: value } }));
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (step === 0) {
      return;
    }
    event.preventDefault();
    const next = TABS[(TABS.indexOf(tab) + step + TABS.length) % TABS.length];
    if (next) {
      setTab(next);
      event.currentTarget.querySelector<HTMLButtonElement>(`#playground-tab-${next}`)?.focus();
    }
  };

  const isDefault = React.useMemo(
    () => JSON.stringify(config) === JSON.stringify(initialConfig),
    [config, initialConfig],
  );

  const previewScale = toPreviewScale(canvasSize.width);
  const controlsOnRight = config.position.endsWith('-left');
  const showLightColors = config.colorMode !== 'dark';
  const showDarkColors = config.colorMode !== 'light';

  return (
    <Wrapper data-component-name="AiAssistantPlayground/AiAssistantPlayground">
      <Stage>
        <StageOverlay $mirrored={controlsOnRight}>
          <OverlayButton
            ref={customizeButtonRef}
            type="button"
            aria-expanded={customizeOpen}
            onClick={() => setCustomizeOpen((open) => !open)}
          >
            <SlidersIcon />
            Customize
          </OverlayButton>
          <LiveBadge>
            <LiveDot aria-hidden="true" />
            Live preview
          </LiveBadge>
        </StageOverlay>

        {customizeOpen ? (
          <Popover
            ref={popoverRef}
            role="dialog"
            aria-label="Customize the assistant"
            $mirrored={controlsOnRight}
          >
            <TabList role="tablist" aria-label="Setting groups" onKeyDown={onTabKeyDown}>
              {TABS.map((name) => (
                <TabButton
                  key={name}
                  type="button"
                  role="tab"
                  id={`playground-tab-${name}`}
                  aria-selected={tab === name}
                  aria-controls={`playground-panel-${name}`}
                  tabIndex={tab === name ? 0 : -1}
                  $selected={tab === name}
                  onClick={() => setTab(name)}
                >
                  {name}
                </TabButton>
              ))}
            </TabList>

            <TabPanel
              role="tabpanel"
              id={`playground-panel-${tab}`}
              aria-labelledby={`playground-tab-${tab}`}
            >
              {tab === 'Layout' ? (
                <>
                  <SelectRow
                    id="playground-variant"
                    label="Variant"
                    value={config.variant}
                    options={VARIANTS}
                    onChange={(value) => update('variant', value)}
                  />
                  <SelectRow
                    id="playground-position"
                    label="Position"
                    value={config.position}
                    options={POSITIONS}
                    onChange={(value) => update('position', value)}
                  />
                  <TextRow
                    id="playground-width"
                    label="Width"
                    value={config.width}
                    placeholder="380px"
                    onChange={(value) => update('width', value)}
                  />
                  <TextRow
                    id="playground-height"
                    label="Height"
                    value={config.height}
                    placeholder="640px"
                    onChange={(value) => update('height', value)}
                  />
                  <SwitchField
                    id="playground-resizable"
                    label="Resizable"
                    description="Users can drag a handle to change the size."
                    checked={config.resizable}
                    onChange={(checked) => update('resizable', checked)}
                  />
                  {config.variant === 'widget' ? (
                    <SwitchField
                      id="playground-movable"
                      label="Movable"
                      description="Users can move the widget window by its header."
                      checked={config.movable}
                      onChange={(checked) => update('movable', checked)}
                    />
                  ) : null}
                </>
              ) : null}

              {tab === 'Style' ? (
                <>
                  <SelectRow
                    id="playground-color-mode"
                    label="Color mode"
                    value={config.colorMode}
                    options={COLOR_MODES}
                    onChange={(value) => update('colorMode', value)}
                  />
                  <ColorGrid $columns={Number(showLightColors) + Number(showDarkColors)}>
                    <span />
                    {showLightColors ? <ColorHeading>Light</ColorHeading> : null}
                    {showDarkColors ? <ColorHeading>Dark</ColorHeading> : null}
                    {COLOR_KEYS.map((key) => (
                      <React.Fragment key={key}>
                        <ColorName>{COLOR_LABELS[key]}</ColorName>
                        {showLightColors ? (
                          <ColorSwatch
                            type="color"
                            aria-label={`${COLOR_LABELS[key]}, light`}
                            value={config.lightColors[key]}
                            onChange={(event) =>
                              updateColor('lightColors', key, event.target.value)
                            }
                          />
                        ) : null}
                        {showDarkColors ? (
                          <ColorSwatch
                            type="color"
                            aria-label={`${COLOR_LABELS[key]}, dark`}
                            value={config.darkColors[key]}
                            onChange={(event) => updateColor('darkColors', key, event.target.value)}
                          />
                        ) : null}
                      </React.Fragment>
                    ))}
                  </ColorGrid>
                  <TextRow
                    id="playground-font"
                    label="Font"
                    value={config.fontFamily}
                    placeholder="Inter, sans-serif"
                    onChange={(value) => update('fontFamily', value)}
                  />
                  <TextRow
                    id="playground-corner-radius"
                    label="Corner radius"
                    value={config.cornerRadius}
                    placeholder="12px"
                    onChange={(value) => update('cornerRadius', value)}
                  />
                </>
              ) : null}

              {tab === 'Branding' ? (
                <>
                  <TextRow
                    id="playground-header-title"
                    label="Header title"
                    value={config.headerTitle}
                    placeholder="AI Assistant"
                    onChange={(value) => update('headerTitle', value)}
                  />
                  <TextRow
                    id="playground-logo"
                    label="Header icon"
                    value={config.logo}
                    placeholder="Emoji or image URL"
                    onChange={(value) => update('logo', value)}
                  />
                  <TextRow
                    id="playground-trigger-text"
                    label="Launcher label"
                    value={config.triggerText}
                    placeholder="Ask AI"
                    onChange={(value) => update('triggerText', value)}
                  />
                </>
              ) : null}

              {tab === 'Content' ? (
                <>
                  <TextAreaRow
                    id="playground-welcome-message"
                    label="Greeting"
                    rows={2}
                    value={config.welcomeMessage}
                    placeholder="Add a greeting shown when the chat opens"
                    onChange={(value) => update('welcomeMessage', value)}
                  />
                  <TextAreaRow
                    id="playground-suggestions"
                    label="Starter questions"
                    rows={3}
                    value={config.suggestions}
                    placeholder={'One question per line, for example:\nHow do I get an API key?'}
                    onChange={(value) => update('suggestions', value)}
                  />
                  <TextRow
                    id="playground-suggestions-heading"
                    label="Starter heading"
                    value={config.suggestionsHeading}
                    placeholder="Suggestions"
                    stacked
                    onChange={(value) => update('suggestionsHeading', value)}
                  />
                  <TextRow
                    id="playground-placeholder"
                    label="Input placeholder"
                    value={config.placeholder}
                    placeholder="Ask a question..."
                    stacked
                    onChange={(value) => update('placeholder', value)}
                  />
                  <TextRow
                    id="playground-disclaimer"
                    label="Disclaimer"
                    value={config.disclaimer}
                    placeholder="AI responses may contain mistakes."
                    stacked
                    onChange={(value) => update('disclaimer', value)}
                  />
                </>
              ) : null}
            </TabPanel>

            <PopoverFooter>
              <ResetButton
                type="button"
                onClick={() => setConfig(initialConfig)}
                disabled={isDefault}
              >
                Reset to defaults
              </ResetButton>
            </PopoverFooter>
          </Popover>
        ) : null}

        <StageCanvas ref={canvasRef}>
          <PreviewFrame
            ref={iframeRef}
            style={{
              width: `${100 / previewScale}%`,
              height: `${100 / previewScale}%`,
              maxWidth: 'none',
              transform: `scale(${previewScale})`,
            }}
            srcDoc={PREVIEW_DOCUMENT}
            title="AI assistant preview"
            onLoad={() => setFrameEpoch((epoch) => epoch + 1)}
          />
        </StageCanvas>
      </Stage>

      <InstallHeader>
        <InstallHeading>Install AI assistant</InstallHeading>
      </InstallHeader>
      <NumberedList>
        <NumberedItem
          index={1}
          isLast={false}
          headlineLevel={4}
          headline="Enter the URL of your Redocly project."
        >
          <ProjectUrlField
            id="playground-project-url"
            aria-label="URL of your Redocly project"
            value={projectUrl}
            placeholder={PROJECT_URL_PLACEHOLDER}
            $stacked
            onChange={(event) => setProjectUrl(event.target.value)}
          />
        </NumberedItem>
        <NumberedItem
          index={2}
          isLast={true}
          headlineLevel={4}
          headline="Copy the snippet to your site."
        >
          <CodeBlock
            lang="html"
            source={buildSnippet(config, projectUrl)}
            header={{ title: 'index.html', controls: { copy: {} } }}
          />
        </NumberedItem>
      </NumberedList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: var(--spacing-lg, 24px) 0;
`;

const TOOLBAR_HEIGHT = '56px';

const Stage = styled.div`
  position: relative;
  min-height: calc(640px + ${TOOLBAR_HEIGHT});
  border: 1px solid var(--border-color-primary);
  border-radius: var(--border-radius-lg, 8px);
  overflow: hidden;
`;

const StageCanvas = styled.div`
  position: absolute;
  inset: ${TOOLBAR_HEIGHT} 0 0;
  border-top: 1px solid var(--border-color-primary);
`;

const PreviewFrame = styled.iframe`
  display: block;
  border: 0;
  transform-origin: 0 0;
`;

const StageOverlay = styled.div<{ $mirrored: boolean }>`
  position: absolute;
  top: var(--spacing-sm, 12px);
  right: var(--spacing-sm, 12px);
  left: var(--spacing-sm, 12px);
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: ${({ $mirrored }) => ($mirrored ? 'row-reverse' : 'row')};
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const overlaySurface = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  background: var(--bg-color);
  border: 1px solid var(--border-color-primary);
  box-shadow: 0 1px 2px rgb(0 0 0 / 8%);
`;

const OverlayButton = styled.button`
  ${overlaySurface}
  padding: 6px 12px;
  border-radius: var(--border-radius-md, 6px);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: var(--bg-color-hover, rgba(128, 128, 128, 0.12));
  }
`;

const LiveBadge = styled.span`
  ${overlaySurface}
  padding: 4px 10px;
  border-radius: 999px;
  font-size: var(--font-size-xs, 12px);
  color: var(--text-color-secondary);
`;

const LiveDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
`;

const popoverIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Popover = styled.div<{ $mirrored: boolean }>`
  position: absolute;
  top: calc(var(--spacing-sm, 12px) + 42px);
  ${({ $mirrored }) => ($mirrored ? 'right' : 'left')}: var(--spacing-sm, 12px);
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: 300px;
  max-width: calc(100% - var(--spacing-lg, 24px));
  max-height: calc(100% - 66px);
  background: var(--bg-color);
  border: 1px solid var(--border-color-primary);
  border-radius: 10px;
  box-shadow:
    0 1px 2px rgb(0 0 0 / 6%),
    0 12px 32px rgb(0 0 0 / 14%);
  overflow: hidden;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${popoverIn} 0.15s ease-out;
  }
`;

const TabList = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: var(--spacing-md, 16px);
  padding: 0 var(--spacing-md, 16px);
  border-bottom: 1px solid var(--border-color-primary);
`;

const TabButton = styled.button<{ $selected: boolean }>`
  margin-bottom: -1px;
  padding: 10px 2px 9px;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;

  ${({ $selected }) =>
    $selected
      ? css`
          color: var(--text-color-primary);
          border-bottom-color: var(--color-primary-base, currentColor);
        `
      : css`
          color: var(--text-color-secondary);

          &:hover {
            color: var(--text-color-primary);
          }
        `}
`;

const TabPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: var(--spacing-xs, 8px);
  overflow-y: auto;
  padding: var(--spacing-sm, 12px) var(--spacing-md, 16px) var(--spacing-md, 16px);
`;

const PopoverFooter = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-end;
  padding: var(--spacing-xxs, 4px) var(--spacing-xs, 8px);
  border-top: 1px solid var(--border-color-primary);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm, 12px);
  min-height: 32px;
`;

const StackedRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
`;

const RowLabel = styled.label`
  flex: 0 0 auto;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  color: var(--text-color-secondary);
  cursor: pointer;
`;

const controlSurface = css`
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  background: var(--bg-color);
  border: 1px solid var(--border-color-primary);
  border-radius: var(--border-radius-md, 6px);
  padding: 5px 10px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: var(--text-color-description);
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-primary-base, currentColor);
    box-shadow: 0 0 0 3px var(--color-primary-bg, rgba(128, 128, 128, 0.2));
  }
`;

const TextInput = styled.input<{ $stacked: boolean }>`
  ${controlSurface}
  ${({ $stacked }) =>
    $stacked
      ? css`
          width: 100%;
        `
      : css`
          flex: 0 0 150px;
          min-width: 0;
        `}
`;

const TextArea = styled.textarea`
  ${controlSurface}
  width: 100%;
  resize: vertical;
  line-height: var(--line-height-sm);
`;

const SelectField = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 150px;
  min-width: 0;
`;

const Select = styled.select`
  ${controlSurface}
  width: 100%;
  appearance: none;
  padding-right: 30px;
`;

const Chevron = styled.svg`
  position: absolute;
  top: 50%;
  right: 9px;
  width: 14px;
  height: 14px;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-color-secondary);
`;

const ColorGrid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: 1fr repeat(${({ $columns }) => $columns}, 48px);
  align-items: center;
  gap: 6px var(--spacing-xs, 8px);
  padding: var(--spacing-xxs, 4px) 0;
`;

const ColorHeading = styled.span`
  font-size: var(--font-size-xs, 12px);
  color: var(--text-color-description);
  text-align: center;
`;

const ColorName = styled.span`
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
`;

const ColorSwatch = styled.input`
  width: 48px;
  height: 28px;
  padding: 2px;
  background: var(--bg-color);
  border: 1px solid var(--border-color-primary);
  border-radius: var(--border-radius-md, 6px);
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 0;
    border-radius: 4px;
  }

  &::-moz-color-swatch {
    border: 0;
    border-radius: 4px;
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-primary-base, currentColor);
    box-shadow: 0 0 0 3px var(--color-primary-bg, rgba(128, 128, 128, 0.2));
  }
`;

const SwitchTrack = styled.span`
  position: relative;
  display: block;
  flex: 0 0 auto;
  width: 32px;
  height: 18px;
  border-radius: 999px;
  background: var(--bg-color-active, rgba(128, 128, 128, 0.35));
  transition: background 0.15s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgb(0 0 0 / 25%);
    transition: transform 0.15s ease;
  }
`;

const SwitchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm, 12px);
  min-height: 32px;
`;

const SwitchLabel = styled.label`
  align-self: flex-start;
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  cursor: pointer;
`;

const SwitchControl = styled.label`
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  cursor: pointer;
`;

const SwitchText = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const SwitchDescription = styled.span`
  font-size: var(--font-size-xs, 12px);
  line-height: var(--line-height-xs, 1.4);
  color: var(--text-color-description);
`;

const SwitchInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  margin: 0;

  &:checked + ${SwitchTrack} {
    background: var(--color-primary-base, var(--text-color-primary));
  }

  &:checked + ${SwitchTrack}::after {
    transform: translateX(14px);
  }

  &:focus-visible + ${SwitchTrack} {
    box-shadow: 0 0 0 3px var(--color-primary-bg, rgba(128, 128, 128, 0.2));
  }
`;

const ResetButton = styled.button`
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  background: none;
  border: 0;
  border-radius: var(--border-radius-md, 6px);
  padding: 6px 8px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover:not(:disabled) {
    background: var(--bg-color-hover, rgba(128, 128, 128, 0.12));
    color: var(--text-color-primary);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const ProjectUrlField = styled(TextInput)`
  max-width: 420px;
`;

const InstallHeader = styled.div`
  margin: var(--spacing-lg, 24px) 0 var(--spacing-sm, 12px);
`;

const InstallHeading = styled.h3`
  margin: 0;
  font-size: var(--font-size-md);
  color: var(--text-color-primary);
`;
