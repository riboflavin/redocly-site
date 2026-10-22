---
plans:
  - Scale
  - Enterprise
---

# AI assistant web component configuration

{% configOptionRequirements plans=$frontmatter.plans /%}

This page lists the options of the [AI assistant web component](./ai-assistant-web-component.md).

## Script URL

The `latest` URL gets each new release in one minute or less:

```text
https://cdn.redocly.com/ai-assistant/releases/latest/main.js
```

To decide when you get a release, use a version URL instead, for example `releases/v1.0.0/main.js`.
A version URL never changes.
The [changelog](../changelog.page.tsx#AI-assistant-web-component) lists each version and its changes.
To find the version of the script on a page, enter `RedoclyAssistant.version` in the browser console.

Add the script only one time on each page.

## Attributes

Add these attributes to the `<redocly-ai-assistant>` element.
If you change an attribute after the page loads, the assistant applies the change, except for `open`.

A boolean attribute is true when the element has it, for example `<redocly-ai-assistant trigger-hide>`.
To make it false, remove it or set it to `"false"`.

### Connection

{% table %}

- Attribute
- Type
- Description

---

- api-url
- string
- **REQUIRED.**
  The URL of your Redocly project, for example `https://docs.acme.com`.
  If the project uses a path prefix, add the prefix, for example `https://acme.com/docs`.

{% /table %}

### Layout

```html
<redocly-ai-assistant
  api-url="https://docs.acme.com"
  variant="panel"
  position="bottom-left"
  color-mode="dark"
></redocly-ai-assistant>
```

{% table %}

- Attribute
- Type
- Description

---

- variant
- string
- The type of the chat window.
  Possible values: `widget` (a small window next to the **Ask AI** button), `modal` (in the center of the page), `panel` (full height, on one side).
  Default: `widget`.

---

- position
- string
- The location of the **Ask AI** button.
  Possible values: `bottom-right`, `bottom-left`, `bottom-center`, `top-right`, `top-left`, `top-center`.
  The `panel` window opens on the left side for `bottom-left` and `top-left`, and on the right side for the other values.
  Default: `bottom-right`.

---

- color-mode
- string
- The colors of the assistant.
  Possible values: `light`, `dark`, `system` (the color mode of the user's operating system).
  Default: `system`.

---

- width
- string
- The width of the chat window, as a CSS length, for example `480px`.
  To fill the screen, use `100vw`.

---

- height
- string
- The height of the chat window, as a CSS length, for example `600px`.
  To fill the screen, use `100vh`.
  The `panel` window always has the full height.

---

- resizable
- boolean
- Lets users change the size of the chat window.
  Default: `false`.

---

- movable
- boolean
- Lets users move the `widget` window by its header.
  Default: `false`.

---

- open
- boolean
- Opens the chat window when the page loads.
  Default: `false`.

---

- trigger-hide
- boolean
- Removes the **Ask AI** button, so that readers can open the assistant from your own button.
  Default: `false`.

{% /table %}

### Text and logo

```html
<redocly-ai-assistant
  api-url="https://docs.acme.com"
  trigger-text="Ask Acme"
  header-title="Acme Assistant"
  logo="https://app.acme.com/images/logo.svg"
  welcome-message="Hi! Ask me anything about Acme Payments."
  suggestions='["How do I create an API key?", "How do I test webhooks?"]'
></redocly-ai-assistant>
```

{% table %}

- Attribute
- Type
- Description

---

- trigger-text
- string
- The label of the **Ask AI** button.

---

- header-title
- string
- The title in the header of the chat window.

---

- logo
- string
- The icon in the header.
  A value with a `/` shows as an image, for example a URL or a data URI.
  Other values show as text, for example an emoji.

---

- welcome-message
- string
- The first message from the assistant.

---

- suggestions
- [string]
- Questions that users can select when the conversation is empty.
  Use a JSON array of strings in single quotes.

---

- suggestions-heading
- string
- The heading above the suggestions.

---

- placeholder
- string
- The text in the empty input field.

---

- disclaimer
- string
- A short note below the input field, for example `Answers can contain mistakes.`

{% /table %}

### Answer scope

```html
<redocly-ai-assistant
  api-url="https://docs.acme.com"
  product="Payments"
  version-folder="v2"
  version-label="2.0"
></redocly-ai-assistant>
```

{% table %}

- Attribute
- Type
- Description

---

- locale
- string
- The locale of the docs that the assistant uses, and the language of the interface.
  Set it only if your project has localized content.
  Use the exact name of the folder in `@l10n`, including case, for example `es-ES` for `@l10n/es-ES`.
  Because the value also filters the docs, a locale that none of your docs have leaves the assistant with no docs to answer from.
  If you do not set it, the assistant uses the docs in all locales.

---

- product
- string
- Limits the answers to one product.
  Use the product `name` from the [`products` configuration](../config/products.md).

---

- version-folder
- string
- Limits the answers to one API version: the name of the version folder.
  Set it together with `version-label`.

---

- version-label
- string
- Limits the answers to one API version: the version label.
  Set it together with `version-folder`.

{% /table %}

## Web component API

The script adds the `window.RedoclyAssistant` object to the page.
Its methods apply to all assistants on the page.

{% table %}

- Method or property
- Description

---

- open()
- Opens the chat window.

---

- close()
- Closes the chat window.

---

- toggle()
- Opens or closes the chat window.

---

- ask(question, options)
- Opens the chat window and sends a question.
  To keep the chat window closed, set `options` to `{ open: false }`.

---

- reset()
- Starts a new conversation.

---

- setConfig(config)
- Changes the settings.
  See [setConfig() keys](#setconfig-keys).

---

- isOpen
- `true` when a chat window is open.

---

- version
- The version of the script.

{% /table %}

### setConfig() keys

`setConfig()` takes an object with the keys that you want to change.
A key wins over its attribute, and the other attributes stay as they are.
Each call adds its keys to the keys of the earlier calls, and `setConfig(null)` removes them all.
You can call `setConfig()` before you add the element to the page.
`setConfig()` does not check the values, so use only the values from the attribute tables.

Each key is the name of an attribute in camelCase, for example `apiUrl` for `api-url`.
These keys are different:

- `suggestions` takes an array of strings.
- `version` takes the version folder and label as one object, for example `{ folder: 'v2', label: '2.0' }`.
- `open`, `trigger-hide`, `resizable`, and `movable` have no key.

These keys have no attribute:

{% table %}

- Key
- Type
- Description

---

- identityToken
- string
- An identity token for login-protected content.
  See [Answer from login-protected content](./identity-tokens.md).

---

- getIdentityToken
- function
- A function that returns an identity token.
  The assistant calls it before each request.

---

- translations
- Map[string, string]
- The interface text, by key.
  See [Interface languages](#interface-languages).

{% /table %}

## Events

The assistant sends these events to `window`.
Each `event.detail` has `element`, the element that sent the event.

{% table %}

- Event
- Description

---

- redocly-assistant:open
- The chat window opened.

---

- redocly-assistant:close
- The chat window closed.

---

- redocly-assistant:change
- The chat window opened or closed.
  `detail.isOpen` is `true` if it is open.

---

- redocly-assistant:ask
- A user or your code sent a question.
  `detail.question` is the text of the question.

---

- redocly-assistant:response
- The assistant finished an answer.
  `detail` has `question`, `answer`, `conversationId`, `messageId`, and `resources` (a JSON string).

---

- redocly-assistant:error
- A question failed.
  `detail.error` is an error code, for example `http_request_in_failed_status`.

---

- redocly-assistant:reset
- A new conversation started.

---

- redocly-assistant:feedback
- A user rated an answer.
  `detail` has `messageId`, `feedback` (`like` or `dislike`), and `reason`.
  A dislike sends a second event if the user sends a reason.

---

- redocly-assistant:identity-expired
- Redocly rejected the [identity token](./identity-tokens.md).
  `detail.status` is `invalid` or `expired`.

{% /table %}

## CSS variables

To change a variable, add a CSS rule for the `redocly-ai-assistant` element to your site.

```css
redocly-ai-assistant {
  --button-bg-color-primary: #0f766e;
}
```

The rule sets the variable in both color modes.
If `color-mode` is `system`, set the dark mode values in a media query:

```css
@media (prefers-color-scheme: dark) {
  redocly-ai-assistant {
    --button-bg-color-primary: #2dd4bf;
  }
}
```

Use only the variables in this table, so your styles keep working after an update.
The assistant also uses other variables internally, and any release can rename or remove them.

{% table %}

- Variable
- Changes
- Default (light, dark)

---

- --font-family-base
- The font of all text except code.
  Load the font on your site first.
- `system-ui`

---

- --search-ai-gradient
- The assistant icon next to each answer.
- `linear-gradient(to right, #715efe, #ff5cdc)`

---

- --button-bg-color-primary
- The send buttons in the message box and in the dislike reason field, and the **Send** button in the support form.
- `#5f81ff`

---

- --button-bg-color-primary-hover
- The same buttons, when the pointer is on them.
- `#4561db`

---

- --search-ai-user-bg-color
- The background of the user questions.
- `#1f7cff`

---

- --search-ai-user-text-color
- The text of the user questions.
- `#ffffff`

---

- --link-color-primary
- The links in the answers.
- `#1f7cff`

---

- --ai-assistant-focus-ring-color
- The keyboard focus outline.
- `#90c2fc`

---

- --bg-color
- The background of the conversation, the input field, and code blocks.
- `#ffffff`, `#22242b`

---

- --text-color-primary
- The header title, the code in the answers, and the text in the input field and the support form.
  In light mode, also the label of the **Ask AI** button, unless you set `--ai-assistant-trigger-text-color`.
- `#1a1c21`, `#fbfbfc`

---

- --text-color-secondary
- The text of the answers.
- `#3b3c45`, `#dcdde5`

---

- --border-color-secondary
- The borders of the header, the input field, and code blocks.
  In light mode, also the border of the **Ask AI** button, unless you set `--ai-assistant-trigger-border-color`.
- `#ededf2`, `#3b3c45`

---

- --search-ai-dialog-header-bg-color
- The background of the header.
- `#fbfbfc`, `#2a2b33`

---

- --ai-assistant-trigger-bg-color
- The background of the **Ask AI** button.
- `#ffffff`, `#2a2b33`

---

- --ai-assistant-trigger-text-color
- The label of the **Ask AI** button.
- `#1a1c21`, `#fbfbfc`

---

- --ai-assistant-trigger-border-color
- The border of the **Ask AI** button.
- `#ededf2`, `#3b3c45`

---

- --ai-assistant-widget-panel-width
- The width of the `widget` window.
  On screens 768px wide or less, the `widget` window fits the width of the screen instead.
- `380px`

---

- --ai-assistant-widget-panel-height
- The height of the `widget` window.
- `min(640px, 80vh)`

---

- --ai-assistant-modal-width
- The width of the `modal` window.
- `min(640px, calc(100vw - 32px))`

---

- --ai-assistant-modal-height
- The height of the `modal` window.
- `min(70vh, 640px)`

---

- --ai-assistant-panel-width
- The width of the `panel` window.
- `420px`

---

- --ai-assistant-widget-panel-border-radius
- The corners of the `widget` and `modal` windows.
- `12px`

---

- --ai-assistant-widget-z-index
- The stack order of the assistant.
  Increase it if other elements of your site cover the assistant.
- `1000`

---

- --ai-assistant-header-icon-display
- Set it to `none` to hide the default logo.
- `block`

---

- --ai-assistant-header-icon-content
- Set it to `url(...)` to show your image in the header, if you cannot use the `logo` attribute.
  To replace the default logo, also hide it with `--ai-assistant-header-icon-display`.
- `none`

{% /table %}

The `width` and `height` attributes win over the size variables.

## Interface languages

The `locale` value also sets the language of the interface.
The assistant has these languages: `ar`, `de`, `en`, `es`, `fr`, `hi`, `it`, `ja`, `ko`, `pl`, `pt`, `pt-BR`, `uk`, and `zh` (Simplified Chinese).
For a regional value, the assistant uses the language part, for example `es` for `es-ES`.
For other values, the interface is in English.

To change the interface text, or to add a language, set `translations` with `setConfig()`:

```js
window.RedoclyAssistant.setConfig({
  translations: {
    'aiAssistant.contactSupport': 'Talk to our team',
    'search.ai.placeholder': 'Ask about Acme Payments...',
  },
});
```

The keys that you do not set keep the text of the interface language.
The text attributes, for example `header-title`, win over `translations`.

{% accordion title="All text keys, with the English text" %}

```js
{
  'aiAssistant.trigger': 'Ask AI',
  'aiAssistant.triggerLabel': 'AI Assistant button',
  'aiAssistant.triggerLabel.answering': 'AI Assistant button, answering',
  'aiAssistant.triggerLabel.unread': 'AI Assistant button, new answer',
  'aiAssistant.headerTitle': 'AI Assistant',
  'aiAssistant.closeWidget': 'Close widget',
  'aiAssistant.resizeHandle': 'Drag to resize',
  'aiAssistant.contactSupport': 'Contact support',
  'aiAssistant.support.intro': 'To reach the support team, fill in the form below:',
  'aiAssistant.support.name': 'Name',
  'aiAssistant.support.email': 'Email',
  'aiAssistant.support.message': 'Message',
  'aiAssistant.support.cancel': 'Cancel',
  'aiAssistant.support.send': 'Send',
  'aiAssistant.support.sending': 'Sending…',
  'aiAssistant.support.error': 'Failed to send your request. Try again.',
  'aiAssistant.support.created': 'Your request has been sent to the support team. They will get back to you by email.',
  'search.ai.placeholder': 'Ask a question...',
  'search.ai.followUpQuestion': 'Ask a follow-up question...',
  'search.ai.generatingResponse': 'Generating response...',
  'search.ai.thinkingText': 'Thinking...',
  'search.ai.suggestionsTitle': 'Suggestions',
  'search.ai.newConversation': 'New conversation',
  'search.ai.resourcesFound.basedOn': 'Based on',
  'search.ai.resourcesFound.resources': 'resources',
  'search.ai.toolCall.executing': 'Executing',
  'search.ai.toolCall.executed': 'Executed',
  'search.ai.toolCall.usedTools': 'Used tools',
  'search.ai.feedback.title': "What didn't you like about this response?",
  'search.ai.feedback.detailsPlaceholder': 'Add specific details',
  'search.ai.feedback.more': 'More...',
  'search.ai.feedback.thanks': 'Thank you for your feedback!',
  'search.ai.error.header': 'Oops! Something went wrong.',
  'search.ai.error.description': 'We encountered an issue while processing your search. Try again later or refine your query. If the problem persists, please contact Redocly support.',
  'search.ai.error.header.forbidden': 'Feature Unavailable',
  'search.ai.error.description.forbidden': 'AI assistant is currently unavailable.',
  'search.ai.error.header.unauthorized': 'Authentication Required',
  'search.ai.error.description.unauthorized': 'You are not authorized to use AI assistant.',
}
```

{% /accordion %}

## Content Security Policy

If your site sets a `Content-Security-Policy` header, add the sources that the assistant needs:

```http
Content-Security-Policy:
  script-src 'self' https://cdn.redocly.com;
  connect-src 'self' https://docs.acme.com;
  style-src 'self' 'unsafe-inline'
```

{% table %}

- Directive {% width="18%" %}
- Source {% width="34%" %}
- Needed for

---

- script-src
- `https://cdn.redocly.com`
- The script of the assistant.

---

- connect-src
- The origin of your `api-url`
- The questions, the answer ratings, and the support requests.

---

- style-src
- `'unsafe-inline'`
- The styles of the assistant.

---

- img-src
- The origin of your logo, or `data:`
- A custom `logo` image.

{% /table %}

## Resources

- **[AI assistant web component](./ai-assistant-web-component.md)** - Add the assistant to your site
- **[Answer from login-protected content](./identity-tokens.md)** - Let the assistant use protected content for the users who sign in to your site
- **[Configure AI assistant support escalation](../project/ai-assistant.md)** - Let users send a conversation to your support team
