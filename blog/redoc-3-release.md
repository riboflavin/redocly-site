---
template: ../@theme/templates/BlogPost
title: "Redoc CE 3.0 is available"
description: "Redoc CE 3.0 is out: one renderer for OpenAPI 3.2, AsyncAPI, GraphQL, and MCP. What's new, and what it means for Redoc 2 pages and Redocly CLI."
seo:
  title: "Redoc CE 3.0 is available"
  description: "Redoc CE 3.0 is out: one renderer for OpenAPI 3.2, AsyncAPI, GraphQL, and MCP. What's new, and what it means for Redoc 2 pages and Redocly CLI."
  image: ./images/redoc-3-live.png
author: alex-varchuk
publishedDate: "2026-10-23"
categories:
  - redocly:redoc
  - api-specifications:openapi
  - redocly:product-updates
image: redoc-3-live.png
---

# Redoc CE 3.0 is available

Redoc CE 3.0 is stable and ready for production.
After six weeks in [preview](https://redocly.com/blog/redoc-3-whats-new), it's now live as `latest` on npm, the CDN, and Docker.

For step-by-step instructions on upgrading from Redoc 2, check the [migration guide](https://redocly.com/docs/redoc/config-migration).

```html
<script type="module" src="https://cdn.redoc.ly/redoc/v3.x/bundles/redoc.standalone.js"></script>
<redoc spec-url="https://redocly.github.io/redoc/cafe.yaml"></redoc>
```

The `v3.x` CDN path points to the latest 3.x release.
To pin a specific version, swap it for `v3.0.1`, or pull the bundle from jsDelivr at `https://cdn.jsdelivr.net/npm/redoc@3/bundles/redoc.standalone.js`.

{% admonition type="warning" name="If you load Redoc from the `latest` path, read this first" %}
The `latest` CDN URL and Docker image now point to Redoc 3.
Because the new bundle is an ES module, pages loading the latest script with a classic `<script src>` tag fail to render.
To stay on Redoc 2 until you're ready to migrate, pin your version to `https://cdn.redoc.ly/redoc/v2.x/bundles/redoc.standalone.js` for the script, or `redocly/redoc:v2.5.3` for Docker.
{% /admonition %}

## Redoc 2 and Redoc 3, side by side

{% table %}

-
- Redoc 2
- Redoc 3
---
- Specifications
- OpenAPI 2.0, 3.0, 3.1
- Adds OpenAPI 3.2, AsyncAPI 2.x and 3.x, GraphQL SDL, and MCP via `x-mcp`
---
- Specification detection
- OpenAPI only
- Automatic from the file, no setting needed
---
- Theming
- Nested JavaScript `theme` object
- CSS custom properties, scoped with `:root.light` and `:root.dark`
---
- Dark mode
- None
- Built in, follows the system preference
---
- Options
- 40+
- About 20
---
- Large descriptions
- Entire document rendered upfront
- Only what's near the viewport
---
- Search
- Optional, operation titles only
- Always on, covers fields, parameters, and response codes
---
- Linking
- Scroll positions on one long page
- A route per operation, tool, and schema; hash or history routing
---
- Bundle
- UMD, global `Redoc` object
- ESM, `import { init }` from the bundle
---
- Minimum versions
- React 16.8, Node 6.9
- React 18.3, Node 22
{% /table %}

## What's new in 3.0

### Any specification, one renderer

Redoc automatically detects the specification type based on the file.
Documents with an `asyncapi` field are parsed as AsyncAPI and `swagger` descriptions are converted to OpenAPI 3 on load.
`.graphql` or `.gql` URLs are treated as GraphQL schemas.
Everything else defaults to OpenAPI.
There is no manual setting to override this, and each page renders a single description.
To document multiple APIs, either create a separate page for each description and link them together, or use [Realm](https://redocly.com/realm) to unify them into a single developer portal.

```html
<redoc spec-url="https://redocly.github.io/redoc/specs/cafe-asyncapi-amqp.yaml"></redoc>
```

```html
<redoc spec-url="https://redocly.github.io/redoc/specs/cafe.graphql"></redoc>
```

Search is now always enabled and indexes the entire description, not just operation titles.
The index includes schema fields, parameters, and response codes.
Because the new engine handles indexing without affecting performance, the `disableSearch` option has been removed.

### MCP servers, documented

If your API also exposes an MCP server, you can document both in one place.
Add an [`x-mcp`](https://redocly.com/docs/realm/content/api-docs/openapi-extensions/x-mcp) section to the root of your OpenAPI description.
Redoc gives your server's tools, resources, and prompts their own pages.
Input schemas and generated examples are grouped by tag right alongside your REST operations.
It also adds connect buttons to the page header so readers can add the server to their MCP client directly from the docs.

You don't have to write the `x-mcp` section by hand, either: run the [`introspect-mcp` command](./introspect-mcp.md) against a live server and it generates the description for you.
All existing Redoc 2 vendor extensions continue to work as before.

### Copy for LLM and Open in

Every page header includes **Copy for LLM**, **Open in Claude**, and **Open in ChatGPT** buttons to make it easier to use your docs with AI assistants.

**Copy for LLM** is always available and grabs just the relevant slice of the description for the current page, along with the API title, page title, and a link to the full file. The entire text is formatted and ready to paste into a chat.
**Open in Claude** and **Open in ChatGPT** go a step further and launch a new chat with that context pre-filled in the prompt, or pass a link to the full description if the slice is too large to fit in a URL.
These two actions show up automatically whenever Redoc knows the description file's URL via `spec-url`, `specUrl`, or `downloadUrls`.

## What changed for existing pages

### `init` is a named export

Because we changed the standalone bundle to an ES module, the global `Redoc` object on `window` is deprecated.
Instead, import `init` directly from the bundle and pass your description to it (as a URL, a parsed JavaScript object, a JSON string, or a GraphQL SDL string), along with an `options` object and an optional target element:

```html
<div id="redoc-container"></div>
<script type="module">
  import { init } from 'https://cdn.redoc.ly/redoc/v3.x/bundles/redoc.standalone.js';

  init(
    'https://redocly.github.io/redoc/cafe.yaml',
    { sortRequiredPropsFirst: true },
    document.getElementById('redoc-container'),
  );
</script>
```

We recommend this approach for Redoc in Vue, Angular, or any other non-React framework: wait for your component to mount, then call `init` on a container element.
Check out the [frameworks guide](https://redocly.com/docs/redoc/deployment/frameworks) for ready-to-use examples in Vue, Angular, and Next.js.

### Redocly CLI: `build-docs` renders Redoc 3

Starting with Redocly CLI 2.70.0, the `build-docs` command renders Redoc 3 exclusively and supports AsyncAPI and GraphQL alongside OpenAPI.
It also introduces two new flags:

- `--inlineBundle` embeds the JavaScript bundle directly into the output HTML so your docs work completely offline.
- `--openapi`, `--asyncapi`, and `--graphql` let you pass configuration options for each specification type from the command line.
  `--theme.openapi` and `--disableGoogleFont` are removed: build-docs stops with an error that points to `--openapi`.

In `redocly.yaml`, options live under a top-level key matching the specification format, so a single config file can handle all three:

```yaml {% title="redocly.yaml" %}
openapi:
  schemaDefinitionsTagName: Schemas
  sortRequiredPropsFirst: true
asyncapi:
  jsonSamplesDepth: 4
graphql:
  showBuiltInScalars: true
```

If you use a custom `--template` file that still loads the Redoc 2 `<script>` tag or calls the global `Redoc` object, update it to use `<script type="module">` and import `init` as shown in the preceding snippet.
The `theme.openapi` block in `redocly.yaml` is removed.
Custom styling happens through [CSS variables](https://redocly.com/docs/redoc/deployment/html#theme-configuration), which you can include via a custom HTML template.

{% admonition type="info" name="Keep the Redoc 2 output" %}
To stay with Redoc 2 styling, use the archived v1 line of Redocly CLI, which stays on Redoc 2:

```sh
npx @redocly/cli@v1-archive build-docs openapi.yaml
```

The v1 archive works indefinitely but only receives critical fixes.
{% /admonition %}

## What happens to Redoc 2

Redoc 2.x continues to receive security patches and critical bug fixes, though new feature development has moved exclusively to Redoc 3.
If the Node 22 requirement blocks you from upgrading right away, you can stay on the 2.x release line until you're ready.
In this case, make sure to pin `v2.x` in your CDN script tag or Docker image, since `latest` now points to Redoc 3.

## Try it and tell us

- [The Cafe API demo](https://redocly.github.io/redoc/) - the same description in OpenAPI, AsyncAPI, and GraphQL.
- [Redoc CE documentation](https://redocly.com/docs/redoc) - quickstart, deployment guides, and configuration.
- [Migration guide from Redoc 2](https://redocly.com/docs/redoc/config-migration) - every page, API, and option change in one place.
- [Redoc CE on GitHub](https://github.com/Redocly/redoc) - source, issues, and the changelog.

Redoc CE 3.0 is open source under the MIT license.
Because it's built from the same codebase as the engine in Redocly's hosted products, the open-source release stays in sync and won't fall behind again.
We're also planning support for additional formats like OpenRPC and gRPC.
Thanks to the new architecture, each additional format only requires an adapter rather than a ground-up rewrite.

If something breaks, or the upgrade trips on a case this post didn't cover, feel free to [open an issue](https://github.com/Redocly/redoc/issues) in our repo.
