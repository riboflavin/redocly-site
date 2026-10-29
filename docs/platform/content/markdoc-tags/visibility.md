---
plans:
  - Pro
  - Scale
  - Enterprise
---
# Visibility tag

{% configOptionRequirements plans=$frontmatter.plans /%}

The `visibility` tag targets content at people or at AI agents.

- `for="humans"` content renders on the page, but the page's Markdown version leaves it out
- `for="agents"` content is the mirror image

The tag is absent from the rendered page and the site's keyword search index, but present in the Markdown version.
`llms.txt`, AI search, and the MCP server all read that same Markdown version.
Humans-only content stays hidden from all three, not only from the page's `.md` file.

Use this tag to give each audience its own instructions, such as a click path for people and an API call for agents.
Each audience then sees only the instructions meant for it.

## Syntax and usage

Wrap content with a `visibility` tag and set the `for` attribute to `humans` or `agents`.
The tag adds no container element around the content that renders on the page.

**Example syntax:**

{% markdoc-example renderDemo=true %}

```markdoc
{% visibility for="humans" %}
Click **Create order** in the dashboard.
{% /visibility %}

{% visibility for="agents" %}
POST /v1/orders with a JSON body.
{% /visibility %}
```

{% /markdoc-example %}

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- for
- string
- **REQUIRED.**
  The audience the content targets.
  Accepts: `humans`, `agents`.
  A missing or unrecognized value causes a build error.

{% /table %}

## Limitations

- Block-level only.
  Don't put the tag inside a paragraph.
- A heading inside a `visibility` block doesn't appear in the page's table of contents and doesn't get it's own search result.

## Resources

- **[Make docs AI ready](../../ai-ready/index.md)** - See how the Markdown version of a page feeds `llms.txt`, AI search, and the MCP server
- **[Markdoc tags](./index.md)** - See the full list of supported Markdoc tags
