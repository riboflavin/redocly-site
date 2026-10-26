---
plans:
  - Pro
  - Scale
  - Enterprise
description: Restrict the MCP server to teams, sign in from an AI client, and serve public content without a sign-in.
---

# Control access to the MCP server

{% configOptionRequirements plans=$frontmatter.plans /%}

Role-based access control (RBAC) decides what each AI client can read over the MCP server.
Use RBAC to restrict the server to teams.
To serve public content to anonymous users, use the public endpoint.

## How RBAC applies

RBAC that protects content in your project also protects that content over the MCP server.
The server enforces access with the same RBAC engine as the portal.
Each authenticated client receives only the API descriptions, schemas, skills, and search results that its teams can access.
It is the same content the client can see on the site.
When RBAC restricts anonymous access, the `/mcp` endpoint requires a sign-in and returns `401` to unauthenticated clients.
The [`requiresLogin`](../../config/access/requires-login.md) option alone also makes `/mcp` require a sign-in.

For the RBAC options, see the [RBAC configuration reference](../../config/access/rbac.md).

{% admonition type="info" %}
The `mcp.docs.ignore` option and `x-mcp` are not access control.
`mcp.docs.ignore` removes the matching API descriptions and pages from the MCP server.
`x-mcp.docs.hide` hides a path or an operation from the MCP server.
For these options, see [Hide content](./index.md#hide-content).
Use RBAC to control who can access content.
{% /admonition %}

## Restrict the server to teams

To restrict the server itself rather than individual content, set a team-based role for the `mcp` feature with the `rbac.features.mcp` option.
This option works the same way as `rbac.features.aiSearch` for AI search.

In the following example, only members of the Developers team can access the MCP server:

```yaml {% title="redocly.yaml" %}
access:
  rbac:
    features:
      mcp:
        Developers: read
```

When you set a team-based role for the `mcp` feature, only teams with a role other than `none` can access the MCP server.
Users must sign in unless you grant such a role to the `anonymous` team, either directly or through the `*` wildcard.
The wildcard covers all teams that are not listed explicitly, including `anonymous`.
When the `anonymous` team has no access, requests without a valid token receive a `401` response.
Authenticated users who don't belong to an allowed team receive a `403` response.

For more details, see [Features configuration](../../config/access/rbac.md#features-configuration) in the RBAC reference.

## Sign in from an AI client

When the server requires a sign-in, the AI client signs in with OAuth.
Claude Code, Cursor, Claude, VS Code, Codex, and ChatGPT support OAuth for remote MCP servers.
[Connect an AI client to your MCP server](./connect.md) has the sign-in details for each client.

A client can also send a bearer token in the `Authorization` header, for example `Authorization: Bearer <token>`.
The server reads only `Bearer` tokens.
The token is an ID token from the identity provider of your project, or the access token from an OAuth sign-in.

The server checks the signature and the expiration time of the token on each request.
When the identity provider configuration sets `audience`, the `aud` claim of an identity provider token must match one of its values.
A token from a sign-in through the Redocly platform must name this project.
The token identifies the user, and RBAC decides what the user can read.
The token grants access to documentation content only.
The server never sends the token from the MCP request to the APIs that your documentation describes.

## Serve public content without a sign-in

When RBAC restricts anonymous access, the `/mcp` endpoint requires a sign-in and returns `401` to unauthenticated clients.
Anonymous users then cannot browse the content that RBAC marks public.
To keep public content reachable for AI clients without a sign-in, enable the public endpoint:

```yaml {% title="redocly.yaml" %}
mcp:
  docs:
    publicEndpoint: true
```

The MCP server then also serves `/mcp-public` on your project root URL.
The server serves `/mcp-public` only when `/mcp` requires a sign-in and the `anonymous` team can access the MCP server.

If you [restrict the server to teams](#restrict-the-server-to-teams), the `rbac.features.mcp` option must grant access to the `anonymous` team.
Otherwise, the server does not register `/mcp-public`, and the build logs a note.

When the project has no protected content, `/mcp` already serves anonymous users.
Then the server does not register `/mcp-public`, and the build logs a note instead.
A project that uses [`requiresLogin`](../../config/access/requires-login.md) without `rbac` rules has no public content, so the server does not register `/mcp-public` either.

The server never challenges requests to `/mcp-public` for authentication and ignores any credentials that they send.
The APIs and the search results that it serves include only content available to the `anonymous` team.
Authenticated users connect to `/mcp`.
Anonymous users and AI clients that don't sign in connect to `/mcp-public`.

{% admonition type="warning" %}
Everything your RBAC rules grant to the `anonymous` team becomes reachable over `/mcp-public` without a sign-in.
Review these rules before you enable the endpoint.
{% /admonition %}

Users discover the public endpoint in three ways:

- A browser visit to `/mcp-public` displays the same setup page as `/mcp`.
  The page has connection snippets for the public endpoint and a note that it serves public content only.
- The two setup pages link to each other.
  The `/mcp` page links to the public endpoint, and the `/mcp-public` page links back to the main endpoint.
- When an unauthenticated AI client connects to the restricted `/mcp` endpoint, the `401` response body mentions the `/mcp-public` URL.

## Resources

- **[MCP server](./index.md)** - Learn what the MCP server of your project serves to AI clients
- **[Connect an AI client to your MCP server](./connect.md)** - Add the server to an AI client and complete the sign-in
- **[RBAC configuration reference](../../config/access/rbac.md)** - Configure the team-based roles that control access to content and to the MCP server
- **[`requiresLogin` configuration reference](../../config/access/requires-login.md)** - Require all users to sign in before they can access the project
