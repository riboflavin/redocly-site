---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `hideReplay`


The `hideReplay` option controls whether the `Try it` buttons appear on GraphQL queries and mutations.
For example, you can hide the button in your public API docs and keep it visible on your internal site.

{% partial file="../../_partials/early-access.md" /%}

{% admonition type="info" %}
{% partial file="../../_partials/config/_unsupported-redoc-ce.md" variables={"optionName": "hideReplay"} /%}
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- hideReplay
- boolean
- Hide the `Replay` component that lets users send GraphQL queries and mutations from the docs.
  Default: `false`.

{% /table %}

## Examples

The following example hides the `Replay` component:

```yaml {% title="redocly.yaml" %}
graphql:
  hideReplay: true
```

## Resources

- **[Replay API explorer](https://redocly.com/docs/end-user/test-apis-replay)** - How users test APIs from the reference docs
- **[GraphQL configuration](./index.md)** - All the options you can set under `graphql`
- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation for understanding query language fundamentals
- **[Configuration options](../index.md)** - All the other options for your project
