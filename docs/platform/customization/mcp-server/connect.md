---
plans:
  - Pro
  - Scale
  - Enterprise
description: Add the MCP server of your project to Claude Code, Cursor, Claude, VS Code, Codex, ChatGPT, Grok, or another AI client.
---

# Connect an AI client to your MCP server

{% configOptionRequirements plans=$frontmatter.plans /%}

The MCP server of your project is available at `/mcp` on your project root URL, for example `https://example.com/mcp`.
When your project has a path prefix, the URL includes the prefix, for example `https://example.com/<prefix>/mcp`.
AI clients connect to it as a remote server over the Streamable HTTP transport.
When your readers open `/mcp` in a browser, the setup page shows them connection snippets for several AI clients.
Readers can also connect Claude, VS Code, or Cursor with the [page actions](../../config/navigation.md#pageaction-object) on each page.
The **Copy MCP server URL** page action (`copy-mcp-url`) copies the server URL and is on by default.
If you set [`navigation.actions.items`](../../config/navigation.md#pageaction-object), include `copy-mcp-url` in the list.

After you connect, the AI client can read your documentation and API descriptions through the server.

## Before you begin

Make sure that the MCP server is on in your [`mcp` configuration](../../config/mcp.md).

## Add the server to your AI client

Follow the steps in the tab for your client.
The examples use `example-mcp` as the server name.

{% tabs %}

  {% tab label="Claude Code" %}

In your terminal, run:

```shell
claude mcp add --transport http --scope user example-mcp https://example.com/mcp
```

The `--scope user` option makes the server available in all your projects.
Without it, Claude Code adds the server to the current project only, for you only.

Run `claude mcp list` to check that the server is in the list.

In a Claude Code session, type `/mcp` to see the server and its tools.
If the MCP server requires a sign-in, select the server in the `/mcp` list and complete the sign-in.

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

  To send a bearer token with each request, add a `headers` object:

  ```json {% title="mcp.json" %}
  {
    "mcpServers": {
      "example-mcp": {
        "url": "https://example.com/mcp",
        "headers": {
          "Authorization": "Bearer <token>"
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

Cursor supports OAuth for MCP servers that require a sign-in.

To test the connection, ask a question that uses an MCP tool in a Cursor chat.

  {% /tab %}

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

Review any trust or authentication prompts.

To test the connection, run **Chat: Open Customizations**, select **Tools**, and check that the tools of the server are on.

  {% /tab %}

  {% tab label="Codex" %}

In your terminal, run:

```shell
codex mcp add example-mcp --url https://example.com/mcp
```

If the MCP server requires a sign-in, run `codex mcp login example-mcp` and complete the sign-in.

Run `codex mcp list` to check that the server is in the list.

To test the connection, ask Codex to perform a task that uses an MCP tool.

  {% /tab %}

  {% tab label="ChatGPT" %}

ChatGPT connects a remote MCP server as a custom plugin.
The steps and the plans that allow it change often, so follow [OpenAI's guide to custom MCP servers](https://developers.openai.com/api/docs/guides/custom-mcp-server).

{% numbered-list %}
  {% numbered-item %}
  Open **Plugins**, select **+**, then select **Add custom MCP server**.
  {% /numbered-item %}
  {% numbered-item %}
  Enter a name, a description, and the MCP server URL, for example `https://example.com/mcp`.
  {% /numbered-item %}
  {% numbered-item %}
  Configure the authentication.
  Select OAuth if the MCP server requires a sign-in, otherwise select no authentication.
  {% /numbered-item %}
  {% numbered-item %}
  Review the risk warning and select **I understand and want to continue**.
  {% /numbered-item %}
  {% numbered-item %}
  Select **Create as a plugin**.
  {% /numbered-item %}
  {% numbered-item %}
  Install the plugin.
  {% /numbered-item %}
{% /numbered-list %}

To test the connection, type `@` in a chat, select the plugin, and ask a question that uses an MCP tool.

  {% /tab %}

  {% tab label="Grok Build" %}

In your terminal, run:

```shell
grok mcp add --transport http example-mcp https://example.com/mcp
```

If the MCP server requires a sign-in, complete the sign-in.

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
  If the MCP server requires a sign-in, complete the sign-in.
  {% /numbered-item %}
{% /numbered-list %}

To test the connection, ask a question that uses an MCP tool in a Grok chat.

  {% /tab %}

{% /tabs %}

### Other clients

Add `https://example.com/mcp` to your client as a remote server over the Streamable HTTP transport.
Each client uses its own configuration keys, so follow your client's steps for a remote server.

## Disconnect from the MCP server

{% table %}

- Client
- How to disconnect

---

- Claude Code
- Run `claude mcp remove example-mcp`.

---

- Cursor
- Remove the **example-mcp** server on the **Customize** page, or delete the `example-mcp` entry from `mcp.json`.

---

- Claude
- Open **Customize > Connectors**, select the connector, then select **Remove**.
  On a Team or Enterprise plan, an Owner removes it in **Organization settings > Connectors**.

---

- VS Code
- In the **Extensions** view, uninstall **example-mcp** from the **MCP Servers - Installed** section.
  Or delete the `example-mcp` entry from `~/.copilot/mcp-config.json`.

---

- Codex
- Run `codex mcp remove example-mcp`.

---

- ChatGPT
- Remove the plugin in the **Plugins** settings.
  See [OpenAI's guide to manage apps](https://help.openai.com/en/articles/20001494-connecting-and-managing-app-accounts-in-chatgpt).

---

- Grok Build
- Run `grok mcp remove example-mcp`.

---

- Grok app
- On grok.com, open **Connectors** and remove the **example-mcp** connector.

{% /table %}

## Troubleshooting

{% accordion-group %}
  {% accordion title="The client asks you to sign in" %}
  The server requires a sign-in when your project restricts access to its content or to the server.
  Sign in from your client.
  To learn which settings require a sign-in, see [Control access to the MCP server](./access.md).
  {% /accordion %}
  {% accordion title="The server returns HTTP 401" %}
  The server returns `401` to a client without a valid token when the project restricts access.
  When the project serves the public endpoint, the response body names the `/mcp-public` URL.
  Connect to that URL to read the public content without a sign-in, or sign in to `/mcp`.
  {% /accordion %}
  {% accordion title="The server returns HTTP 429" %}
  The server limits the number of requests from one IP address.
  Wait for the number of seconds in the `Retry-After` response header, then send the request again.
  For the default limits, see [Limits and what Redocly logs](./index.md#limits-and-what-redocly-logs).
  {% /accordion %}
  {% accordion title="The tools are missing in the client" %}
  Make sure that the server URL is the `/mcp` URL of your project, and restart your client.
  {% /accordion %}
  {% accordion title="The AI client does not call the server" %}
  Name the server in your prompt, for example: "Using the example-mcp server, ..."
  {% /accordion %}
{% /accordion-group %}

## Resources

- **[MCP server](./index.md)** - Learn what the MCP server of your project serves to AI clients
- **[Control access to the MCP server](./access.md)** - Restrict the server to teams and serve public content without a sign-in
- **[Connect MCP tag](../../content/markdoc-tags/connect-mcp.md)** - Add a button that connects an AI client to your MCP server from any page
- **[Page actions](../../config/navigation.md#pageaction-object)** - Configure the page actions menu, which includes the actions that connect AI clients to the server
