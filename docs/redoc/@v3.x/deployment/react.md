---
seo:
  title: Use the Redoc CE React component
redirects:
  '/docs/redoc/quickstart/react/':
    to: '/docs/redoc/deployment/react/'
---

# Use Redoc CE React component

## Before you begin

Redoc CE is published as the `redoc` package and renders with the React of your application.
Your project must already use `react` and `react-dom` 18.3 or 19.

Install the package together with its other peer dependencies:

```bash
npm install redoc styled-components react-router @redocly/config
```

React Router 8 requires React 19.2.7 or later.
With React 18, or React 19 earlier than 19.2.7, install React Router 7:

```bash
npm install redoc styled-components react-router@7 @redocly/config
```

The package ships as an ES module and requires Node.js 22 or later for your build tooling.

## Build API documentation

1. Import the `RedocStandalone` component.

    ```js
    import { RedocStandalone } from 'redoc';
    ```

1. Use the component, either:
    - link to your description with a URL:

      ```jsx
      <RedocStandalone specUrl="https://redocly.github.io/redoc/cafe.yaml" />
      ```

    - pass your description as an object:

      ```jsx
      <RedocStandalone spec={definitionObject} />
      ```

    - pass a GraphQL schema as an SDL string:

      ```jsx
      <RedocStandalone spec={schemaSdl} />
      ```

    `specUrl` accepts AsyncAPI documents and GraphQL schema files as well, see [Supported specifications](../supported-specifications.md).
    To load a description file from your own project, place it in the folder your build tool serves as static assets, for example `public` in Vite or Create React App.
    Then point `specUrl` at its root-relative path such as `/openapi.yaml`.
    The file is fetched at runtime, so a file that is not served as a static asset fails to load.
    To bundle the description with your application instead, import a JSON description and pass it to `spec`.

1. (Optional) Pass [configuration options](../config.md) in the `options` prop to alter how it renders.

    For example:

    ```jsx
    <RedocStandalone
      specUrl="https://redocly.github.io/redoc/cafe.yaml"
      options={{
        sortRequiredPropsFirst: true,
        schemaDefinitionsTagName: 'Schemas',
        hideDownloadButtons: true,
      }}
    />
    ```

`RedocStandalone` loads and bundles the description, converts Swagger 2.0 documents to OpenAPI 3, and renders the documentation with the sidebar and search.
While the description loads, it displays a spinner.
The spinner does not render if you set `hideLoading: true` in `options` or pass your own placeholder as children.
When loading fails, it renders a `Failed to load API description` message with the underlying error.

## Props

{% table %}

- Prop
- Type
- Description

---

- specUrl
- string
- URL or root-relative path of the OpenAPI, AsyncAPI, or GraphQL description.
  Ignored when `spec` is provided.

---

- spec
- object | string
- Parsed description object, a JSON string of the description, or a GraphQL schema in SDL.

---

- options
- [Options object](../config.md)
- Configuration options.

---

- basePath
- string
- Path the documentation is mounted at, used to build route URLs.
  Default: `/`.

---

- logo
- object
- Sidebar logo as `{ url, href, altText, backgroundColor }`.
  Defaults to the `x-logo` extension in the `info` object of the description.

---

- onLoaded
- function
- Called once the description is loaded, or with an `Error` as the first argument when loading fails.

---

- children
- ReactNode
- Rendered while the description loads, instead of the default spinner.

{% /table %}

## Routing

Redoc CE builds deep links with React Router.
When `RedocStandalone` renders outside a React Router context, it creates a browser router, so routes are path-based: with `basePath="/docs"`, an operation page is `/docs/products/listmenuitems`.
Your server must return the application for every path under `basePath`.

When your application already provides a router, Redoc CE reuses it.
Wrap the component in a `HashRouter` to get hash-based URLs like the standalone HTML element.

## Specify `onLoaded` callback

You can also specify the `onLoaded` callback.
It is called when Redoc CE has loaded the description, or with an error as the first argument when loading fails.
It is called again each time `spec`, `specUrl`, or `basePath` changes.

```jsx
<RedocStandalone
  specUrl="https://redocly.github.io/redoc/cafe.yaml"
  onLoaded={(error) => {
    if (!error) {
      console.log('Yay!');
    }
  }}
/>
```

## Display a placeholder while loading

To display your own content while the description loads, pass it as children of RedocStandalone.
When loading completes, Redoc CE replaces the children with the documentation.

```jsx
<RedocStandalone specUrl="https://redocly.github.io/redoc/cafe.yaml">
  <p>Loading the API description…</p>
</RedocStandalone>
```

## Disable telemetry

Redoc CE sends anonymous [usage telemetry](../telemetry.md) by default.
To turn it off, set `disableTelemetry` in the `options` prop, like any other option:

```jsx
<RedocStandalone
  specUrl="https://redocly.github.io/redoc/cafe.yaml"
  options={{ disableTelemetry: true }}
/>
```

## Low-level API

The package also exports the building blocks behind `RedocStandalone`.
Use them when your application needs to prepare the documentation model itself, for example to render it on a server:

- `prepareApiDocs({ specUrl, spec, options, basePath })` loads and bundles the description and resolves to `{ items, store, options, specType, document }`.
- `Redoc` renders a prepared model without the sidebar and search: `<Redoc items={items} store={store} options={options} basePath={basePath} markdownAdapter={adapter} />`.
  It requires a `markdownAdapter` that converts the Markdown abstract syntax trees (ASTs) of description fields into React nodes.
  The package does not include an adapter, so you must provide your own.
- `convertSwagger2OpenAPI(document)` converts a Swagger 2.0 document to OpenAPI 3.
- `ServerStyleSheet` is re-exported from `styled-components`.
  Server rendering collects styles from the same instance the components use.

```jsx
import { useEffect, useState } from 'react';
import { Redoc, prepareApiDocs } from 'redoc';

function PreparedDocs() {
  const [prepared, setPrepared] = useState(null);

  useEffect(() => {
    prepareApiDocs({ specUrl: '/openapi.yaml', basePath: '/docs' }).then(setPrepared);
  }, []);

  if (!prepared) return <p>Preparing…</p>;

  return (
    <Redoc
      items={prepared.items}
      store={prepared.store}
      options={prepared.options}
      basePath="/docs"
      markdownAdapter={myMarkdownAdapter}
    />
  );
}
```

## Resources

- **[Redoc CE deployment guide](./intro.md)** - Step-by-step instructions for setting up your Redoc CE project
- **[Configure Redoc CE](../config.md)** - Every option you can pass in the `options` prop
- **[Telemetry in Redoc CE](../telemetry.md)** - What Redoc CE collects and how to turn it off
