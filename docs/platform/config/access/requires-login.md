---
plans:
  - Pro
  - Scale
  - Enterprise
description: This configuration option makes all your content private for non-authenticated users.
---
# `requiresLogin`

{% configOptionRequirements plans=$frontmatter.plans /%}

This configuration option makes all your content private for non-authenticated users.
Only authenticated users, who are verified through either the Redocly platform or an identity provider (IdP) you [added in Redocly](../../organization/sso/add-idp.md) can access your project.

{% admonition type="info" name="Mutually exclusive options" %}
The `requiresLogin` option cannot be used in conjunction with `rbac`.
{% /admonition %}

## Examples

### Through the `access` object

The recommended way to configure `requiresLogin` is within the `access` object:

```yaml {% title="redocly.yaml" %}
access:
  requiresLogin: true
```

### Root-level configuration (deprecated)

{% admonition type="warning" name="Deprecated configuration" %}
Root-level `requiresLogin` configuration displays warnings when the `access` object is present.
Migrate to the `access` object format.
{% /admonition %}

```yaml {% title="redocly.yaml" %}
requiresLogin: true
```

## Resources

- **[Access configuration](./index.md)** - Group authentication and access settings together using the `access` object
- **[RBAC configuration](./rbac.md)** - Complete options for configuring role-based access control as an alternative to requiresLogin for granular permissions
- **[SSO configuration](./sso.md)** - Discover options for configuring single sign-on to work with requiresLogin for streamlined user authentication
