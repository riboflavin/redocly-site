---
plans:
  - Pro
  - Scale
  - Enterprise
description: Control the Previous and Next navigation buttons on project pages.
---
# `navigation`

{% configOptionRequirements plans=$frontmatter.plans /%}

Control the **Previous** and **Next** navigation buttons on project pages.

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "navigation"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- nextButton
- [PageLink object](#pagelink-object)
- Controls the next page button.

---

- previousButton
- [PageLink object](#pagelink-object)
- Controls the previous page button.

---

- actions
- [PageAction object](#pageaction-object)
- Controls the actions that appear on the page.

---

{% /table %}

### PageLink object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the navigation link button.
  Default: `false`.

---

- text
- string
- Specifies the text that appears above the navigation buttons.
  Default: `Next page` or `Previous page` respectively.

{% /table %}

#### Options that apply to front matter only

{% table %}

- Option
- Type
- Description

---

- label
- string
- Specifies the text that appears on the button.
  Default: the text of the first heading of the target page.

---

- page
- string
- Path to a Markdown page in the project, or an URL.

{% /table %}

### PageAction object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the page actions.
  Default: `false`.

---

- items
- [string]
- Lists the items that appear on the page and defines their order.
  The project hides items that you omit from the list.

  Allowed values:
  - `copy`: copy the page content as Markdown to the clipboard.
  - `view`: view the page content as Markdown in a new tab.
  - `chatgpt`: ask ChatGPT about this page.
    Supported only on public pages.
  - `claude`: ask Claude about this page.
    Supported only on public pages.
  - `grok`: ask Grok about this page.
    Supported only on public pages.
  - `docs-mcp-claude`: connect to MCP server via Claude.
    Opens claude.ai with the server name and URL filled in.
  - `docs-mcp-vscode`: connect to MCP server via VS Code.
  - `docs-mcp-cursor`: connect to MCP server via Cursor.
  - `copy-mcp-url`: copy the MCP server URL to the clipboard.

  The first item in the list is the default action.
  Default: `copy`, `view`, `chatgpt`, `claude`, `grok`, `docs-mcp-claude`, `docs-mcp-vscode`, `docs-mcp-cursor`, `copy-mcp-url` in this order.

---

{% /table %}

#### Customize page action labels

You can customize the labels and descriptions for these actions using translation keys in your `translations.yaml` file.
The translation keys for customizing page actions start with the `page.actions.` prefix.

For a full list of available keys, see [Predefined translation keys](../content/localization/translation-keys.md).

## Examples

### Change navigation buttons text globally

The following example changes text labels of the navigation buttons to **Next chapter** and **Previous chapter** respectively.
This configuration applies to all pages in the project.

```yaml {% title="redocly.yaml" %}
navigation:
  nextButton:
    text: "Next chapter"
  previousButton:
    text: "Previous chapter"
```

### Hide navigation links globally

The following example hides the navigation buttons on all pages of the project.

```yaml {% title="redocly.yaml" %}
navigation:
  nextButton:
    hide: true
  previousButton:
    hide: true
```

### Customize navigation buttons in the front matter

The following example creates a custom reading flow.
Instead of following the order of pages in the sidebar, navigation buttons direct the user to a page in a different section of the project.

```yaml
---
navigation:
  nextButton:
    page: ../advanced-topics.md
    text: "Next chapter"
    label: Advanced concepts
  previousButton:
    page: ./docs/basics.md
    text: "Previous chapter"
    label: About basics
---
```

### Disable page actions

The following example disables the page actions on all pages of the project.

```yaml
navigation:
  actions:
    hide: true
```

### Customize page actions

The following example includes only the `copy` and `view` actions, which hides the AI-related (ChatGPT, Claude, Grok) and MCP actions.

```yaml
navigation:
  actions:
    items:
      - copy
      - view
```

## Resources

- **[Front matter configuration options](./front-matter-config.md)** - Configure navigation button options on individual pages using front matter for granular control
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
