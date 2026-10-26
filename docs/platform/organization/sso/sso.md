---
plans:
  - Scale
  - Enterprise
---

# Single sign-on and login

{% configOptionRequirements plans=$frontmatter.plans /%}

Single sign-on (SSO) is an authentication method that allows users to log in with a single identity to several related, but independent, software systems.
You can add SSO identity providers (IdPs) to the Redocly platform to allow users to use them for logging into Redocly as well as individual projects.
After you [add an IdP to Redocly](./add-idp.md), the IdP can then be [configured in the `redocly.yaml` configuration file for individual projects](./configure-sso.md).

Users can log in with an IdP.
The default team and organization role assigned in the IdP then override the organization role assigned on the **People** page in Redocly.

## Identity provider categories in Redocly

You can add one or more identity providers in each of the two categories in Redocly:

- **Corporate:** used to authenticate internal users into Redocly and projects.
- **Guest:** used to authenticate external users into projects.

For each platform category, you can connect to your identity provider using either the SAML 2 or OpenID Connect protocol.

## Identity provider categories in `redocly.yaml`

When configuring the `redocly.yaml` configuration file for individual projects, you can add one or all of the three possible identity provider categories:

- `REDOCLY`: This value represents credentials managed by Redocly and allows users to log in with their Redocly password or social login providers, like Google.
- `CORPORATE`: This value represents credentials for IdPs you added as Corporate identity providers in Redocly.
- `GUEST`: This value represents credentials for IdPs you added as Guest identity providers in Redocly.

The values listed are the identity providers (IdPs), if added in Redocly, users can use to log in to the project.
To combine identity provider categories, configure `sso` in the `redocly.yaml` file of the project.
To target specific identity providers by their unique ID, configure [`idps`](../../config/access/idps.md) instead.
`sso` and `idps` are mutually exclusive.

## Default priority order

Identity provider configuration in `redocly.yaml` is not required for users to be able to use IdPs to log in.
You might not configure `sso` or `idps` in your project.
In that case, users can log in using IdPs you have added in Redocly, with the following default priority order:

- `GUEST`: If you added GUEST IdPs in Redocly, users must log in to the project using GUEST IdPs.
- `CORPORATE`: If you added CORPORATE IdPs in Redocly and no GUEST IdPs, users must log in to the project using CORPORATE IdPs.
- `REDOCLY`: If you didn't add either GUEST or CORPORATE IdPs in Redocly, users must use their Redocly credentials or social login providers like Google.

## Verified domains

Verified domains connect users to an organization by email domain.
These domains apply only to corporate identity providers, and only when logging in to the Redocly platform, not to projects.
Add a verified domain on the **SSO and login** page in Redocly.

Users with a verified domain email are directed to corporate identity providers.
They can still use Redocly credentials or social logins, unless you also require SSO authentication.
Requiring SSO restricts them to corporate identity providers only.

## Team mapping

Team mapping is an option when you add Corporate or Guest IdPs.
It labels your IdP groups in the Redocly platform.
The option is called "team claim mapping" for OpenID Connect, and "team attribute mapping" for SAML 2.

You can also use team mapping to assign IdP groups to [project RBAC teams](../../config/access/rbac.md#team-to-role-map) or [organization roles](../../access/roles.md#reserved-organization-role-names) other than the defaults.

When users log in with an IdP, their groups become synced teams in Redocly.
Both the group name and the mapped team name become teams.
A group mapped to an organization role sets that role and never becomes a team.
A sign-in that carries no group claim removes the person from the synced teams of that IdP but keeps them in the IdP's default team.
Teams managed in Redocly do not change.

## Disable SSO

You can disable SSO for individual projects.
When you disable SSO for a project, there is no log in page for that project.
Disabling SSO is only necessary if you have `rbac` configured, but you don't want to require login to your project.
Disabling SSO removes the login page, but does not disable `rbac`.

## Logout behavior

When a user logs out of a project, the session ends.
For OpenID Connect IdPs, users are not automatically logged back in after logout.
Users must re-authenticate at the identity provider the next time they access the project.
When a session expires without a logout, users are re-authenticated without a prompt.

Logout does not end the session at the identity provider itself, so users stay logged in to other applications that use the same IdP.

## Resources

- **[Add identity providers](./add-idp.md)** - Step-by-step guide to add identity providers in Redocly for seamless user authentication across projects
- **[Configure project SSO](./configure-sso.md)** - Set up single sign-on to allow users to authenticate using multiple identity providers for flexible access control
- **[Okta SAML integration video](https://youtu.be/NMayl8FTZ7c)** - Watch a step-by-step tutorial for integrating Okta with Redocly using SAML for single sign-on
- **[SSO configuration reference](../../config/access/sso.md)** - Complete technical reference for all SSO configuration options and settings in your redocly.yaml file
- **[Logout return URL](../../config/access/logout-return-url.md)** - Configure the page users are redirected to after they log out of a project
- **[Multi-tenant SSO: Federated identity management](./sso-multi-tenant.md)** - Implement federated identity management for organizations with multiple tenants and complex authentication requirements
- **[Configure SCIM](./configure-scim.md)** - Enable SCIM 2.0 directory provisioning for an identity provider (early access on request)
