---
seo:
  title: Use Redoc CE with frontend frameworks
---

# Use Redoc CE with frontend frameworks

Redoc CE works in any frontend framework.
React applications use the [`RedocStandalone` component](./react.md).
Other frameworks render the documentation with the `init` function from the standalone bundle into an element they own.

## Before you begin

Install the `redoc` package:

```bash
npm install redoc
```

The standalone bundle at `redoc/bundles/redoc.standalone.js` includes React and every other dependency, so your application needs no additional packages.
Import the `init` function from it:

```js
import { init } from 'redoc/bundles/redoc.standalone.js';
```

`init(specOrSpecUrl, options, element)` renders into `element` and behaves exactly as in a [plain HTML page](./html.md#the-init-function), including all [configuration options](../config.md) and the `router` and `disableTelemetry` options.
To load the bundle from the CDN instead, import `init` from `https://cdn.redoc.ly/redoc/v3.x/bundles/redoc.standalone.js`.

## Vue

Render after the component mounts, into a template ref:

```vue
<script setup>
import { onMounted, ref } from 'vue';
import { init } from 'redoc/bundles/redoc.standalone.js';

const container = ref(null);

onMounted(() => {
  init(
    'https://redocly.github.io/redoc/cafe.yaml',
    { sortRequiredPropsFirst: true },
    container.value,
  );
});
</script>

<template>
  <div ref="container"></div>
</template>
```

## Angular

Render in `ngAfterViewInit`, when the view element exists.
Import the bundle dynamically, so Angular moves it into a lazy chunk and the initial bundle stays within the default production budgets:

```ts
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-api-docs',
  standalone: true,
  template: '<div #container></div>',
})
export class ApiDocsComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  async ngAfterViewInit(): Promise<void> {
    const { init } = await import('redoc/bundles/redoc.standalone.js');
    init(
      'https://redocly.github.io/redoc/cafe.yaml',
      { layout: 'stacked' },
      this.container.nativeElement,
    );
  }
}
```

## Next.js

Next.js applications use the React component.
`RedocStandalone` loads the description in the browser.
Render it in a client component and skip server rendering:

```tsx {% title="app/docs/[[...slug]]/page.tsx" %}
'use client';

import dynamic from 'next/dynamic';

const RedocStandalone = dynamic(() => import('redoc').then((mod) => mod.RedocStandalone), {
  ssr: false,
});

export default function ApiDocsPage() {
  return (
    <RedocStandalone
      specUrl="https://redocly.github.io/redoc/cafe.yaml"
      basePath="/docs"
    />
  );
}
```

`RedocStandalone` uses path-based deep links under `basePath`, for example `/docs/products/listmenuitems`.
The optional catch-all segment `[[...slug]]` makes Next.js serve the page for every one of those paths, so the route folder must match `basePath`.

Without Tailwind CSS, `create-next-app` generates an `app/globals.css` that sets `overflow-x: hidden` on `html` and `body`, which breaks the sticky sidebar.
Remove that rule, or change it to `overflow-x: clip`.

## Resources

- **[Use Redoc CE React component](./react.md)** - Props, routing, and the low-level API of the React component
- **[Use Redoc CE in HTML](./html.md)** - The `init` function reference and the attribute rules
- **[Configure Redoc CE](../config.md)** - Every option you can pass to `init` or the `options` prop
