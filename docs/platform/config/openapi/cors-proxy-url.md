---
plans:
  - Pro
  - Scale
  - Enterprise
---
# `corsProxyUrl`

The `corsProxyUrl` option controls which proxy Replay uses for cross-origin requests.

{% admonition type="info" %}
{% partial file="../../_partials/config/_unsupported-redoc-ce.md" variables={"optionName": "corsProxyUrl"} /%}
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- corsProxyUrl
- string
- Optional.
  Set this option to override the proxy URL (for example, to use your own external proxy service).
  You can set it to empty string to disable the proxy and send requests directly from user browser to the target API.
  Sending requests directly requires the target API to have CORS enabled.
  Default: `/_api/cors/` (Redocly's internal proxy endpoint).


{% /table %}

## Request flow and network requirements

{% partial file="../../_partials/config/_cors-proxy-network.md" /%}

## Examples

### Override the default proxy URL

Add a full URL to an external proxy service:

```yaml {% title="redocly.yaml" %}
openapi:
  corsProxyUrl: https://proxy.example.com/
```

### Disable CORS proxy

Add an empty string to disable the built-in CORS proxy:

```yaml {% title="redocly.yaml" %}
openapi:
  corsProxyUrl: ""
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and CORS proxy configuration
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
