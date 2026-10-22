---
plans:
  - Scale
  - Enterprise
---
# Analytics

{% configOptionRequirements plans=$frontmatter.plans /%}

The Redocly platform offers built-in analytics for your projects as an alternative to third-party solutions.
Track page views, identify popular content, and analyze search queries including AI-powered search.
Use these insights to improve user experience and identify documentation gaps.

The platform collects analytics data on a project basis.
Each project has its own Analytics page.
Data collection begins after you publish your project for the first time.
Newly-deployed projects may take time to generate sufficient data.

## Analytics data collection

Analytics in Redocly help you understand how your documentation is used by tracking:
- page views: counted each time a documentation page is requested
- search queries: recorded when users perform a search, including searches that return no results

This data is collected server-side, directly from web requests.
The platform logs:
- page paths or search terms
- timestamps of the event
- requests' IP addresses, used for operational purposes such as deduplicating traffic, filtering bots, and ensuring accurate reporting

All data is collected on behalf of your organization and used only to provide aggregated insights in your Analytics dashboard.
Redocly does not use analytics data for advertising or tracking users across sites, and does not attempt to identify individual visitors.

{% admonition type="warning" name="Telemetry must be enabled" %}
Analytics data collection relies on telemetry.
Setting the `REDOCLY_TELEMETRY` environment variable to `off` in your production deployment disables telemetry.
Page views and search queries are not collected and no data appears on the Analytics page.
To collect Analytics data, leave telemetry enabled (the default in production).

See [Telemetry](./telemetry.md) for more details.
{% /admonition %}

The Analytics page contains collected data with charts for visualization.
The Analytics page is available to users with the admin or maintainer project role.
By default, organization owners and members are assigned the admin role for projects.
If a user’s role is changed to a role other than admin or maintainer, they lose access to Analytics.
Organization owners always retain access.

All elements on the **Analytics** page display the data for the period selected in the date input field top-right corner of the page.
You can change this period by clicking the date input field.

## Pages

The **Pages** section displays a table with the most visited page URLs, and a time series chart of views and unique users.

### Top 5 viewed pages

The **Top 5 viewed pages** table displays the five most visited pages.
It also shows the number of unique users and the number of views for each page.

### Views and users

Click the **View details** button to open **Page views**.

The **Page views** page displays more granular data and offers three different views:

- **Pages:** lists the most visited pages
- **Paths:** lists the most visited URL paths
- **Domains:** lists domains that refer the most traffic to your project

On this page you can:

- change the period for the displayed data
- export the data from the selected period to a CSV file
- search in pages, paths or domains

## AI Assistant

The **AI Assistant** section displays a time series chart with AI Assistant conversations and unique users.

### AI Assistant conversations and Users

The **AI Assistant conversations and Users** section displays a time series of AI-powered conversations in the selected period.

Click the **View details** button to open **AI Assistant conversations**.

The **AI Assistant conversations** page displays granular data on the use of AI-powered search.
Expand each conversation to see the full question, AI-provided answer, and corresponding sources.

The page opens with a row of summary tiles for the selected period: **Conversations**, **Messages**, **Likes**, and **Dislikes**.

On this page you can:

- change the period for the displayed data
- export the data from the selected period to a CSV file
- view the counts for liked and disliked answers
- filter the results by feedback
- search query text

## Search

The **Search** section displays:
- table with the top search queries
- time series chart with searches and unique users

### Top 5 search queries

The **Top 5 search queries** table displays the five most searched terms.
It also shows the number of unique users and the number of searches for each query.

You can use the toggle in the top-right corner of the table to switch the displayed data between:

- **All queries** - displays data for all queries, regardless of the number of results.
- **Most not found** - displays data for queries that returned no results.

### Searches and users

The **Searches and users** section displays a time series chart with searches and unique users.

Click the **View details** button to open **Search queries**.

On this page you can:

- change the period for the displayed data
- export the data from the selected period to a CSV file
- filter the results by  **All queries** or **Most not found**
- search query text

## MCP server

The **MCP server** section shows how AI clients use your project's [MCP server](../customization/mcp-server/index.md).
The section appears when your plan includes the MCP server.

Analytics count two kinds of MCP activity:

- **Requests:** calls that an AI client sends to your MCP server, for example a code run or a direct tool call
- **Tool calls:** calls to documentation tools, such as `search` or `get-endpoint-info`, directly or inside a code run

One request can run several tool calls.

### Top 5 tools

The **Top 5 tools** table displays the five most called tools, with their number of calls.

### Requests and tool calls

The **Requests and tool calls** section displays a time series chart with requests and tool calls.

Click the **View details** button to open **MCP server**.

The **MCP server** page opens with a row of summary tiles for the selected period:

- **Requests:** the number of requests from AI clients
- **Tool calls:** the number of tool calls, and the average number of tool calls for each request
- **MCP clients:** the number of distinct AI clients that report a name, such as `claude-code` or `cursor`

The page also lists up to 100 tools with their calls, and up to 100 clients with their requests.
Requests from clients that do not report a name display as **Not reported**.

On this page you can:

- change the period for the displayed data
- sort the tools and the clients by name or by count

## Resources

- **[About Redocly platform](../platform.md)** - Explore other collaborative content management and project workflow features available in Redocly
- **[Analytics configuration reference](../config/analytics/index.md)** - Configure third-party analytics tools like Google Analytics for comprehensive project usage tracking
