# Make docs AI ready

Your readers no longer arrive only through a browser.
They ask AI clients questions, and the clients query your documentation directly.
Redocly serves both: it answers questions inside your site, and it gives AI clients your content in formats they read.

## Answer questions inside your site

Readers ask a question and get an answer grounded in your documentation.

- **[AI assistant configuration](../config/ai-assistant.md)** - Enable and configure the AI assistant on your site
- **[AI assistant web component](../ai-assistant-web-component/ai-assistant-web-component.md)** - Embed the assistant in your own applications outside the docs site
- **[Answer from login-protected content](../ai-assistant-web-component/identity-tokens.md)** - Let the assistant use protected content for the users who sign in to your site
- **[Analytics](../project/analytics.md#ai-assistant)** - See the questions that users ask the AI assistant and how they rate the answers

## Serve your docs to AI clients

AI clients connect to your documentation and query it as a data source.
Redocly also creates an `llms.txt` file for your site.
It lists your pages and links a clean Markdown copy of each, in the [llmstxt.org](https://llmstxt.org) format that LLM tools read.
For a real one, see [Redocly's llms.txt](https://redocly.com/llms.txt).

- **[MCP server](../customization/mcp-server/index.md)** - Serve your documentation and API descriptions to AI clients over the Model Context Protocol
- **[Connect an AI client](../customization/mcp-server/connect.md)** - Add your MCP server to Claude Code, Cursor, Claude, VS Code, Codex, ChatGPT, or another AI client
- **[Control access](../customization/mcp-server/access.md)** - Restrict the MCP server to teams and serve public content without a sign-in
- **[Custom tools](../customization/mcp-server/custom-tools.md)** - Add your own functions to the MCP server with code that you write
- **[Agent skills](../customization/agent-skills/index.md)** - Package task instructions that agents load on demand
- **[llms.txt configuration](../config/seo.md#llmstxt-object)** - Set the file's title, description, and sections, or turn it off
- **[x-mcp extension](../content/api-docs/openapi-extensions/x-mcp.md)** - Choose which API operations the MCP server exposes to AI clients
- **[Page actions](../config/navigation.md#pageaction-object)** - Copy or view any page as Markdown, ask ChatGPT or Claude about it, or connect an AI client to your MCP server
- **[WebMCP tools](../customization/webmcp/index.md)** - Publish tools to the AI agent in the reader's own browser, so it can search, read, and open your pages
- **[MCP server analytics](../project/analytics.md#mcp-server)** - See which AI clients call your MCP server and which tools they use
- **[AI governance FAQ](../faq/ai-governance.md#mcp-server-security)** - Find answers to the security and compliance questions about the MCP server

## Resources

- **[AI governance and security FAQ](../faq/ai-governance.md)** - Answers for security and compliance reviews of Redocly AI features
- **[Tune search and SEO](../search-and-seo/index.md)** - Help people and search engines find your documentation
