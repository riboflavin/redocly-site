A menu entry accepts the same options as a [sidebar link](../navigation/sidebars.md#link-options), plus `items`.
The most common options are:

{% table %}

- Option
- Type
- Description

---

- page
- string
- **REQUIRED.**
  Path to the page the entry opens.
  The page can be a Markdown file or an OpenAPI, AsyncAPI, or GraphQL description.

---

- label
- string
- Link text displayed in the dropdown.
  Default: the title of the page.

---

- items
- [[Sidebar item](../navigation/sidebars.md#sidebars-configuration-options)]
- Sidebar displayed while the entry is active.
  Accepts links, groups, separators, directories, and `$ref` to other sidebar files.

---

- icon
- string or [srcSet](../navigation/sidebars.md#icon-object)
- Icon displayed next to the entry label.
  Accepts a [Font Awesome](https://fontawesome.com/icons) icon name or a relative path to an icon image file.

---

- labelTranslationKey
- string
- Sets the translation key for the entry label.
  Used for [localization](../content/localization/localize-labels.md#localize-user-defined-ui-elements).

---

- rbac
- object
- Access controls for the entry.
  See [Configure RBAC in sidebar](../access/links-and-groups-permissions.md#in-the-sidebar) for more information.

{% /table %}
