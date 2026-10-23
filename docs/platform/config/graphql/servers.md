---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `servers`

The `servers` option sets the GraphQL endpoints that the `Try it` button sends requests to.
The `Try it` button on GraphQL query and mutation samples opens Replay, where users can edit the operation and send it.
Replay lists each endpoint as an environment, so users can switch between endpoints such as production and sandbox.
Without `servers`, Replay uses the address of your documentation site, and users have to type the endpoint before they send a request.

{% partial file="../../_partials/early-access.md" /%}

{% admonition type="info" %}
{% partial file="../../_partials/config/_unsupported-redoc-ce.md" variables={"optionName": "servers"} /%}
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- servers
- [[Server object](#server-object)]
- List of GraphQL endpoints for the `Try it` button.
  A list in an API entry replaces the list under the root `graphql` key.

{% /table %}

### Server object

{% table %}

- Option
- Type
- Description

---

- url
- string
- **REQUIRED.**
  Full URL of the GraphQL endpoint, including the path, for example `https://api.example.com/graphql`.
  The URL must start with `http://` or `https://`.

---

- description
- string
- Name of the endpoint in Replay.
  Replay shows the URL when you don't set a description.

{% /table %}

## Examples

### Set endpoints for all GraphQL APIs

The following example adds a production and a sandbox endpoint to every GraphQL API in the project:

```yaml {% title="redocly.yaml" %}
graphql:
  servers:
    - url: https://api.example.com/graphql
      description: Production
    - url: https://sandbox.example.com/graphql
      description: Sandbox
```

### Set the endpoint for one GraphQL API

The following example sets the endpoint for the `library` API only.
The list replaces the root `graphql.servers` list for this API:

```yaml {% title="redocly.yaml" %}
apis:
  library@v1:
    root: ./graphql/library.graphql
    graphql:
      servers:
        - url: https://library.example.com/graphql
          description: Library API
```

## Resources

- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation for understanding query language fundamentals
- **[Configuration options](../index.md)** - All the other options for your project
- **[hideReplay](./hide-replay.md)** - Hide the `Try it` button when you don't want users to send requests from the docs
- **[corsProxyUrl](./cors-proxy-url.md)** - Choose the proxy that Replay uses for cross-origin requests to your endpoints
- **[GraphQL configuration](./index.md)** - All the options you can set under `graphql`
- **[Replay API explorer](https://redocly.com/docs/end-user/test-apis-replay)** - How users test APIs from the reference docs
