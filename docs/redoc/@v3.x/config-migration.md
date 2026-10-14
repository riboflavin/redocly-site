---
seo:
  title: Migration from Redoc CE 2.x to 3.x
---

# Migration from Redoc CE 2.x to 3.x

Redoc CE 3.x is a new renderer.
It keeps the `<redoc>` element, the `init` function, and the `RedocStandalone` component.
However, the script format, some names, and the set of configuration options changed.
This page lists what to update when you move a Redoc CE 2.x page to 3.x.

## Before you migrate

The `latest` CDN URL and the `latest` Docker image tag serve Redoc CE 3.x.
A page that loads the `latest` bundle with a classic `<script src>` tag stays blank.
To keep a page on 2.x until you migrate it, pin the major version, for example `https://cdn.redoc.ly/redoc/v2.x/bundles/redoc.standalone.js` or the `redocly/redoc:v2.5.3` image.

## Page and API changes

{% table %}

- Redoc CE 2.x
- Redoc CE 3.x

---

- `<script src="…/bundles/redoc.standalone.js">`
- `<script type="module" src="…/bundles/redoc.standalone.js">`.
  The bundle is an ES module and lives in the `bundles` folder of the package.

---

- `Redoc.init(specOrSpecUrl, options, element, callback)` on the global `Redoc` object
- `init(specOrSpecUrl, options, element)` imported from the bundle: `import { init } from '…/bundles/redoc.standalone.js'`.
  There is no callback argument and no global object.

---

- OpenAPI only
- OpenAPI, AsyncAPI, and GraphQL descriptions, detected from the file.
  See [Supported specifications](./supported-specifications.md).

---

- `<RedocStandalone specUrl="…" />` and `<RedocStandalone spec={…} />`
- Unchanged.
  `specUrl` also accepts AsyncAPI documents and GraphQL schema files, and `spec` also accepts a GraphQL schema in SDL.
  `options` and `onLoaded` keep their names.

---

- `RedocStandalone` keeps the reader's position in the URL fragment
- Inside a React Router router, such as `HashRouter`, `RedocStandalone` uses that router.
  Without one, it uses path-based routes under `basePath`, for example `/docs/events/listspecialevents`.
  Set `basePath` to the path the documentation is served at, and configure your server to return the page for every path under it.

---

- Peer dependencies `react`, `react-dom`, `mobx`, `styled-components`, `core-js`
- Peer dependencies `react` and `react-dom` 18.3 or 19, `react-router` 7 or 8, `styled-components` 6, and `@redocly/config`.
  `mobx` and `core-js` are no longer needed.

---

- Deep links in the URL fragment, for example `#tag/Events/operation/listSpecialEvents`
- Deep links in the URL fragment by default, for example `#/events/listspecialevents`, or path-based with `router="history"` and `base-path`.
  Links in the 2.x format redirect to the new route when the page loads.
  Links to a schema (`#schema/<name>`) or to a single security scheme (`#section/Authentication/<scheme>`) have no matching page in 3.x.

---

- Search only when `disableSearch` is not set
- Search is always available.

---

- Telemetry not collected
- Anonymous [telemetry](./telemetry.md) is collected by default and turned off with `disable-telemetry="true"`.

---

- `<!-- Redoc-Inject: <security-definitions> -->` in `info.description`
- Removed.
  Each operation shows its security requirements with a **View security details** action.

---

- Vendor extensions from the 2.x list
- All 2.x extensions keep working, except the `x-code-samples` spelling: rename it to `x-codeSamples`.
  A code sample in a language outside the [`codeSamples`](./config.md#other-options) list, such as Kotlin or Shell, is hidden until you add the language to the list.
  3.x adds `x-mcp`.
  See [specification extensions](./redoc-vendor-extensions.md) for the full list and the Redocly-only extensions Redoc CE ignores.

---

- `redocly/redoc:v2.5.3` Docker image
- Image tags have no `v` prefix, for example `redocly/redoc:3.0.0`.
  The image sends `X-Frame-Options: DENY`, so browsers don't display the documentation inside an `iframe`.

{% /table %}

## Configuration options

The following table contains the changes in configuration options between Redoc CE 2.x and Redoc CE 3.x.
Options that stayed the same are listed to confirm they still apply.

{% table %}

- Option in 2.x
- Type in 2.x
- In 3.x

---

- `allowedMdComponents`
- `object`
- Removed

---

- `disableSearch`
- `boolean`
- Removed.
  Search is always available.

---

- `downloadDefinitionUrl`, `downloadFileName`
- `string`
- Replaced by `downloadUrls`, a list of `{ title, url }` objects

---

- `downloadUrls`
- `[{ title?, url }]`
- Unchanged

---

- `enumSkipQuotes`
- `boolean`
- Removed

---

- `expandDefaultServerVariables`
- `boolean`
- Removed

---

- `expandResponses`
- `{ [code: string]: boolean } | 'all'`
- Removed

---

- `expandSingleSchemaField`
- `boolean`
- Removed

---

- `generatedPayloadSamplesMaxDepth`
- `number`
- Replaced by `generatedSamplesMaxDepth`

---

- `generatedSamplesMaxDepth`
- `number`
- Unchanged.
  The default changed from `10` to `8`.

---

- `hideDownloadButton`
- `boolean`
- Renamed to `hideDownloadButtons`

---

- `hideDownloadButtons`
- `boolean`
- Unchanged

---

- `hideFab`
- `boolean`
- Removed

---

- `hideHostname`
- `boolean`
- Removed

---

- `hideLoading`
- `boolean`
- Unchanged

---

- `hidePropertiesPrefix`
- `boolean`
- Unchanged.
  The default changed from `true` to `false`.

---

- `hideRequestPayloadSample`
- `boolean`
- Removed

---

- `hideSchemaPattern`
- `boolean`
- Unchanged

---

- `hideSchemaTitles`
- `boolean`
- Unchanged

---

- `hideSecuritySection`
- `boolean`
- Removed

---

- `hideSingleRequestSampleTab`
- `boolean`
- Removed

---

- `ignoreNamedSchemas`
- `[string] | string`
- Unchanged

---

- `jsonSampleExpandLevel`
- `number | 'all'`
- Renamed to `jsonSamplesExpandLevel`

---

- `jsonSamplesExpandLevel`
- `number | 'all'`
- Unchanged

---

- `labels`
- `object`
- Removed

---

- `maxDisplayedEnumValues`
- `number`
- Unchanged.
  When not set, 3.x displays `10` values before collapsing the rest, where 2.x displayed all of them.

---

- `menuToggle`
- `boolean`
- Removed

---

- `minCharacterLengthToInitSearch`
- `number`
- Removed

---

- `nativeScrollbars`
- `boolean`
- Removed

---

- `nonce`
- `string`
- Removed

---

- `onlyRequiredInSamples`
- `boolean`
- Unchanged

---

- `pathInMiddlePanel`
- `boolean`
- Removed

---

- `payloadSampleIdx`
- `number`
- Removed

---

- `requiredPropsFirst`
- `boolean`
- Renamed to `sortRequiredPropsFirst`.
  The old name is still accepted.

---

- `sanitize`
- `boolean`
- Unchanged

---

- `schemaDefinitionsTagName`
- `string`
- Unchanged

---

- `schemaExpansionLevel`
- `number | 'all'`
- Renamed to `schemasExpansionLevel`

---

- `schemasExpansionLevel`
- `number | 'all'`
- Unchanged

---

- `scrollYOffset`
- `number | string | () => number`
- Accepts a number or a function.
  CSS selector strings are no longer supported.

---

- `showExtensions`
- `boolean | [string]`
- Unchanged.
  As an attribute, a comma-separated string is also accepted.

---

- `showObjectSchemaExamples`
- `boolean`
- Removed

---

- `showSecuritySchemeType`
- `boolean`
- Removed

---

- `showWebhookVerb`
- `boolean`
- Removed

---

- `sideNavStyle`
- `string`
- Removed

---

- `simpleOneOfTypeLabel`
- `boolean`
- Removed

---

- `sortEnumValuesAlphabetically`, `sortOperationsAlphabetically`, `sortPropsAlphabetically`, `sortTagsAlphabetically`
- `boolean`
- Removed

---

- `sortRequiredPropsFirst`
- `boolean`
- Unchanged

---

- `theme`
- `object`
- Removed.
  Customize the appearance with [CSS variables](./deployment/html.md#theme-configuration) instead.

---

- `unstable_ignoreMimeParameters`
- `boolean`
- Removed

---

- `untrustedSpec`
- `boolean`
- Renamed to `sanitize`

{% /table %}

## New options in 3.x

- `layout`: `three-panel` or `stacked`.
- `router` and `basePath`: hash or path-based deep links.
- `disableTelemetry`: turn off telemetry.
- `events`: callbacks for reader interactions.
- `codeSamples.languages`: order and labels of the sample languages.
- `skipBundle`: skip resolving `$ref`s in a description object.
- AsyncAPI and GraphQL options such as `jsonSamplesDepth`, `menu`, and `info`.

See [Configure Redoc CE](./config.md) for the full reference.

## Resources

- **[Configure Redoc CE](./config.md)** - Configuration options for Redoc CE 3.x
- **[Use Redoc CE in HTML](./deployment/html.md)** - Update the script tag, attributes, and `init` calls
- **[Use Redoc CE React component](./deployment/react.md)** - Update the `RedocStandalone` props and dependencies
