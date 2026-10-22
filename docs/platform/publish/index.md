---
plans:
  - Pro
  - Scale
  - Enterprise
---
# Publish, sync, and collaborate

{% configOptionRequirements plans=$frontmatter.plans /%}

Use the Redocly platform to edit your project, collaborate with your team through pull requests, connect Git providers, sync remote content, and deploy your documentation.

## Editor

- [Use the editor](../project/use-editor.md): Add, edit, or delete files and folders in your project.
- [Project interface](../project/project-ui.md): Reference the user interface of pages in Redocly's project workspace.
- [Webview](../project/use-webview.md): Preview each branch directly in the editor.
- [Test API functions](../project/test-api-functions.md): Use Replay to send requests to your API functions while you work in the editor.
- [Keyboard shortcuts](../project/keyboard-shortcuts.md): Work faster in Redocly's editor with keyboard shortcuts.

## Pull requests

- [Manage pull requests](../project/pull-request/manage-pull-requests.md): View the list of all open and closed pull requests in your project.
  - [Open pull requests](../project/pull-request/open-pull-request.md): Merge your development branch with the main branch to update your published project.
  - [Review pull requests](../project/pull-request/review-pull-request.md): Review a pull request from the **Pull requests** page.

## Previews

- [Previews](../project/use-previews.md): See how updates to a branch would look when applied to the production deployment.

## Connect a Git provider

- [Connect a Git provider](../project/connect-git/connect-git-provider.md): Connect your Redocly project to a Git provider to keep the two in sync.
  - [GitHub](../project/connect-git/github.md): Store your project files in a repository on GitHub.
  - [GitLab](../project/connect-git/gitlab.md): Store your project files in a remote repository on GitLab.
  - [Azure DevOps](../project/connect-git/azure-devops.md): Store your project files in a remote repository on Azure DevOps Services.
  - [Bitbucket Cloud](../project/connect-git/bitbucket-cloud.md): Store your project files in a remote repository on Bitbucket Cloud.

## Remote content

- [Remote content](../project/remote-content/remote-content.md): Copy content from other file sources into your Redocly project.
  - [From GitHub](../project/remote-content/from-github.md): Connect a repository on GitHub to access and publish its files in Redocly.
  - [From GitLab](../project/remote-content/from-gitlab.md): Connect a remote repository on GitLab to access and publish its files in Redocly.
  - [From Azure DevOps](../project/remote-content/from-azure-devops.md): Connect a repository on Azure DevOps Services to access and publish its files in Redocly.
  - [From Bitbucket Cloud](../project/remote-content/from-bitbucket-cloud.md): Connect a remote repository on Bitbucket Cloud to access and publish its files in Redocly.
  - [From CI/CD](../project/remote-content/push.md): Push remote content from an external source using your own CI/CD pipeline.
  - [From GitHub Actions](../project/remote-content/reunite-push-action.md): Use a GitHub Action for pushing remote content to your Redocly project.
  - [From URL](../project/remote-content/url.md): Include content from an external source available at a URL.
  - [Manually sync](../project/remote-content/manually-sync-remote-content.md): Sync remote content manually when auto-sync is disabled.
  - [Edit content folder](../project/remote-content/edit-remote-content-folder.md): Edit settings for remote content folders and files after creation.
  - [Remote content automation](../project/remote-content/verify-remote-content.md): Understand the verification processes the platform runs on remote content changes.

## Deploy your project

- [Deploy your project](./project-deployment/index.md): Control which branches deploy, review deployment history, and enforce API quality gates.
  - [Branches and deployments](../project/branches-and-deployments.md): Control which branches the platform deploys and how it handles preview deployments.
  - [Deployments](../project/deployments.md): View the history of deployments in your project.
  - [API linting](../project/lint.md): Understand the Lint deployment step and how scorecard reports surface API validation results.
  - [Configure classic scorecard](../project/configure-classic-scorecard.md): Add built-in or custom rulesets to evaluate API description files against your quality standards.
  - [Ignore the link checker](../project/ignore-link-checker.md): Publish deployments with broken links by overriding the default link checker behavior.

## Respect Monitoring

- [Respect Monitoring](../project/respect-monitoring/index.md): Use your Arazzo descriptions with Redocly's Respect command to track your APIs' health and quality.
  - [Configure monitoring](../project/respect-monitoring/configure-respect-monitoring.md): Configure the platform to monitor the performance of your APIs using Arazzo descriptions.
  - [Notifications and SLAs](../project/respect-monitoring/manage-respect-monitoring.md): Subscribe to notifications by Arazzo workflow.

## Project configuration

- [Manage projects](../project/manage-projects.md): Create, switch between, and manage the settings of your Redocly projects.
- [Upgrade your product version](../get-started/upgrade-realm-version.md): Update your project when new versions are released and trigger a new build.
- [Set custom domain](../project/custom-domain.md): Configure a custom domain for your project and optionally serve it from a subdirectory path.
- [Use environment variables](../project/env-variables.md): Define environment variables to use in `redocly.yaml` and in Markdown and React pages.

## Resources

- **[Configure RBAC](../config/access/rbac.md)** - Set up role-based access control for granular project and content access permissions
- **[Roles and permissions](../access/roles.md)** - Understand user roles and permission levels available for project access control and team collaboration
