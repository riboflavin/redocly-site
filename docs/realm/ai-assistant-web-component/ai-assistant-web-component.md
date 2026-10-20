---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise+
keywords:
  includes:
    - widget
    - embed
    - chatbot
---

# AI assistant web component

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The AI assistant web component adds the AI assistant of your Redocly project to any website, for example your app or your support portal.
Users ask questions on your site, and the assistant answers from your docs.

{% admonition type="info" name="AI assistant and protected docs" %}
By default, the assistant uses only the content that anonymous users can read.
To use protected content, send [identity tokens](./identity-tokens.md).
{% /admonition %}

## Add the assistant to your site

{% numbered-list %}
{% numbered-item %}
### Allow requests from your site

You must have the Admin role in the project.

1. In Reunite, open your project, and select **Settings** > **Environment variables**.
1. Add the `REDOCLY_CORS_ORIGINS` variable with the address of your site as the value, for example `https://app.acme.com`.
   To allow more sites, separate the addresses with commas.
{% /numbered-item %}
{% numbered-item %}
### Redeploy the project

1. Navigate to **Deployments**.
1. On the latest production deployment, select **More actions** > **Redeploy**.
   The variable takes effect after the redeploy.
{% /numbered-item %}
{% numbered-item %}
### Add the snippet

1. Configure the assistant in the playground.
1. Follow the install steps under the preview.
{% /numbered-item %}
{% /numbered-list %}

{% aiAssistantPlayground /%}

See the [AI assistant web component options](./reference.md) to reference all available attributes.

## Control the assistant from your code

The script adds the `window.RedoclyAssistant` object to your page.
Use it in your scripts after the `<script>` tag of the assistant.
The examples below show some common uses.

{% tabs %}
  {% tab label="Open from your button" %}

```html
<button id="help-button" type="button">Help</button>

<redocly-ai-assistant
  api-url="https://docs.acme.com"
  trigger-hide
></redocly-ai-assistant>

<script>
  document.getElementById('help-button').addEventListener('click', () => {
    window.RedoclyAssistant.open();
  });
</script>
```

  {% /tab %}
  {% tab label="Ask a question" %}

```js
window.RedoclyAssistant.ask('What does the error "card_declined" mean?');
```

  {% /tab %}
  {% tab label="Change the settings" %}

```js
window.RedoclyAssistant.setConfig({
  colorMode: 'dark',
  welcomeMessage: 'Hi! Ask me anything about Acme Payments.',
});
```

  {% /tab %}
  {% tab label="Track the ratings" %}

```js
window.addEventListener('redocly-assistant:feedback', (event) => {
  analytics.track('assistant_feedback', event.detail);
});
```

  {% /tab %}
{% /tabs %}

For all the methods, keys, and events, see [Web component API](./reference.md#web-component-api).

## Match your brand

To change the colors and the font, set CSS variables on the `redocly-ai-assistant` element:

```css
redocly-ai-assistant {
  --font-family-base: 'Inter', sans-serif;
  --button-bg-color-primary: #0f766e;
  --search-ai-user-bg-color: #0f766e;
}
```

See [CSS variables](./reference.md#css-variables) to reference all available variables.

## Let users contact your support team

The assistant can display a **Contact support** button that sends the conversation to your support team by email.
To turn it on, see [Configure AI assistant support escalation](../reunite/project/ai-assistant.md).

## Troubleshoot

{% accordion-group %}
  {% accordion title="Something went wrong" %}
  The browser blocks the request to your project.
  The browser console shows a CORS error.

  - Make sure that `REDOCLY_CORS_ORIGINS` has the exact address of your site: the scheme, the host, and the port.
    Wildcards, such as `*`, do not work.
  - Redeploy the project after you change the variable.
  - If your project uses a path prefix, add the prefix to `api-url`, for example `https://acme.com/docs`.
  - Each IP address can send 25 requests in 5 minutes.
  {% /accordion %}
  {% accordion title="Authentication Required" %}
  The project does not let anonymous users use the AI assistant.
  If you set `access.rbac.features.aiSearch`, add `anonymous: read` to it.
  {% /accordion %}
  {% accordion title="Feature Unavailable" %}
  The AI assistant is off for the project.
  Make sure that `aiAssistant.hide` is not `true` in `redocly.yaml`, and that the organization is on the Enterprise+ plan.
  {% /accordion %}
  {% accordion title="The assistant does not use your docs" %}
  - The content requires login.
    Send [identity tokens](./identity-tokens.md).
  - The `locale`, `product`, or version attributes do not match your content.
  - The pages are new.
    The assistant uses a page only after the next production deployment.
  {% /accordion %}
  {% accordion title="The Ask AI button does not show" %}
  - The `api-url` attribute is missing.
    The browser console displays a warning.
  - The Content Security Policy of your site blocks the script.
    See [Content Security Policy](./reference.md#content-security-policy).
  {% /accordion %}
{% /accordion-group %}

## Resources

- **[AI assistant web component configuration](./reference.md)** - Every attribute, method, event, and CSS variable of the assistant
- **[Answer from login-protected content](./identity-tokens.md)** - Let the assistant use protected content for the users who sign in to your site
- **[Configure AI assistant support escalation](../reunite/project/ai-assistant.md)** - Let users send a conversation to your support team
- **[Analytics](../reunite/project/analytics.md)** - See the questions that users ask and how they rate the answers
