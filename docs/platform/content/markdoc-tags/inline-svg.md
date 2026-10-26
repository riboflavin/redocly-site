---
plans:
  - Pro
  - Scale
  - Enterprise
---
# Inline SVG tag

{% configOptionRequirements plans=$frontmatter.plans /%}

The `inline-svg` tag is used to render and style an SVG image in your document.

## Syntax and usage

The `inline-svg` tag requires a `file` attribute, which provides a file path to an SVG file.

The following example embeds a Redocly logo from an SVG file:

{% markdoc-example %}
  ``` {% process=false %}
  {% inline-svg file="./images/redocly-logo.svg" /%}
  ```
{% /markdoc-example %}

Before the SVG renders on the document, it's optimized using [SVGO](https://github.com/svg/svgo).
The `id` attribute is also prefixed with the relative file path to avoid conflicts.

### Add alternative text

Use the `alt` attribute to describe what the SVG shows.
Screen readers announce the description as the name of the image, the same way they announce the `alt` text of a regular image.

{% markdoc-example %}
  ``` {% process=false %}
  {% inline-svg file="./images/redocly-logo.svg" alt="Redocly logo" /%}
  ```
{% /markdoc-example %}

Omit the `alt` attribute for decorative SVGs that don't add information to the page.

### Style the SVG

SVGs can be styled using CSS rules added to your project, but you need a way to reference the SVG.
There's two ways to add an identifier to the SVG:

1. Modify the HTML in the SVG file and add a class.
2. Apply a CSS class directly to the `inline-svg` tag, as in the following example:

    {% markdoc-example %}
      ``` {% process=false %}
      {% inline-svg file="./images/redocly-logo.svg" .some-custom-class /%}
      ```
    {% /markdoc-example %}

The second approach provides more flexibility to writers using the Markdoc tag.

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- file
- string
- **REQUIRED.**
  Absolute or relative path to the SVG file.

---

- alt
- string
- Descriptive text that provides context for the image to help with accessibility.
  It helps people with visual impairments or who use assistive technologies to understand the content of the SVG.

{% /table %}

## Examples

### Render SVG from file

The following example adds an inline SVG to your document:

{% markdoc-example %}
  ``` {% process=false %}
  {% inline-svg file="./images/ramen-icon.svg" /%}
  ```
{% /markdoc-example %}

{% inline-svg file="./images/ramen-icon.svg" /%}

### Add alternative text to SVG

The following example describes the icon for people who use assistive technologies:

{% markdoc-example %}
  ``` {% process=false %}
  {% inline-svg file="./images/ramen-icon.svg" alt="Bowl of ramen" /%}
  ```
{% /markdoc-example %}

{% inline-svg file="./images/ramen-icon.svg" alt="Bowl of ramen" /%}

### Apply styling to SVG

This example adds custom styling to change the size and color.
The following CSS has been added to the `@theme/styles.css` file:

```css {% title="@theme/styles.css" %}
.example-svg-styles {
    svg {
        width: 80px;
        height: auto;
    }

    path {
        fill: blue;
    }
}
```

The example below adds that class to the inline SVG:

{% markdoc-example %}
  ``` {% process=false %}
  {% inline-svg file="./images/ramen-icon.svg" .example-svg-styles /%}
  ```
{% /markdoc-example %}

{% inline-svg file="./images/ramen-icon.svg" .example-svg-styles /%}

## Best practices

You can improve page performance by using a single SVG file and applying styling changes using CSS.
That way you don't have to load separate files.

Add `alt` text to SVGs that convey information, such as logos or diagrams, and omit it for decorative icons.

## Resources

- **[Markdoc overview for technical writers](https://redocly.com/learn/markdoc)** - Learn how to use Markdoc in your documentation
- **[Markdoc tags](./index.md)** - See the full list of supported Markdoc tags
