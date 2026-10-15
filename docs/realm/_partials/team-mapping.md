Team mapping is an option when you add a Corporate or Guest IdP.
The option name differs depending on the protocol you are using to connect:

- For OpenID Connect, the option is referred to as _team claim mapping_.
- For SAML 2, the option is referred to as _team attribute mapping_.

In both instances, team mapping is a way to specify what you want your IdP groups to be labeled as in Reunite.

You can also use team mapping to assign different teams and roles than the defaults.
Assign users in your IdP groups [project RBAC teams](../config/access/rbac.md#team-to-role-map) or [organization roles](../access/roles.md#reserved-organization-role-names).

When users log in with an IdP, their groups become synced teams in Reunite.
Both the group name and the mapped team name become teams.
A group mapped to an organization role sets that role and never becomes a team.
A sign-in that carries no group claim removes the person from the synced teams of that IdP but keeps them in the IdP's default team.
Teams managed in Reunite do not change.
