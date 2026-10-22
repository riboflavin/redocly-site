---
sidebar:
  path: sidebars.yaml
---

# Redocly documentation

Publish your API the way developers and AI agents read it: a reference with try-it, an MCP server, SDKs, and workflows tested against production.
All from the API description and Markdown you already keep in Git.

## Get started

{% cards columns=3 %}
  {% card title="Start with the web editor" to="./get-started/start-reunite-editor.md" icon="pen-to-square" %}
    Create your first project in the Redocly platform and publish it from your browser.
  {% /card %}
  {% card title="Start with local development" to="./get-started/start-local-dev.md" icon="laptop-code" %}
    Build and preview a project on your machine with Redocly CLI and your own editor.
  {% /card %}
  {% card title="Migrate from a legacy product" to="https://redocly.com/docs-legacy/workflows/migrate-api-reference" icon="arrow-right-arrow-left" %}
    Move an existing Workflows or developer portal project to Redocly.
  {% /card %}
{% /cards %}

## Author content

{% cards columns=3 %}
  {% card title="Write pages" to="./content/markdown.md" icon="file-lines" %}
    Write pages in Markdown and extend them with Markdoc tags.
  {% /card %}
  {% card title="Document APIs" to="./content/api-docs/index.md" icon="brackets-curly" %}
    Generate API reference docs from OpenAPI, GraphQL, and AsyncAPI descriptions.
  {% /card %}
  {% card title="Build navigation" to="./navigation/index.md" icon="sitemap" %}
    Configure the sidebar, navbar, footer, and breadcrumbs of your site.
  {% /card %}
  {% card title="Markdoc tags" to="./content/markdoc-tags/index.md" icon="tags" %}
    Add admonitions, tabs, cards, code groups, and other built-in tags to your pages.
  {% /card %}
  {% card title="Version content" to="./content/versions.md" icon="code-branch" %}
    Publish several versions of your docs and let readers switch between them.
  {% /card %}
  {% card title="Localize content" to="./content/localization/localize-content.md" icon="language" %}
    Translate pages and labels and serve each reader in their language.
  {% /card %}
{% /cards %}

## Build for AI

{% cards columns=3 %}
  {% card title="Make docs AI ready" to="./ai-ready/index.md" icon="robot" %}
    See every way your docs reach AI assistants and agents.
  {% /card %}
  {% card title="AI assistant" to="./config/ai-assistant.md" icon="sparkles" %}
    Answer reader questions on your site with answers grounded in your docs.
  {% /card %}
  {% card title="MCP server" to="./customization/mcp-server/index.md" icon="plug" %}
    Let AI tools search your docs and call the APIs you document.
  {% /card %}
  {% card title="Agent skills" to="./customization/agent-skills/index.md" icon="wand-magic-sparkles" %}
    Publish skills that teach coding agents how to use your API.
  {% /card %}
  {% card title="AI assistant web component" to="./ai-assistant-web-component/ai-assistant-web-component.md" icon="message" %}
    Embed the assistant in your own app, outside the docs site.
  {% /card %}
  {% card title="AI governance" to="./faq/ai-governance.md" icon="shield-check" %}
    Review how AI features handle your data, access rules, and usage limits.
  {% /card %}
{% /cards %}

## Configure

{% cards columns=3 %}
  {% card title="Control site access" to="./access/index.md" icon="lock" %}
    Require login and restrict pages, navigation, and API operations with role-based access control.
  {% /card %}
  {% card title="Single sign-on" to="./organization/sso/sso.md" icon="key" %}
    Let readers and authors log in through your identity provider.
  {% /card %}
  {% card title="Site search" to="./navigation/search.md" icon="magnifying-glass" %}
    Choose a search engine, tune facets, and curate results.
  {% /card %}
  {% card title="SEO" to="./content/realm-seo.md" icon="chart-line" %}
    Set metadata, sitemaps, canonical URLs, and structured data.
  {% /card %}
  {% card title="Redirects" to="./config/redirects.md" icon="diamond-turn-right" %}
    Keep old URLs working after you move or rename pages.
  {% /card %}
  {% card title="Front matter" to="./config/front-matter-config.md" icon="file-code" %}
    Override settings for a single page.
  {% /card %}
{% /cards %}

## Customize

{% cards columns=3 %}
  {% card title="Style your site" to="./branding/index.md" icon="palette" %}
    Apply your brand with CSS variables, fonts, logos, and color modes.
  {% /card %}
  {% card title="Create React pages" to="./customization/create-react-page.md" icon="brands react" %}
    Add landing pages and interactive pages written in React.
  {% /card %}
  {% card title="Eject components" to="./customization/eject-components/index.md" icon="code" %}
    Take over the source of a theme component when styling is not enough.
  {% /card %}
  {% card title="Build Markdoc tags" to="./customization/build-markdoc-tags.md" icon="square-plus" %}
    Create your own tags for content that repeats across pages.
  {% /card %}
  {% card title="Page templates" to="./customization/custom-page-templates.md" icon="table-layout" %}
    Wrap sets of Markdown pages in your own React layout.
  {% /card %}
  {% card title="Plugins" to="./config/plugins.md" icon="puzzle-piece" %}
    Extend the build with plugins that add content, routes, or data.
  {% /card %}
{% /cards %}

## Publish and operate

{% cards columns=3 %}
  {% card title="Manage pull requests" to="./project/pull-request/manage-pull-requests.md" icon="code-pull-request" %}
    Review changes with visual diffs and comments before they go live.
  {% /card %}
  {% card title="Use previews" to="./project/use-previews.md" icon="eye" %}
    Open a preview build for every branch and pull request.
  {% /card %}
  {% card title="Deployments" to="./project/deployments.md" icon="rocket" %}
    Track production and preview builds and roll back when needed.
  {% /card %}
  {% card title="Remote content" to="./project/remote-content/remote-content.md" icon="cloud-arrow-down" %}
    Pull files from other repositories and URLs into your project.
  {% /card %}
  {% card title="Scorecards" to="./project/configure-classic-scorecard.md" icon="gauge" %}
    Score API descriptions against your standards on every build.
  {% /card %}
  {% card title="Respect Monitoring" to="./project/respect-monitoring/index.md" icon="heart-pulse" %}
    Run API workflows on a schedule and get alerted when they fail.
  {% /card %}
{% /cards %}

## Reference

{% cards columns=3 %}
  {% card title="Configuration options" to="./config/index.md" icon="gear" %}
    Every option you can set in `redocly.yaml`.
  {% /card %}
  {% card title="Redocly CLI" to="https://redocly.com/docs/cli" icon="terminal" %}
    Lint, bundle, preview, and push from the command line.
  {% /card %}
  {% card title="Changelog" to="./changelog.page.tsx" icon="list-check" %}
    What changed in each release of Redocly and the Redocly platform.
  {% /card %}
{% /cards %}
