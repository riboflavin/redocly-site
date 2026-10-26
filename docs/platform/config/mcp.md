---
plans:
  - Pro
  - Scale
  - Enterprise
description: Configure the MCP server of your project.
---

# `mcp`

{% configOptionRequirements plans=$frontmatter.plans /%}

Use the `mcp` option to configure the Model Context Protocol (MCP) server of your project.
The MCP server gives AI clients such as Claude, ChatGPT, Cursor, and VS Code access to your documentation and API descriptions.
The MCP server is on by default on plans that include it.
To turn off the MCP server, set `hide` to `true`.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Turn off the MCP server.
  Default: `false`.

---

- docs
- [Docs object](#docs-object)
- Configure the name, the content, and the public endpoint of the MCP server.

{% /table %}

### Docs object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Turn off the MCP server, the same as `mcp.hide`.
  Default: `false`.

---

- name
- string
- Set the name that the server shows to AI clients when they connect.
  Default: `"Docs MCP server"`.

---

- ignore
- [string]
- List of glob patterns, matched against file paths, for content to exclude from the MCP server.
  Default: `[]`.

---

- publicEndpoint
- boolean
- Serve public content to anonymous users at `/mcp-public` when `/mcp` requires authentication.
  For the conditions and the warning, see [Serve public content without a sign-in](../customization/mcp-server/access.md#serve-public-content-without-a-sign-in).
  Default: `false`.

{% /table %}

## Examples

### Rename the server

The following example sets the name that AI clients show for the server:

```yaml {% title="redocly.yaml" %}
mcp:
  docs:
    name: Redocly Cafe
```

### Ignore specific patterns

The following example removes the files in the `openapi-files` folder and the test endpoint files from the MCP server:

```yaml {% title="redocly.yaml" %}
mcp:
  docs:
    ignore:
      - openapi-files/**
      - '**/test-endpoints*'
```

### Default values

The following example shows the default value of each option:

```yaml {% title="redocly.yaml" %}
mcp:
  hide: false
  docs:
    hide: false
    name: Docs MCP server
    publicEndpoint: false
    ignore: []
```

## Resources

- **[MCP server](../customization/mcp-server/index.md)** - Learn what the MCP server of your project serves to AI clients
- **[Control access to the MCP server](../customization/mcp-server/access.md)** - Restrict the server to teams and serve public content without a sign-in
- **[Custom tools](../customization/mcp-server/custom-tools.md)** - Add your own functions to the server with code that you write
- **[Connect MCP tag](../content/markdoc-tags/connect-mcp.md)** - Add a button that connects an AI client to the server from any page
