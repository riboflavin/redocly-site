---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `corsProxyUrl`

The `corsProxyUrl` option controls which proxy Replay uses for cross-origin GraphQL requests.

{% partial file="../../_partials/early-access.md" /%}

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
  You can set it to empty string to disable the proxy and send requests directly from user browser to the target GraphQL API.
  Sending requests directly requires the target GraphQL API to have CORS enabled.
  Default: `/_api/cors/` (Realm's internal proxy endpoint).


{% /table %}

## Request flow and network requirements

{% partial file="../../_partials/config/_cors-proxy-network.md" /%}

## Examples

### Override the default proxy URL

Add a full URL to an external proxy service:

```yaml {% title="redocly.yaml" %}
graphql:
  corsProxyUrl: https://proxy.example.com/
```

### Disable CORS proxy

Add an empty string to disable the built-in CORS proxy:

```yaml {% title="redocly.yaml" %}
graphql:
  corsProxyUrl: ""
```

## Resources

- **[GraphQL configuration](./index.md)** - Complete guide to GraphQL configuration options for customizing API reference documentation
- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation for understanding query language fundamentals
- **[OpenAPI corsProxyUrl](../openapi/cors-proxy-url.md)** - The same option for OpenAPI reference documentation
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
