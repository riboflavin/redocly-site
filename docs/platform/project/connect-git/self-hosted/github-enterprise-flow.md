---
plans:
  - Pro
  - Scale
  - Enterprise
---
# GitHub Enterprise Server connection to the Redocly platform

{% configOptionRequirements plans=$frontmatter.plans /%}

When you [connect a GitHub Enterprise Server](./github.md) to Redocly, a GitHub App is created.
Its credentials (App ID, Client ID, Client secret, and Private key) are securely stored within Redocly.
The platform uses these stored credentials exclusively to make API calls to your GitHub Enterprise Server instance.
No credentials are shared with external services or used for any purpose other than communicating with the specified GitHub Enterprise Server.

The following diagram illustrates the interaction flow:

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant the platform
  participant GHES as GitHub Enterprise Server

  User->>the platform: Perform action (connect repo / sync content / view PRs)
  note over the platform: Action requires access to GitHub Enterprise Server

  Platform->>the platform: Load saved GitHub App credentials
  Platform->>GHES: Authenticate + make API calls using GitHub App credentials
  note over the platform,GHES: Read repo content, create commits,update commit statuses, manage PR info

  GHES-->>the platform: Process request + return response
  Platform-->>User: Present result in UI
```

The flow works as follows:

1. User interacts with Redocly.
    A user performs an action in Redocly that requires access to the GitHub Enterprise Server.
    Examples: connecting a repository, syncing content, or viewing pull requests.
1. The platform authenticates with the GitHub Enterprise Server.
    The platform uses the saved GitHub App credentials to authenticate and make API calls to the GitHub Enterprise Server.
    These API calls handle operations like reading repository content, creating commits, updating commit statuses, and managing pull request information.
1. GitHub Enterprise Server responds.
    The GitHub Enterprise Server processes the request and returns the response to Redocly, which then presents the result to the user.

In addition to API-initiated communication, your GitHub Enterprise Server sends webhook events (such as `push`, `pull request`, `create`, and `delete`) to Redocly.
These webhooks notify the platform about changes in your repositories, triggering actions like preview deployments and content synchronization without requiring the user to manually refresh.

## Resources

- **[Connect a GitHub Enterprise Server](./github.md)** - Step-by-step setup for creating or adding a GitHub App and connecting your GitHub Enterprise Server instance to Redocly
- **[Connect a Git provider](../connect-git-provider.md)** - Overview of connecting Git providers to the Redocly projects, including self-hosted instances and allowed IP addresses
- **[Self-hosted Git providers](../manage-self-hosted.md)** - Add and manage self-hosted Git providers at the organization level so they are available for all projects
