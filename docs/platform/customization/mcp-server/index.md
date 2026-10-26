---
plans:
  - Pro
  - Scale
  - Enterprise
description: Learn what the MCP server of your project gives to AI clients, what your readers see, which limits apply, and how to hide content.
---

# MCP server

{% configOptionRequirements plans=$frontmatter.plans /%}

Model Context Protocol (MCP) is a standard that lets AI clients get context from external sources.
Each project on a plan that includes the MCP server serves it at `/mcp` on the project root URL, for example `https://example.com/mcp`.
The server lets AI clients search your documentation and read your API descriptions.
It also gives your [agent skills](../agent-skills/index.md#skills-as-mcp-resources) to AI clients as resources.
To turn off the server, set [`mcp.hide`](../../config/mcp.md) to `true`.

## What the server exposes

The AI client gets three MCP tools:

- `execute` runs a script that calls the documentation functions.
- `describe-tools` returns the signatures of the documentation functions.
- `submit-feedback` reports a problem with a documentation page.
  On `@redocly/realm` 0.138 and earlier, this tool exists only as a function inside `execute`.

The script calls these documentation functions:

{% table %}

- Function
- What it does

---

- `listApis`
- Lists the APIs of the project.

---

- `getEndpoints`
- Returns all endpoints of an API.

---

- `getEndpointInfo`
- Returns the details of one endpoint, for example its parameters, security, and examples.

---

- `getSecuritySchemes`
- Returns the security schemes of an API.

---

- `getFullApiDescription`
- Returns the full OpenAPI description of an API.

---

- `search`
- Searches the documentation.

---

- `listGraphqlApis`
- Lists the GraphQL APIs of the project.
  Only a project with GraphQL APIs has the GraphQL functions.

---

- `getGraphqlTypeList`
- Returns the operations and types of a GraphQL schema as a list that you can filter.

---

- `getGraphqlType`
- Returns the SDL of one GraphQL type, operation, or directive.

---

- `getGraphqlSchema`
- Returns the full GraphQL schema as SDL.

---

- `whoami`
- Returns information about the signed-in user.
  Only a server that requires sign-in has this function.

{% /table %}

Function names use camelCase, and a script calls them on the `tools` object, for example `tools.getEndpoints()`.

### Tools mode

Some AI clients and AI client directories need one MCP tool for each function instead of a script.
For these clients, add `?mode=tools` to the server URL, for example `https://example.com/mcp?mode=tools`.
The server then gives one tool for each documentation function, with the function name in kebab-case, for example `get-endpoints`, and the `submit-feedback` tool.
This switch needs `@redocly/framework` 0.139 or later.

## What your readers see

When readers open `/mcp` in a browser, they see a setup page with the steps to connect their AI client.
By default, the [page actions](../../config/navigation.md#pageaction-object) on each page let readers add the server to Claude, VS Code, or Cursor.
Another page action copies the server URL.
To add a connect button to a page, use the [Connect MCP tag](../../content/markdoc-tags/connect-mcp.md).

### MCP server card

The server card lets AI clients and registries discover the server with one request.
It is a JSON document in the MCP server card format, at `/.well-known/mcp/server-card.json` on the project root URL.
The card names the server, gives the `/mcp` transport endpoint, and lists the MCP tools.
When the server requires sign-in, the card states the authentication schemes.
When your project publishes agent skills, the card advertises support for resources.

The following example shows the card of a server that requires sign-in.
The name in the example comes from `mcp.docs.name`.
The example leaves out the `instructions` field and shows only the name and the title of each tool.

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
  "version": "1.0",
  "protocolVersion": "2025-11-25",
  "serverInfo": {
    "name": "Redocly Cafe",
    "title": "Redocly Cafe",
    "version": "2026-10-22"
  },
  "description": "Redocly Cafe documentation.",
  "documentationUrl": "https://example.com/",
  "transport": {
    "type": "streamable-http",
    "endpoint": "/mcp"
  },
  "capabilities": {
    "logging": {},
    "tools": { "listChanged": true }
  },
  "authentication": {
    "required": true,
    "schemes": ["bearer", "oauth2"]
  },
  "tools": [
    { "name": "execute", "title": "Query the docs with code" },
    { "name": "describe-tools", "title": "Get docs function signatures" },
    { "name": "submit-feedback", "title": "Submit feedback" }
  ]
}
```

## The feedback tool

An AI client calls the `submit-feedback` tool to report a documentation page that is wrong or incomplete.
The report contains the page, a summary of the problem, and the name of the AI client.
The report can also contain details and the feature that the page documents.
The report appears on the [Feedback page](../../project/feedback.md) in the Redocly platform.
The server accepts a report only for a page that the AI client can access.

To remove the tool, set [`feedback.hide`](../../config/feedback.md) to `true`.
This setting also removes the feedback form from your pages.

`submit-feedback` is the only built-in tool that writes.
The other built-in tools only read, and no built-in tool changes your content.
[Custom tools](./custom-tools.md) run code that you write.

## Hide content

Use these options to remove content from the MCP server results for all AI clients:

- [`mcp.docs.ignore`](../../config/mcp.md#docs-object) removes the API descriptions and the pages that match glob patterns.
- [`x-mcp.docs.hide`](../../content/api-docs/openapi-extensions/x-mcp.md) keeps a path or an operation away from AI clients.
- [`skills.hide`](../../config/skills.md) removes the agent skills, and the server then has no skill resources.
- [`skills.excludeFiles`](../../config/skills.md) removes only the skills that match glob patterns.

These options are not access control.
To restrict content to teams, see [Control access to the MCP server](./access.md).

## Limits and what Redocly logs

By default, the server accepts 600 requests per minute and 20,000 requests per day from one client IP address.
Above that, it returns HTTP 429 with a `Retry-After` header.

For each tool call, Redocly records the tool name, the duration, the response size, and the name and version of the AI client.
Redocly also keeps a security audit log of tool calls.

The [MCP server analytics](../../project/analytics.md#mcp-server) in the Redocly platform show the requests and the tool calls of your project.
For the details of these records, see [What does Redocly log for MCP tool calls?](../../faq/ai-governance.md#what-does-redocly-log-for-mcp-tool-calls).

## Resources

- **[Connect an AI client to your MCP server](./connect.md)** - Add the server to Claude Code, Cursor, Claude, VS Code, Codex, ChatGPT, or another AI client
- **[Control access to the MCP server](./access.md)** - Restrict the server to teams and serve public content without a sign-in
- **[Custom tools](./custom-tools.md)** - Add your own functions to the server with code that you write
- **[`mcp` configuration](../../config/mcp.md)** - Turn the server off, rename it, and remove content from it
