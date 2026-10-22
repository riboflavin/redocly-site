{% table %}

- Option
- Type
- Description

---

- tab
- string
- **REQUIRED.**
  Label displayed in the tab row.

---

- page
- string
- Path to the tab's landing page.
  The page can be a Markdown file or an OpenAPI, AsyncAPI, or GraphQL description.
  **Mutually exclusive** with `menu`.

---

- items
- [[Sidebar item](../navigation/sidebars.md#sidebars-configuration-options)]
- Sidebar displayed while the tab is active.
  Accepts links, groups, separators, directories, and `$ref` to other sidebar files.
  Use together with `page`.

---

- menu
- [[Menu entry](../navigation/navigation-tabs.md#menu-entry-options)]
- Dropdown of pages for the tab.
  Each entry opens its own page and displays its own sidebar.
  **Mutually exclusive** with `page` and `items`.

---

- icon
- string or [srcSet](../navigation/sidebars.md#icon-object)
- Icon displayed next to the tab label.
  Accepts a [Font Awesome](https://fontawesome.com/icons) icon name or a relative path to an icon image file.

---

- tabTranslationKey
- string
- Sets the translation key for the tab label.
  Used for [localization](../content/localization/localize-labels.md#localize-user-defined-ui-elements).

---

- rbac
- object
- Access controls for the tab.
  See [Configure RBAC in sidebar](../access/links-and-groups-permissions.md#in-the-sidebar) for more information.

{% /table %}
