---
seo:
  title: Redoc CE quickstart guide
---

# Redoc CE quickstart guide

To render your API description using Redoc CE, use the following HTML code sample.
Replace the `spec-url` attribute with the URL or path to your description file.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Redoc CE</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!--
    Redoc CE doesn't reset the body margin
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <!--
    Redoc element with link to your API description
    -->
    <redoc spec-url="https://redocly.github.io/redoc/cafe.yaml"></redoc>
    <!--
    Link to Redoc script on CDN for rendering standalone element
    -->
    <script type="module" src="https://cdn.redoc.ly/redoc/v3.x/bundles/redoc.standalone.js"></script>
  </body>
</html>
```

The `spec-url` value can be an OpenAPI, AsyncAPI, or GraphQL description, and Redoc CE detects the specification type from the file.
To try the other specifications, point `spec-url` at `https://redocly.github.io/redoc/specs/cafe-asyncapi-amqp.yaml` or `https://redocly.github.io/redoc/specs/cafe.graphql`.
See [Supported specifications](./supported-specifications.md) for the detection rules.

A relative `spec-url` is resolved against the page URL, like any other link: `spec-url="openapi.yaml"` on the page `/docs/index.html` loads `/docs/openapi.yaml`.
To load the description from the site root wherever the page sits, use a root-relative path such as `/openapi.yaml`, or a full URL.

Save the file and open it in your browser.
No web server is needed: the script loads from the CDN, the description loads from a URL, and navigation uses `#/` hash routes, so the page works directly from disk.

A description file on your disk does not load from a `file://` page, so serve the folder with a static file server, for example `npx http-server` or `python3 -m http.server`, or reference the file by URL.

## Resources

- **[Supported specifications](./supported-specifications.md)** - Supported OpenAPI, AsyncAPI, and GraphQL versions and how Redoc CE detects the specification type
- **[Redoc CE deployment guide](./deployment/intro.md)** - Step-by-step instructions for setting up your Redoc CE project
- **[Use Redoc CE in HTML](./deployment/html.md)** - Pass configuration attributes, initialize from JavaScript, and customize the theme
- **[Configure Redoc CE](./config.md)** - Redoc CE's configuration options
