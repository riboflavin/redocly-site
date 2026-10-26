---
plans:
  - Pro
  - Scale
  - Enterprise
---

# Model Context Protocol server

Model Context Protocol (MCP) is a standard that enables applications to provide context to large language models (LLMs).
With MCP servers, AI assistants can retrieve additional information relevant to a user's query.

Redocly provides built-in MCP server capabilities that expose your API Docs to AI assistants.

## Benefits

- **Real-time API guidance**: users receive accurate, contextual help about API endpoints and operations.
- **Secure API access**: AI assistants can make authenticated requests to act on behalf of a user.
- **Dynamic documentation**: AI assistants can extract and explain API reference content based on user needs.

## Docs MCP server

Use the Docs MCP server to explore and discover APIs in your project.
For the current MCP endpoint details, authentication semantics, server metadata, and tool schemas, see the [Docs MCP reference](./openapi.yaml).

The MCP server also includes a `submit-feedback` tool.
An AI agent calls it when a page it relied on is incorrect, outdated, confusing, or incomplete.
The report appears on the Redocly platform **Feedback** page with the `MCP` origin, the page, the agent name, and the feature involved.
An agent can only report a page it has access to.
Set [`feedback.hide`](../../config/feedback.md) to `true` to remove the tool together with the feedback form.

## MCP server card

The MCP server card is a standardized JSON document that lets agents discover the Docs MCP server: its tools, transport endpoint, and capabilities.
The discovery is a single request that follows the Model Context Protocol server-card format.
It is available at `/.well-known/mcp/server-card.json` when the MCP server is enabled.

```http
GET https://example.com/.well-known/mcp/server-card.json
```

The following example response describes a login-protected server that also publishes skills:

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
  "version": "1.0",
  "protocolVersion": "2025-06-18",
  "serverInfo": {
    "name": "Docs MCP server",
    "title": "Docs MCP server",
    "version": "2026-07-13"
  },
  "description": "Redocly Cafe documentation.",
  "documentationUrl": "https://example.com/",
  "transport": {
    "type": "streamable-http",
    "endpoint": "/mcp"
  },
  "capabilities": {
    "logging": {},
    "tools": { "listChanged": true },
    "resources": { "listChanged": true },
    "completions": {}
  },
  "authentication": {
    "required": true,
    "schemes": ["bearer", "oauth2"]
  },
  "tools": ["dynamic"]
}
```

The card lists the server's tools, declares its `/mcp` transport endpoint, and states its authentication requirements when the server requires login.
When your project publishes [agent skills](../agent-skills/index.md#skills-as-mcp-resources), the card's capabilities advertise resource support so agents know to list them.

## Restrict access to the MCP server

Control which teams can access the MCP server with the `rbac.features.mcp` option, the same way `rbac.features.aiSearch` controls access to AI search.

In the following example, only members of the Developers team can access the MCP server:

```yaml {% title="redocly.yaml" %}
access:
  rbac:
    features:
      mcp:
        Developers: read
```

When a team-based role is set for the `mcp` feature, only teams with a role other than `none` can access the MCP server.
Users must sign in unless the `anonymous` team is granted such a role, either directly or through the `*` wildcard.
The wildcard covers all teams that are not listed explicitly, including `anonymous`.
When the `anonymous` team has no access, requests without a valid token receive a `401` response.
Authenticated users who don't belong to an allowed team receive a `403` response.

For more details, see the [RBAC configuration reference](../../config/access/rbac.md#features-configuration).

## Connect an AI agent to the MCP server

After you enable the Docs MCP server in [configuration](../../config/mcp.md), it is available at `/mcp` on your project root URL.
For example: `https://example.com/mcp`.

### Use the MCP server

Users can connect their preferred AI tools that support MCP (for example, Cursor, Claude Code and VS Code) to your MCP server.

{% numbered-list %}
  {% numbered-item %}
  Enable the MCP server in your [configuration](../../config/mcp.md).
  {% /numbered-item %}
  {% numbered-item %}
  Copy your MCP server URL and add it to your tool.
  Users can also copy it with the **Copy MCP server URL** page action (`copy-mcp-url`), which is on by default.
  If you set [`navigation.actions.items`](../../config/navigation.md), include `copy-mcp-url` in the list.
  {% /numbered-item %}
{% /numbered-list %}

After connecting, the tool can access your OpenAPI documentation.

{% tabs %}

  {% tab label="Claude" %}

To add the server in one step, select **Connect to Claude** in the page actions menu.
The setup page that opens when you visit the MCP server URL in a browser also has this button.
Claude opens the **Add custom connector** dialog on claude.ai with the server name and URL filled in.
Review the values and select **Add**.

To add the connector manually:

{% numbered-list %}
  {% numbered-item %}
  Open **Customize > Connectors**, select **Add**, then select **Add custom connector**.
  {% /numbered-item %}
  {% numbered-item %}
  Enter a name and the MCP server URL, for example `https://example.com/mcp`, then select **Continue**.
  {% /numbered-item %}
  {% numbered-item %}
  Review the detected authentication settings and select **Continue**.
  {% /numbered-item %}
  {% numbered-item %}
  Under **Authentication**, select **No sign in** if the MCP server is public.
  Otherwise, select a sign-in option.
  {% /numbered-item %}
  {% numbered-item %}
  Select **Add**.
  {% /numbered-item %}
{% /numbered-list %}

On a Team or Enterprise plan, an Owner opens **Organization settings > Connectors**, selects **Add**, then **Custom > Web**, and follows the same steps.
Members then open **Customize > Connectors** and select **Connect** next to the connector.

You can use the connector in Claude on the web and in the desktop app.

To test the connection, ask a question that uses an MCP tool in a Claude chat.

  {% /tab %}

  {% tab label="Claude Code" %}

In your terminal, run:

```shell
claude mcp add --transport http --scope user example-mcp https://example.com/mcp
```

The `--scope user` option makes the server available in all your projects.
Without it, Claude Code adds the server to the current project only, for you only.

In a Claude Code session, type `/mcp` to see the server and its tools.
If the MCP server requires authentication, select the server in the `/mcp` list and complete the sign-in flow.

To test the connection, ask Claude Code to perform a task that uses an MCP tool.

  {% /tab %}

  {% tab label="Cursor" %}

{% numbered-list %}
  {% numbered-item %}
  Open `~/.cursor/mcp.json` for all projects, or `.cursor/mcp.json` for one project.
  Create the file if it doesn't exist.
  {% /numbered-item %}
  {% numbered-item %}
  Add the server:

  ```json {% title="mcp.json" %}
  {
    "mcpServers": {
      "example-mcp": {
        "url": "https://example.com/mcp"
      }
    }
  }
  ```

  To send extra headers with each request, add a `headers` object:

  ```json {% title="mcp.json" %}
  {
    "mcpServers": {
      "example-mcp": {
        "url": "https://example.com/mcp",
        "headers": {
          "Authorization": "Basic MTIzOjEyMw=="
        }
      }
    }
  }
  ```

  {% /numbered-item %}
  {% numbered-item %}
  Save the file.
  Cursor shows the server and its tools on the **Customize** page.
  {% /numbered-item %}
{% /numbered-list %}

Cursor supports OAuth for MCP servers that require authentication.

To test the connection, ask a question that uses an MCP tool in a Cursor chat in Agent mode.

  {% /tab %}

  {% tab label="VS Code" %}

{% numbered-list %}
  {% numbered-item %}
  Open the Command Palette.
  - macOS: `Command + Shift + P`
  - Windows/Linux: `Ctrl + Shift + P`
  {% /numbered-item %}
  {% numbered-item %}
  Run **MCP: Add Server**.
  {% /numbered-item %}
  {% numbered-item %}
  Select **HTTP**.
  {% /numbered-item %}
  {% numbered-item %}
  Enter the MCP server URL, for example `https://example.com/mcp`.
  {% /numbered-item %}
  {% numbered-item %}
  Enter a server ID, for example `example-mcp`.
  {% /numbered-item %}
  {% numbered-item %}
  Select **Global**, then **Copilot Global**, to make the server available in all your workspaces.
  {% /numbered-item %}
{% /numbered-list %}

If the MCP server requires authentication, VS Code prompts you to sign in.

Run **Chat: Open Customizations** and select **Tools** to check that the tools of the server are on.

  {% /tab %}

  {% tab label="Codex" %}

In your terminal, run:

```shell
codex mcp add example-mcp --url https://example.com/mcp
```

If the MCP server requires authentication, run `codex mcp login example-mcp` and complete the sign-in flow.

Run `codex mcp list` to check that the server is in the list.

To test the connection, ask Codex to perform a task that uses an MCP tool.

  {% /tab %}

  {% tab label="ChatGPT" %}

ChatGPT on the web connects remote MCP servers.
The steps and the plans that allow it change often, so follow [OpenAI's guide to custom MCP servers](https://developers.openai.com/api/docs/guides/custom-mcp-server).
Use these values:

- **Name**: a name for the server
- **Server URL**: `https://example.com/mcp`
- **Authentication**: OAuth if the MCP server requires authentication, otherwise no authentication

In a chat, type `@` and select your installed plugin.

  {% /tab %}

  {% tab label="Grok Build" %}

In your terminal, run:

```shell
grok mcp add --transport http example-mcp https://example.com/mcp
```

If the MCP server requires authentication, complete the sign-in flow.

To test the connection, ask Grok Build to perform a task that uses an MCP tool.

  {% /tab %}

  {% tab label="Grok app" %}

The MCP server must be reachable on the public internet.

{% numbered-list %}
  {% numbered-item %}
  On grok.com, open **Connectors**.
  To open this page from your project, open the MCP server URL in a browser and select **Open Grok connectors**.
  {% /numbered-item %}
  {% numbered-item %}
  Select **New Connector**, then **Custom**.
  {% /numbered-item %}
  {% numbered-item %}
  Paste the MCP server URL, for example `https://example.com/mcp`.
  {% /numbered-item %}
  {% numbered-item %}
  If the MCP server requires authentication, complete the sign-in flow.
  {% /numbered-item %}
{% /numbered-list %}

To test the connection, ask a question that uses an MCP tool in a Grok chat.

  {% /tab %}

{% /tabs %}

## Public endpoint for anonymous users

When RBAC restricts content, the `/mcp` endpoint requires authentication and anonymous users cannot browse the content that RBAC marks public.
To keep public content reachable for AI tools without a login, enable the public endpoint:

```yaml
mcp:
  docs:
    publicEndpoint: true
```

The MCP server then also serves `/mcp-public` on your project root URL.
Requests to it are never challenged for authentication, any provided credentials are ignored, and the served APIs and search results include only content available to the `anonymous` team.
The `/mcp` endpoint keeps working as before for authenticated users.

{% admonition type="warning" %}
Everything your RBAC rules grant to the `anonymous` team becomes reachable over `/mcp-public` without a login.
Review these rules before you enable the endpoint.
{% /admonition %}

If you [restrict the MCP server itself](#restrict-access-to-the-mcp-server) with the `rbac.features.mcp` configuration, it must grant access to the `anonymous` team, or the `/mcp-public` endpoint is not registered and the build logs a note.

The public endpoint is only served when `/mcp` requires authentication and the `anonymous` team can reach some content.
When the project has no protected content, `/mcp` already serves anonymous users, so `/mcp-public` is not registered and the build logs a note instead.
A project that uses [`requiresLogin`](../../config/access/requires-login.md) without `rbac` rules has no public content, so `/mcp-public` is not registered either.

Users discover the public endpoint in three ways:

- A browser visit to `/mcp-public` displays the same setup page as `/mcp`, with connection snippets that point at the public endpoint and a note that it serves public content only.
- The two setup pages link to each other: the `/mcp` page links to the public endpoint, and the `/mcp-public` page links back to the main endpoint.
- When an unauthenticated MCP client connects to the restricted `/mcp` endpoint, the `401` response body mentions the `/mcp-public` URL.

## Resources

- **[MCP configuration reference](../../config/mcp.md)** - Configure MCP for your project
- **[Redocly MCP server](./redocly-mcp.md)** - Connect your AI tools to Redocly's own documentation server to see the Docs MCP server in action
- **[RBAC configuration reference](../../config/access/rbac.md)** - Restrict MCP server access to specific teams
- **[Agent skills](../agent-skills/index.md)** - Publish task-focused `SKILL.md` instructions and the discovery endpoints agents read to find them
