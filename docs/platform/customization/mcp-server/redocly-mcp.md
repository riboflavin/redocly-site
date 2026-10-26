---
seo:
  title: Redocly MCP server
  description: Connect Claude, Claude Code, Cursor, VS Code, Codex, or ChatGPT to the Redocly MCP server and ask about Redocly products and docs.
---
# Redocly MCP server

Use the Redocly MCP server to let your AI assistant answer questions about Redocly products from the documentation published on redocly.com.
The server is a hosted [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server.
It is public: you do not need a Redocly account, a sign-in, or an API key.

The server URL is:

```text
https://redocly.com/mcp
```

This page describes Redocly's own server only.
To run an MCP server for your own documentation site, see [MCP servers](./index.md).

## Before you begin

You must have an MCP client that supports remote servers over the Streamable HTTP transport.

## Connect to the Redocly MCP server

To add the Redocly MCP server to your AI client, use the **Connect to Claude** button.
You can select a different client from the drop-down menu, or copy the command or the configuration.

{% connect-mcp options=["claude", "claude-code", "cursor", "vscode", "codex", "copy"] /%}

Alternatively, follow the steps in the tab for your client:

{% tabs %}

  {% tab label="Claude" %}

For an automated installation, select [Add the Redocly connector to Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=Redocly&connectorUrl=https%3A%2F%2Fredocly.com%2Fmcp).
The link opens the **Add custom connector** dialog on claude.ai with the name and the URL filled in.
Review the values and select **Add**.

To add the connector manually:

{% numbered-list %}
  {% numbered-item %}
  Open **Customize > Connectors**, select **Add**, then select **Add custom connector**.
  {% /numbered-item %}
  {% numbered-item %}
  Enter `Redocly` as the name and `https://redocly.com/mcp` as the URL, then select **Continue**.
  {% /numbered-item %}
  {% numbered-item %}
  Review the detected authentication settings and select **Continue**.
  {% /numbered-item %}
  {% numbered-item %}
  Under **Authentication**, select **No sign in**.
  {% /numbered-item %}
  {% numbered-item %}
  Select **Add**.
  {% /numbered-item %}
{% /numbered-list %}

On a Team or Enterprise plan, an Owner opens **Organization settings > Connectors**, selects **Add**, then **Custom > Web**, and follows the same steps.
Members then open **Customize > Connectors** and select **Connect** next to **Redocly**.

You can use the connector in Claude on the web and in the desktop app.

  {% /tab %}

  {% tab label="Claude Code" %}

In your terminal, run:

```shell
claude mcp add --transport http --scope user redocly https://redocly.com/mcp
```

The `--scope user` option makes the server available in all your projects.
Without it, Claude Code adds the server to the current project only, for you only.

Run `claude mcp list` and make sure that the status of `redocly` is **Connected**.
In a Claude Code session, type `/mcp` to see the server and its tools.

  {% /tab %}

  {% tab label="Cursor" %}

To add the server manually:

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
      "redocly": {
        "url": "https://redocly.com/mcp"
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
  Enter `https://redocly.com/mcp` as the URL.
  {% /numbered-item %}
  {% numbered-item %}
  Enter `redocly` as the server ID.
  {% /numbered-item %}
  {% numbered-item %}
  Select **Global**, then **Copilot Global**, to make the server available in all your workspaces.
  {% /numbered-item %}
{% /numbered-list %}

Run **Chat: Open Customizations** and select **Tools** to check that the Redocly tools are on.

  {% /tab %}

  {% tab label="Codex" %}

In your terminal, run:

```shell
codex mcp add redocly --url https://redocly.com/mcp
```

Run `codex mcp list` to check that the server is in the list.

  {% /tab %}

  {% tab label="ChatGPT" %}

ChatGPT on the web connects remote MCP servers.
The steps and the plans that allow it change often, so follow [OpenAI's guide to custom MCP servers](https://developers.openai.com/api/docs/guides/custom-mcp-server).
Use these values:

- **Name**: `Redocly`
- **Server URL**: `https://redocly.com/mcp`
- **Authentication**: no authentication

In a chat, type `@` and select **Redocly**.

  {% /tab %}

{% /tabs %}

### Other clients

Add `https://redocly.com/mcp` to your client as a remote server over the Streamable HTTP transport, with `redocly` as the name.
The server doesn't require headers or credentials.
Each client uses its own configuration keys, so follow your client's instructions for remote servers.

To get one MCP tool for each documentation function, use `https://redocly.com/mcp?mode=tools`.

### Verify the connection

Ask your assistant: "Using the Redocly MCP server, how do I split an OpenAPI description into several files with Redocly CLI?"

{% prompt title="Verify the connection" actions=["claude", "chatgpt"] %}
Using the Redocly MCP server, how do I split an OpenAPI description into several files with Redocly CLI?
{% /prompt %}

The chat shows a call to the Redocly MCP server, and the answer uses the `redocly split` command.
If the chat shows no call to the server, the assistant answered from memory.

## Example prompts

After you connect, ask questions in natural language.
The assistant decides which documentation functions to call.

{% prompt title="Learn about Redocly products" actions=["claude", "chatgpt"] %}
Using the Redocly MCP server, what is the Redocly platform, and how is it different from Redocly?
{% /prompt %}

{% prompt title="Get started with Redocly CLI" actions=["claude", "chatgpt"] %}
Using the Redocly MCP server, how do I install Redocly CLI and lint an OpenAPI file?
{% /prompt %}

{% prompt title="Configure a docs site" actions=["claude", "chatgpt"] %}
Using the Redocly MCP server, show me an example sidebar configuration for a Redocly project.
{% /prompt %}

If the assistant answers from memory instead of the documentation, name the server in the prompt.
For example: "Check the Redocly MCP server before you answer."

## What the server provides

The server runs in code mode.
By default, it does not expose one MCP tool for each documentation function.
It exposes three tools:

{% table %}

- Tool
- What it does

---

- Get docs function signatures (`discover`)
- Returns the TypeScript signatures of the documentation functions, so that the assistant knows how to call them.

---

- Query the docs with code (`execute`)
- Runs a short JavaScript script that calls the documentation functions in a sandbox, and returns only the result.
  Scripts in the sandbox cannot make network requests.

---

- Submit feedback (`submit-feedback`)
- Sends a report about a page on redocly.com that is wrong or incomplete to the Redocly documentation team.
  This is the only tool that writes data.

{% /table %}

The documentation functions are the following:

{% table %}

- Function
- What it does

---

- `search`
- Searches the content published on redocly.com: product documentation, learning content, and the blog.

---

- `listPages`
- Lists the navigation of the pages on redocly.com, one level per call.

---

- `getPage`
- Returns a page as Markdown, 200 lines per call by default, with the outline of its headings.

---

- `grepPages`
- Finds the lines in the pages that contain the text that you give.

{% /table %}

The server also has functions that list and read the API descriptions that redocly.com publishes, for example the Reunite API.

The server also publishes Redocly's [agent skills](../agent-skills/index.md) as MCP resources, for example for Redocly CLI commands and lint rules.
A client that supports resources can load a skill when a task needs it.
The [skills index](https://redocly.com/.well-known/agent-skills/index.json) lists the current skills.

Agents that support discovery can read the [server card](https://redocly.com/.well-known/mcp/server-card.json).

## Troubleshooting

{% accordion-group %}
  {% accordion title="The assistant does not use the server" %}
  Name the server in your prompt, for example: "Using the Redocly MCP server, ..."
  {% /accordion %}
  {% accordion title="The client asks you to sign in" %}
  The server does not use authentication.
  Select the option for no authentication in your client, or remove the server and add it again.
  {% /accordion %}
  {% accordion title="The tools are missing in the client" %}
  Make sure that the server URL is `https://redocly.com/mcp`, and restart your client.
  {% /accordion %}
  {% accordion title="The server returns HTTP 429" %}
  The server limits the number of requests from one IP address.
  Wait for the number of seconds in the `Retry-After` response header, then send the request again.
  {% /accordion %}
  {% accordion title="An answer is wrong or out of date" %}
  Ask your assistant to report the page with the Redocly MCP server, or [contact Redocly](https://redocly.com/contact-us).
  {% /accordion %}
{% /accordion-group %}

## Data and privacy

- The server returns only content that is public on redocly.com.
- Redocly receives the tool calls that your assistant sends, not your conversation.
- The documentation tools only read data.
  The feedback tool adds a report for the Redocly documentation team.
  The report holds the page and the text of the report.
  No tool changes your Redocly account or your projects.
- Redocly keeps usage statistics, such as the tool name, the duration, the response size, and the name and version of your client.
- The [Redocly Privacy Notice](https://redocly.com/privacy-notice) covers requests to the server.
  The [AI governance and security FAQ](../../faq/ai-governance.md#mcp-server-security) answers security questions about Redocly MCP servers.

## Disconnect from the Redocly MCP server

{% table %}

- Client
- How to disconnect

---

- Claude
- Open **Customize > Connectors**, select **Redocly**, then select **Remove**.
  On a Team or Enterprise plan, an Owner removes it in **Organization settings > Connectors**.

---

- Claude Code
- Run `claude mcp remove redocly`.

---

- Cursor
- Remove the **redocly** server on the **Customize** page, or delete the `redocly` entry from `mcp.json`.

---

- VS Code
- In the **Extensions** view, uninstall **redocly** from the **MCP Servers - Installed** section.
  Or delete the `redocly` entry from `~/.copilot/mcp-config.json`.

---

- Codex
- Run `codex mcp remove redocly`.

---

- ChatGPT
- Remove the Redocly plugin or app in the ChatGPT settings.
  See [OpenAI's guide to manage apps](https://help.openai.com/en/articles/20001494-connecting-and-managing-app-accounts-in-chatgpt).

{% /table %}

## Resources

- **[MCP servers](./index.md)** - Run an MCP server for your own documentation site and restrict who can use it
- **[MCP configuration reference](../../config/mcp.md)** - Configure the MCP server for your project in `redocly.yaml`
- **[Agent skills](../agent-skills/index.md)** - Package task instructions that agents load on demand, and publish them as MCP resources
- **[Make docs AI ready](../../ai-ready/index.md)** - Every way Redocly serves documentation to AI assistants and agents
