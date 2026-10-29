---
plans:
  - Pro
  - Scale
  - Enterprise
---
# Prompt tag

{% configOptionRequirements plans=$frontmatter.plans /%}

The `prompt` tag adds an AI prompt to a page.
Readers can copy the prompt with one click or open it in an AI tool such as Cursor, Claude, or ChatGPT.

{% prompt title="Use numbered lists for procedures" actions=["claude", "chatgpt"] %}
Find the step-by-step procedures in this documentation project and convert each one to the numbered-list Markdoc tag.
Wrap each step in a numbered-item tag and start it with a heading.
Leave ordered lists that are not procedures as they are.
Read https://redocly.com/docs/platform/content/markdoc-tags/numbered-list first.
{% /prompt %}

## Syntax and usage

Wrap the prompt text with the `prompt` tag.
The tag does not render Markdown inside the prompt.
Readers see and copy the text exactly as you wrote it.

{% markdoc-example %}
```markdoc
{% prompt title="Use numbered lists for procedures" actions=["claude", "chatgpt"] %}
Find the step-by-step procedures in this documentation project and convert each one to the numbered-list Markdoc tag.
Wrap each step in a numbered-item tag and start it with a heading.
Leave ordered lists that are not procedures as they are.
Read https://redocly.com/docs/platform/content/markdoc-tags/numbered-list first.
{% /prompt %}
```
{% /markdoc-example %}

If a prompt is longer than five lines, the tag displays only the first five.
To see the whole prompt, readers select **Show full prompt**.

The prompt is for human readers.
Redocly excludes both the prompt text and its title from the Markdown version of the page, `llms.txt`, and AI search.
Search includes only the title, so readers can find a prompt by its title.

Redocly escapes angle brackets inside link text, such as `[Array<T>](https://example.com)`, before it parses the page, so the copied prompt contains `&lt;` and `&gt;` instead.

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- title
- string
- Text displayed in the header of the prompt block.
  Search indexes the title, but not the prompt text.

---

- icon
- string
- Icon displayed in the header.
  Either:
  - A [Font Awesome](https://fontawesome.com/icons) icon name.
    Redocly has the following icon packs built in: Classic Regular, Classic Solid, Duotone Solid, and Classic Brands.
    The icons automatically adjust their colors when users change the color mode.

    To add an icon from the Classic Regular pack, you can provide the icon name only or prefix the name with `regular`.
    To add an icon from another built-in pack, prefix the icon name with `solid` (Classic Solid), `duotone` (Duotone Solid), or `brands` (Classic Brands).

    **Examples:** `book`, `duotone book`, `brands github`

    Using other prefixes, including the `fa-` prefix, causes the icon to not render.
  - Relative path to an icon image file.

    **Example:** `./images/config-icon.svg`
  Default: the AI stars icon.

---

- actions
- [string]
- "Open in" actions displayed as a split button in the header.
  Accepts any combination of `cursor`, `claude`, and `chatgpt`.
  Each action opens a desktop app: `cursor` opens a cursor.com page that opens Cursor, `claude` starts a Claude Code session in the Claude desktop app, and `chatgpt` opens the ChatGPT desktop app.
  The reader must have the app installed.
  Without the app, the `claude` and `chatgpt` actions do nothing, or the browser shows an alert.
  The first action is the main button.
  The remaining actions are in the dropdown menu.
  Default: `[]`.

---

- hidePrompt
- boolean
- Hides the prompt text until the reader clicks **Show prompt**.
  Default: `false`.

---

- singleLine
- boolean
- Displays only the first line of the prompt, instead of the first five, until the reader selects **Show full prompt**.
  Default: `false`.

---

- buttonOnly
- boolean
- Renders only a **Copy prompt** button, without the prompt text or title.
  With `actions`, the button becomes a split button with the actions in its menu.
  Default: `false`.

{% /table %}

{% admonition type="warning" name="Open in actions use deep links" %}
Each **Open in** action opens the AI tool through a link that carries the prompt in the URL.
Browsers limit the URL length.
AI tools such as Cursor, Claude, and ChatGPT also limit the prompt that a link can prefill.
A long prompt can arrive truncated, or the tool can reject the link.
Keep prompts with `actions` short, or rely on **Copy prompt** for long prompts.
{% /admonition %}

## Examples

The following examples show common ways to configure the prompt block.

### Basic prompt

Display a prompt with a copy button:

{% markdoc-example renderDemo=true %}
```markdoc
{% prompt %}
Review this documentation project and list the pages where a numbered-list tag or an accordion tag would help readers.
Give one line per page: the file path, the tag, and the reason.
{% /prompt %}
```
{% /markdoc-example %}

### Prompt with actions

Add a title and let readers open the prompt in an AI tool.
The first action is the main button.
The remaining actions are in the dropdown menu:

{% markdoc-example renderDemo=true %}
```markdoc
{% prompt title="Use accordions for optional content" actions=["claude", "chatgpt", "cursor"] %}
Find the <details> HTML elements and the long optional sections in this documentation project, such as extended examples, troubleshooting notes, and background information.
Replace each one with an accordion Markdoc tag and use its summary or heading as the title.
Put related accordions in one accordion-group tag.
Keep content that every reader needs outside accordions.
Read https://redocly.com/docs/platform/content/markdoc-tags/accordion first.
{% /prompt %}
```
{% /markdoc-example %}

### Copy button only

Render a single **Copy prompt** button:

{% markdoc-example renderDemo=true %}
```markdoc
{% prompt buttonOnly=true %}
Connect to the MCP server at https://redocly.com/mcp over HTTP.
If you cannot connect on your own, give me the command or configuration to add it, and continue after I confirm.
Then use its tools to find which Markdoc tags Redocly has for step-by-step procedures and for collapsible content, and show me the syntax of each one.
{% /prompt %}
```
{% /markdoc-example %}

Add `actions` to get a split button with the copy button as the main action:

{% markdoc-example renderDemo=true %}
```markdoc
{% prompt buttonOnly=true actions=["claude", "chatgpt"] %}
Connect to the MCP server at https://redocly.com/mcp over HTTP.
If you cannot connect on your own, give me the command or configuration to add it, and continue after I confirm.
Then use its tools to find which Markdoc tags Redocly has for step-by-step procedures and for collapsible content, and show me the syntax of each one.
{% /prompt %}
```
{% /markdoc-example %}

### Hidden prompt

Hide a long prompt behind a **Show prompt** button:

{% markdoc-example renderDemo=true %}
```markdoc
{% prompt title="Write a docs-writing skill" hidePrompt=true actions=["cursor"] %}
Read the pages in this documentation project and derive the writing rules they follow: heading style, sentence length, tone, how procedures and examples are structured, and how pages end.
Write the rules as an agent skill in @skills/writing-docs/SKILL.md.
Follow the format at https://redocly.com/docs/platform/customization/agent-skills: YAML front matter with name and description, then the rules an agent must follow when it writes or edits a page.
State when an agent must load the skill.
Keep the body under 80 lines.
{% /prompt %}
```
{% /markdoc-example %}

### Single-line prompt

Truncate the prompt to one line until the reader expands it:

{% markdoc-example renderDemo=true %}
```markdoc
{% prompt title="Open the MCP server to anonymous readers" singleLine=true %}
In redocly.yaml of this project, set mcp.docs.publicEndpoint to true so AI clients of anonymous readers can reach the MCP server at /mcp-public without a sign-in.
Read https://redocly.com/docs/platform/config/mcp first and tell me what the endpoint exposes.
{% /prompt %}
```
{% /markdoc-example %}


## Best practices

**Write self-contained prompts**

Readers paste the prompt into a tool that does not see the page.
Include the context the tool needs, such as the API name or the file to change.

**Link the docs page of the feature**

When a prompt asks the tool to use a Redocly feature, add the URL of the feature's docs page to the prompt.
The tool reads the page and uses the correct syntax.

## Resources

- **[Markdoc tags](./index.md)** - See the full list of supported Markdoc tags
- **[Numbered list tag](./numbered-list.md)** - Render step-by-step procedures as a numbered rail of items
- **[Accordion tag](./accordion.md)** - Hide optional content in collapsible sections
- **[Agent skills](../../customization/agent-skills/index.md)** - Package task instructions that agents load on demand
- **[MCP configuration](../../config/mcp.md)** - Configure the MCP server, including the public endpoint
