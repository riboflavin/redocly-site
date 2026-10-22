---
plans:
  - Enterprise
---

# Configure AI assistant support escalation

{% configOptionRequirements plans=$frontmatter.plans /%}

Support escalation adds a **Contact support** button to the [AI assistant web component](../ai-assistant-web-component/ai-assistant-web-component.md) that you embed on other websites.
The button opens a request form, and your support team gets the request and the conversation by email.
Support escalation is off by default.
The built-in AI assistant of your Redocly project never displays this button.

## Enable support escalation

{% numbered-list %}
{% numbered-item %}
In the Redocly platform, open your project, and select **Settings** > **AI assistant**.
You must have the Maintain or Admin role in the project.
{% /numbered-item %}
{% numbered-item %}
In the **Support escalation** section, turn on **Contact support**, and enter the **Support email**.
{% /numbered-item %}
{% numbered-item %}
(Optional) In **Always show the button after**, change the number of questions after which **Contact support** appears.
{% /numbered-item %}
{% numbered-item %}
(Optional) To let the assistant display **Contact support** when it cannot answer or the user asks for a person, turn on **Offer support automatically**.
{% /numbered-item %}
{% numbered-item %}
Select **Save**.
{% /numbered-item %}
{% /numbered-list %}

The settings apply to the next question.
You do not change your site.

## Contact support button

The assistant displays the **Contact support** button when one of these conditions is true:

- The user asked the number of questions defined in **Always show the button after**.
  The default value is `3`.
- **Offer support automatically** is on, and the assistant cannot answer the question, or the user asks for a person.
- A question fails.
  The button does not show if no answer started in the conversation yet, for example when the first question fails with a network error.

## Answer support requests

Each request is an email to your support team.
The email contains:

- the user's email address, and optionally their name
- an optional message from the user
- the URL of the page where the user opened the assistant
- the conversation transcript
- a link to the conversation in Redocly

To answer the user, reply to the email.

## See the requests in Analytics

In the platform, select **Reports** > **Analytics**, and open the conversations from the [**AI Assistant** section](./analytics.md#ai-assistant).
When support escalation is on, the page shows the **Escalations** and **Ticket prevention** tiles, and the **Escalated** tag on each conversation with a support request.
The page also displays user ratings for each answer.
The project's **Feedback** page doesn't include these ratings.

## Resources

- **[AI assistant web component](../ai-assistant-web-component/ai-assistant-web-component.md)** - Add the assistant to your site
- **[Analytics](./analytics.md)** - See the questions that users ask and how they rate the answers
