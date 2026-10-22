---
plans:
  - Enterprise
---
# Configure SCIM

{% configOptionRequirements plans=$frontmatter.plans /%}

System for Cross-domain Identity Management (SCIM) 2.0 lets your identity provider provision and deprovision users in your Redocly organization automatically.
SCIM works alongside [single sign-on](./sso.md).
Users still sign in through your IdP.
SCIM keeps organization membership, roles, and teams in sync with your directory.

You can enable SCIM for one [identity provider you added in the Redocly platform](./add-idp.md) (Corporate or Guest, SAML 2 or OpenID Connect).
An organization can have SCIM on only one identity provider at a time.

{% partial file="../../_partials/early-access.md" /%}

## Before you begin

Make sure you have the following:

- a SAML 2 or OpenID Connect identity provider [added in Redocly](./add-idp.md) for the organization you want to provision users into
- `owner` role in your organization
- confirmation from Redocly that SCIM is available for your organization

## Enable SCIM in Redocly

1. Log in to Redocly and access your organization's **Overview** page.
1. Select **SSO and login** in the navigation menu on the left side of the page.
1. Under **Identity Provider**, open the Corporate or Guest provider you want to connect to SCIM (for example, click **Edit**).
   If you use SAML 2 or OpenID Connect, the platform opens the corresponding identity provider form.
1. Select **Enable SCIM 2.0** and save the form.
1. Copy the **SCIM endpoint** value shown on the form.
   Enter this URL in your identity provider's SCIM or provisioning settings.

## Create a SCIM token

Your identity provider authenticates with a SCIM token that belongs to your organization.
Only an organization owner can create or revoke it.

1. Open the form of the identity provider that has **Enable SCIM 2.0** selected.
1. Under **SCIM tokens**, click **Generate token**.
1. Copy the token from the dialog.
   Redocly displays the token only once.
1. In your identity provider's SCIM settings, set bearer token authentication and paste the token.
   Your IdP sends it as `Authorization: Bearer <token>`.

A token expires one year after you create it.
The **SCIM tokens** list shows when each token expires and when your IdP last used it.
You can keep up to five active tokens, so you can put a new token in your IdP before you revoke the old one.

To revoke a token, click **Revoke** next to it.
Your IdP's SCIM requests that use a revoked or expired token fail, and provisioning stops until you configure a valid token.
Turning off **Enable SCIM 2.0** revokes every active token.

## Supported SCIM attributes

Redocly follows SCIM 2.0 Core User and Group resources.
Map your identity provider's attributes to the SCIM fields so the provisioning matches data in Redocly.

### Users

Redocly reads these SCIM User attributes:

- **userName** and **emails**: The primary email identifies the person in Redocly.
  If a Redocly account with that email already exists, SCIM adds that account to your organization.
  Otherwise, SCIM creates the account.
- **externalId** (IdP user id): Stored on the organization member.
- **name.givenName** and **name.familyName** (first and last name): Shown for the person in your organization.
- **active** (access to your organization): **true** gives the person access.
  **false** deactivates them in your organization.

SCIM never changes the person's own account.
Their email address, name, and membership in other Redocly organizations stay as they are.

### Groups

Groups named after Redocly organization roles set the person's role:

{% table %}
- Group
- Organization role
---
- `redocly.owners`
- `owner`
---
- `redocly.members`
- `member`
---
- `redocly.billing`
- `billing`
---
- `redocly.viewers`, `redocly.participants`
- `viewer`
{% /table %}

If a person is in more than one of these groups, the highest role applies.
When a person leaves their last role group, they get the default role of the identity provider.
Until your IdP pushes at least one of these groups, SCIM keeps the role each existing member already has and gives new members the default role.
Push the role groups first if you want SCIM to manage roles from the first sync.

With a Corporate identity provider, single sign-on also sets the role at every sign-in.
The person gets the role of the role group your identity provider sends at sign-in, or the default role of the identity provider if it sends none.
So a role that SCIM kept, or that someone changed in Redocly, lasts until the person's next single sign-on.
A Guest identity provider doesn't change the role at sign-in.

Role groups never become teams.

Every other group becomes a [synced team](../teams.md#teams-you-manage-and-teams-your-identity-provider-syncs) with the group's **displayName** as the team name.
Nobody can edit a synced team in Redocly.
SCIM never changes the teams you manage, including a team with the same name as a group.

When your IdP changes a group's members, Redocly changes only that group's team.
Renaming or deleting the group renames or deletes the team.
A group with no members has no team.
Turning off SCIM on the identity provider, or deleting the identity provider, deletes its SCIM teams.

SCIM can't remove the `owner` role from the last owner of your organization.
A request that would demote, deactivate, or delete the last owner fails with `409 Conflict`, and the person stays an owner.

## Configure your identity provider

In your identity provider's admin console, create or edit a SCIM provisioning application (sometimes called automated provisioning or directory sync).
Use the **SCIM endpoint** from Redocly as the provisioning base URL, and configure bearer token authentication with your SCIM token.

Exact field names and steps depend on your IdP.
After you save your platform settings and your IdP configuration, run your provider's test or sync flow if available to confirm connectivity.

{% admonition type="warning" name="Deprovisioning" %}
When your IdP sets **active** to **false**, the person loses access to your organization and Redocly signs them out of it.
When your IdP deletes the user, Redocly removes them from your organization.
Their Redocly account and their access to other organizations are not affected.
{% /admonition %}

## Resources

- **[Add identity providers](./add-idp.md)** - Add or edit SAML 2 and OpenID Connect identity providers in Redocly
- **[Manage teams](../teams.md)** - Assign the teams your directory provisions to projects
- **[Configure project SSO](./configure-sso.md)** - Choose which identity providers apply to each project in `redocly.yaml`
- **[Single sign-on and login](./sso.md)** - Learn how Corporate and Guest identity providers work with Redocly and projects
- **[SSO configuration reference](../../config/access/sso.md)** - Technical reference for SSO options in your project configuration
