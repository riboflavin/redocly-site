---
plans:
  - Enterprise
---
# Manage teams

{% configOptionRequirements plans=$frontmatter.plans /%}

Teams are groups of users that form an important part of configuring [role-based access control](../access/rbac.md) for your projects.
You can assign users to more than one team and manage team composition to control project access.

## Teams you manage and teams your identity provider syncs

The **Teams** page lists every team of the organization in one list.
Apart from the automatic teams, a team is either managed in Redocly or synced from an identity provider, and a synced team shows its source next to its name.

**Teams managed in Redocly:**

- Owners and team managers create these teams, add and remove members, and rename or delete them.
- Signing in and directory sync never change them.

**Teams synced from an identity provider:**

- These teams come from an identity provider group claim or from a SCIM group.
- Each team displays where it comes from and when it last synced.
- They are read-only in the Redocly platform.
  To change their members, change the group in your identity provider.
- Each sign-in through an identity provider replaces the person's teams from that identity provider.
  A sign-in that carries no group claim removes the person from that identity provider's teams but keeps them in its default team.
- An API key can belong to a synced team.
  Sign-ins and directory sync leave it there.

The list starts with the teams the platform fills on its own: `authenticated` holds everyone who signs in, and each organization role has a team with the people who have that role.
You can't edit them, but you can grant them roles in `redocly.yaml` like any other team.

A synced team with the same name as a team you manage is a separate team.
Both grant the roles configured for that name in `redocly.yaml`.

{% admonition type="info" name="Use team names from RBAC" %}

Team names used in the [team mapping single sign-on settings](./sso/add-idp.md#team-mapping) or added in Redocly **must** match the `rbac` configuration names in your `redocly.yaml` file.
Otherwise, the permissions are not granted.

{% /admonition %}

Add users to teams in one of the following ways:

- [Sync teams from your SSO identity provider](./sso/add-idp.md#team-mapping) (synced)
- [Assign users to teams with an invitation](./manage-people.md#invite-people) (managed in Redocly)
- [Add users to teams in Redocly](#add-members-to-a-team) (managed in Redocly)

## Default teams

Redocly provides built-in teams that are applied to users automatically:

- `authenticated`: Assigned to all authenticated users in addition to teams assigned from the IdP (identity provider)
- `anonymous`: Assigned to all unauthenticated users

Without a `rbac` configuration, `authenticated` and `anonymous` teams do not influence resource access.
These default teams are useful when you do not need granular permissions and only want to restrict access to unauthenticated users.

For example, the following `rbac` configuration allows users in the `authenticated` team `read` access to all files in a project:

```yaml
rbac:
  content:
    '**':
       authenticated: read
```

{% admonition type="warning" name="Reserved team names" %}
The `authenticated` and `anonymous` names are reserved team names.
If you define a team with the same name in the `redocly.yaml` file, it won't work as expected.
{% /admonition %}

### Organization role teams

Redocly also includes built-in teams based on organization roles in Redocly:

- `redocly.owners`: Assigned to all users with the owner organization role
- `redocly.members`: Assigned to all users with the member organization role
- `redocly.viewers`: Assigned to all users with the viewer organization role
- `redocly.billing`: Assigned to all users with the billing organization role

These teams are useful when adding an identity provider (IdP) in Redocly.
You have the option when adding an IdP to configure team mapping.
Team mapping connects groups in your IdP to RBAC teams in Redocly.

When users log in with an IdP, their IdP groups become synced teams.
A group mapped to one of these organization role teams sets the role and never becomes a team.
Teams managed in Redocly do not change.
See the SSO concept documentation for more information on [team mapping](./sso/sso.md#team-mapping).

## Multiple teams

If users belong to multiple teams, they have the combination of the roles assigned to their teams.

For example, the following configuration defines the `Developers` team with the `write` role and the `authenticated` team with the `read` role for the `**` scope.

```yaml
rbac:
  reunite:
    anonymous: read
    authenticated: read
    Developers: write
  content:
    '**':
      anonymous: read
      authenticated: read
      Developers: write
    docs/**/*.md:
      Developers: read
      authenticated: read
```

As a result, users in both the `Developers` and `authenticated` teams have `write` role permissions for the other resources.
They have only `read` role permissions for the `docs/**/*.md` resources.

## Team managers

Users with the Owner organization role can assign users as team managers.
Team managers help reduce the number of Owner roles needed in your organization.

Only users with the Owner and Member organization roles can be team managers.
Manager privileges are indicated by a tag on the team page.
Managers are optional for teams and there is no limit to the number of managers in a team.

Team managers can:

- View the teams they manage
- View, add, or remove users within their teams
- Update the team name

## Manage teams

Log in to Redocly with an [Owner organization role](../access/roles.md#organization-roles).
You can then view and manage teams **managed in Redocly** from the **Teams** page in the following ways:

- Create a new team
- Add members to a team
- Assign team managers
- Demote team managers
- Remove members from a team
- Rename a team
- Delete a team from your organization

{% admonition type="warning" name="Synced teams are read-only" %}
Teams synced from your identity provider or from SCIM cannot be edited on the **Teams** page.
Change their members in your identity provider (for example, Okta or Microsoft Entra ID).
{% /admonition %}

Only users with an Owner organization role and members assigned as team managers can access the **Teams** page.
Team managers can only view and manage their assigned teams.

Synced teams show their identity provider or SCIM next to their name and the time of their last sync.

The **Teams** page does not include options for determining who has access to projects.
Project access is determined by the permissions of the teams users are members of.
Team permissions are configured in the `redocly.yaml` file for each individual project.
See [Configure RBAC](../access/index.md) for more information.

### Create a new team

You can create a new team to organize users or in preparation for setting up RBAC.
You have the option to add members to your new team.
Members are users that have already been added to Redocly.

To create a new team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click **New team**.
3. Enter a name for the team.
4. (Optional) Select members from the organization to add to the team.
5. (Optional) Select managers from the organization to add to the team.
6. Click **Create**.

### Add members to a team

You can add members to a team to give them specific permissions assigned in the `redocly.yaml` file for a project.

To add members to a team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click **+ Add members & managers** or **+ Add members** (depending on role) in team's more options menu or button on the team's page.
3. Select members from the organization to add to the team.
4. Click **Add**.

### Assign team managers

You can assign team managers to a team to give them control over team composition and team name.
**Only users with the Member and Owner organization roles can become team managers.**

To add a manager to a team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click **+ Add members & managers** in team's more options menu or button on the team's page.
3. Select members from the organization to add to the team as managers.
4. Click **Add**.

You can also assign team managers from among existing team members using the team member's more options menu:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click a team you want to edit.
3. Click a team manager's more options menu and select **Make team manager**.

### Demote team managers

You can demote team managers that no longer need their privileges.

To demote a team manager:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click a team you want to edit.
3. Click a team manager's more options menu and select **Demote from manager**.

### Remove members from a team

If a user no longer needs permissions granted to a team, you can remove them from the team.

To remove members from a team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click the team.
3. Click a user's more options menu and select **Remove from team**.
4. Click **Remove**.

### Rename a team

Rename a team from the **Teams** page using the following steps:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click the more options menu icon and select **Rename**.
3. Enter a new name.
4. Click **Save**.

### Delete a team

Delete a team from the **Teams** page using the following steps:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click the more options menu icon and select **Delete**.
3. Click **Delete**.

## Resources

- **[Role-based access control](../access/rbac.md)** - Understand the components and concepts behind Redocly's role-based access control system
- **[Roles and permissions](../access/roles.md)** - Complete reference for user roles and the specific access permissions that can be granted to team members
- **[Control site access](../access/index.md)** - Configure role-based access control with examples for projects, pages, and navigation settings
- **[Manage people](manage-people.md)** - Add and manage users within your organization for effective team collaboration
- **[RBAC configuration reference](../config/access/rbac.md)** - Complete technical configuration details and options for implementing role-based access control
