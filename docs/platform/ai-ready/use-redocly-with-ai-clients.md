---
seo:
  title: Redocly MCP server and plugin for AI clients
  description: Install the Redocly skills and the Redocly MCP server in Claude, Claude Code, ChatGPT, Codex, Cursor, or VS Code.
---
# Use Redocly with your AI client

Install Redocly in your AI client to get live access to the documentation on redocly.com.
With the Redocly plugin in Claude Code, Codex, or Cursor, you also get the Redocly agent skills.
The skills tell the AI client how to do Redocly tasks.
The Redocly MCP server searches and reads the current Redocly documentation.
You do not need a Redocly account, a sign-in, or an API key.

This page describes Redocly's own server only.
To run an MCP server for your own documentation site, see [MCP server](../customization/mcp-server/index.md).

## Install

To add only the Redocly MCP server in one step, use the **Connect to Claude** button.
You can select a different client from the drop-down menu, or copy the command or the configuration.

{% connect-mcp options=["claude", "claude-code", "cursor", "vscode", "codex", "copy"] /%}

To install the skills and the server where your client supports it, follow the steps in the tab for your client:

{% tabs %}

  {% tab label="Claude" %}

Open the [Redocly connector](https://claude.ai/directory/redocly) in the Claude directory and connect it.

To add the connector with a pre-filled link, select [Add the Redocly connector to Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=Redocly&connectorUrl=https%3A%2F%2Fredocly.com%2Fmcp).
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

On a Team or Enterprise plan, an Owner selects **Connect for your team** on the Redocly page in the Claude directory.
Or the Owner opens **Organization settings > Connectors**, selects **Add**, then **Custom > Web**, and follows the same steps.
Members then open **Customize > Connectors** and select **Connect** next to **Redocly**.

You can use the connector in Claude on the web and in the desktop app.

In Claude, Redocly is a connector.
You get the server.

  {% /tab %}

  {% tab label="Claude Code" %}

To install the Redocly plugin, run these commands in your terminal:

```shell
claude plugin marketplace add Redocly/redocly-plugin
claude plugin install redocly@redocly
```

To add only the server, run:

```shell
claude mcp add --transport http --scope user redocly https://redocly.com/mcp
```

The `--scope user` option makes the server available in all your projects.
Without it, Claude Code adds the server to the current project only, for you only.
Run `claude mcp list` and make sure that the status of `redocly` is **Connected**.

In a Claude Code session, type `/mcp` to see the server and its tools.

In Claude Code, Redocly is a plugin.
You get the skills and the server.

  {% /tab %}

  {% tab label="ChatGPT" %}

ChatGPT on the web connects remote MCP servers.
The steps and the plans that allow it change often, so follow [OpenAI's guide to custom MCP servers](https://developers.openai.com/api/docs/guides/custom-mcp-server).

{% numbered-list %}
  {% numbered-item %}
  Open [ChatGPT Plugins](https://chatgpt.com/plugins), select **+**, then select **Add custom MCP server**.
  {% /numbered-item %}
  {% numbered-item %}
  Enter these values:
- **Name**: `Redocly`
- **Server URL**: `https://redocly.com/mcp?mode=tools`
- **Authentication**: no authentication
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
  {% numbered-item %}
  In a chat, type `@` and select **Redocly**.
  {% /numbered-item %}
{% /numbered-list %}

In ChatGPT, Redocly is a custom MCP server, which ChatGPT lists as a plugin.
You get the server in tools mode, with one tool for each documentation function.

  {% /tab %}

  {% tab label="Codex" %}

To install the Redocly plugin, run these commands in your terminal:

```shell
codex plugin marketplace add Redocly/redocly-plugin
codex plugin add redocly@redocly
```

To add only the server, run:

```shell
codex mcp add redocly --url https://redocly.com/mcp
```

Run `codex mcp list` to check that the server is in the list.

In Codex, Redocly is a plugin.
You get the skills and the server.

  {% /tab %}

  {% tab label="Cursor" %}

To add only the server in one step, open the drop-down menu of the **Connect to Claude** button and select **Connect to Cursor**.
Cursor opens with the server configuration filled in.
Select **Install**.

To install the Redocly plugin, follow the steps for your plan.
On a Teams or Enterprise plan, an admin can import the [Redocly plugin repository](https://github.com/Redocly/redocly-plugin) as a [team marketplace](https://cursor.com/docs/plugins).
On other plans, copy the `plugins/redocly` folder from the repository into `~/.cursor/plugins/local/`.
On Enterprise, an admin must first turn on **Allow Local Plugin Imports**.

```shell
git clone https://github.com/Redocly/redocly-plugin
cp -r redocly-plugin/plugins/redocly ~/.cursor/plugins/local/
```

Then run **Developer: Reload Window**.

To add only the server manually:

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

In Cursor, Redocly is a plugin.
You get the skills and the server.

  {% /tab %}

  {% tab label="VS Code" %}

To add the server in one step, select [Install the Redocly MCP server in VS Code](https://vscode.dev/redirect/mcp/install?name=redocly&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fredocly.com%2Fmcp%22%7D).

To add the server manually:

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

In VS Code, Redocly is an MCP server.
You get the server.

  {% /tab %}

{% /tabs %}

### Other clients

Add `https://redocly.com/mcp` to your client as a remote server over the Streamable HTTP transport, with `redocly` as the name.
The server doesn't require headers or credentials.
Each client uses its own configuration keys, so follow your client's instructions for remote servers.

The server is listed in the MCP Registry as `com.redocly/mcp`.

### Verify the connection

Ask your AI client: "Using the Redocly MCP server, how do I split an OpenAPI description into several files with Redocly CLI?"

{% prompt title="Verify the connection" actions=["claude", "chatgpt"] %}
Using the Redocly MCP server, how do I split an OpenAPI description into several files with Redocly CLI?
{% /prompt %}

The chat shows a call to the Redocly MCP server, and the answer uses the `redocly split` command.
If the chat shows no call to the server, the AI client answered from memory.

## Example prompts

After you connect, ask questions in natural language.
The AI client decides which documentation functions to call.

{% prompt title="Learn about Redocly products" actions=["claude", "chatgpt"] %}
Using the Redocly MCP server, what products does Redocly offer, and what does each one do?
{% /prompt %}

{% prompt title="Get started with Redocly CLI" actions=["claude", "chatgpt"] %}
Using the Redocly MCP server, how do I install Redocly CLI and lint an OpenAPI file?
{% /prompt %}

{% prompt title="Configure a docs site" actions=["claude", "chatgpt"] %}
Using the Redocly MCP server, show me an example sidebar configuration for a Redocly project.
{% /prompt %}

If the AI client answers from memory instead of the documentation, name the server in the prompt.
For example: "Check the Redocly MCP server before you answer."

## What you get

The Redocly plugin gives your AI client the skills and the Redocly MCP server.
The other ways to install give you the server only.

### Skills

The Redocly plugin installs these agent skills:

{% table %}

- Skill
- What it does

---

- `redocly-cli`
- Lints, bundles, splits, and joins API descriptions, builds and previews API docs, and runs the other Redocly CLI commands.

---

- `redocly-lint-rules`
- Writes a lint rule for an OpenAPI, AsyncAPI, or Arazzo description in `redocly.yaml` or in a custom plugin.

---

- `recheck-config`
- Sets up the `recheck` block and the `recheck/*` presets in `redocly.yaml`.

---

- `recheck-lint`
- Runs `redocly recheck` on the Markdown files that you change, and fixes the problems that it finds.

---

- `redocly`
- Sets up, writes, previews, and publishes documentation with Redocly.

---

- `redocly-authoring`
- Adds and changes the pages, links, Markdoc tags, sidebar, and navbar of a Redocly project.

---

- `redocly-api-docs`
- Adds or changes the API reference docs for an OpenAPI, AsyncAPI, GraphQL, or SOAP description.

{% /table %}

Your AI client loads a skill when your request matches it.
The Redocly MCP server publishes the same skills as MCP resources, so a client that supports resources can load them without the plugin.
The [skills index](https://redocly.com/.well-known/agent-skills/index.json) lists the current skills.

## Redocly MCP server

The server gives the AI client a set of documentation functions, such as search and endpoint lookup.
The AI client calls these functions from a short script instead of through one MCP tool for each function.
The server exposes three tools:

{% table %}

- Tool
- What it does

---

- Get docs function signatures (`discover`)
- Returns the TypeScript signatures of the documentation functions, so that the AI client knows how to call them.

---

- Query the docs with code (`execute`)
- Runs a short JavaScript script that calls the documentation functions in a sandbox, and returns only the result.
  Scripts in the sandbox cannot make network requests.

---

- Submit feedback (`submit-feedback`)
- Sends a report about a page on redocly.com that is wrong or incomplete to the Redocly documentation team.
  This is the only tool that writes data.

{% /table %}

The following documentation functions read the pages on redocly.com:

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

The server also has documentation functions that list and read the API descriptions that redocly.com publishes, for example the Redocly platform API.

To get one MCP tool for each documentation function, use tools mode at `https://redocly.com/mcp?mode=tools`.
The ChatGPT steps on this page use this URL.

AI clients that support discovery can read the [server card](https://redocly.com/.well-known/mcp/server-card.json).

## Data and privacy

- The server returns only content that is public on redocly.com.
- Redocly receives the tool calls that your AI client sends, not your conversation.
- The documentation tools only read data.
  The feedback tool adds a report for the Redocly documentation team.
  The report holds the page, the text of the report, and the name of your AI client.
  No tool changes your Redocly account or your projects.
- Redocly keeps usage statistics, such as the tool name, the duration, and the response size.
  The statistics also hold the name and version of your client, and the IP address of the request.
  Redocly also keeps a security audit log of tool calls.
- The Redocly plugin runs no code on your machine.
  The skills are Markdown files, and the plugin adds only the Redocly MCP server.
  Some skills tell the AI client to run Redocly CLI commands, which it runs like any other command.
- The [Redocly Privacy Notice](https://redocly.com/privacy-notice) covers requests to the server.
  The [AI governance and security FAQ](../faq/ai-governance.md#mcp-server-security) answers security questions about the MCP server.

## Troubleshooting

{% accordion-group %}
  {% accordion title="The AI client does not use the server" %}
  Name the server in your prompt, for example: "Using the Redocly MCP server, ..."
  {% /accordion %}
  {% accordion title="The client asks you to sign in" %}
  The server does not use authentication.
  Select the option for no authentication in your client, or remove the server and add it again.
  {% /accordion %}
  {% accordion title="The tools are missing in the client" %}
  Make sure that the server URL is `https://redocly.com/mcp`, or `https://redocly.com/mcp?mode=tools` in ChatGPT, and restart your client.
  {% /accordion %}
  {% accordion title="The skills are missing" %}
  The skills come with the Redocly plugin in Claude Code, Codex, and Cursor.
  The other ways to install give you the server only.
  In another AI client that reads agent skills, run `npx skills add Redocly/redocly-plugin`.
  {% /accordion %}
  {% accordion title="The server returns HTTP 429" %}
  The server limits the number of requests from one IP address.
  Wait for the number of seconds in the `Retry-After` response header, then send the request again.
  {% /accordion %}
  {% accordion title="An answer is wrong or out of date" %}
  Ask your AI client to report the page with the Redocly MCP server, or [contact Redocly](https://redocly.com/contact-us).
  {% /accordion %}
{% /accordion-group %}

## Remove Redocly from your AI client

{% table %}

- Client
- How to remove Redocly

---

- Claude
- Open **Customize > Connectors**, select **Redocly**, then select **Remove**.
  On a Team or Enterprise plan, an Owner removes it in **Organization settings > Connectors**.

---

- Claude Code
- To remove the plugin, run `claude plugin uninstall redocly@redocly`.
  To also remove the Redocly marketplace, run `claude plugin marketplace remove redocly`.
  To remove the server only, run `claude mcp remove redocly`.

---

- ChatGPT
- Remove **Redocly** from your ChatGPT plugins.
  See [OpenAI's guide to manage apps](https://help.openai.com/en/articles/20001494-connecting-and-managing-app-accounts-in-chatgpt).

---

- Codex
- To remove the plugin, run `codex plugin remove redocly@redocly`.
  To also remove the Redocly marketplace, run `codex plugin marketplace remove redocly`.
  To remove the server only, run `codex mcp remove redocly`.

---

- Cursor
- To remove the plugin, delete the `~/.cursor/plugins/local/redocly` folder and run **Developer: Reload Window**.
  If your team installed it from a team marketplace, ask a team admin to remove it there.
  To remove the server only, remove **redocly** on the **Customize** page.
  Or delete the `redocly` entry from `mcp.json`.

---

- VS Code
- In the **Extensions** view, uninstall **redocly** from the **MCP Servers - Installed** section.
  Or delete the `redocly` entry from `~/.copilot/mcp-config.json`.

{% /table %}

## Resources

- **[MCP server](../customization/mcp-server/index.md)** - Serve your own documentation and API descriptions to AI clients over the Model Context Protocol
- **[Agent skills](../customization/agent-skills/index.md)** - Package task instructions that agents load on demand, and publish them as MCP resources
- **[Make docs AI ready](./index.md)** - Every way Redocly serves documentation to AI clients
- **[Redocly plugin repository](https://github.com/Redocly/redocly-plugin)** - Read the plugin files and report a problem with the plugin
