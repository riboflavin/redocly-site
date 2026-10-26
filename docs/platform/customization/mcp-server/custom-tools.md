---
plans:
  - Pro
  - Scale
  - Enterprise
---

# Custom MCP tools

Add your own tools to the project's [MCP server](./index.md).
Create an `@mcp` folder in your project, and add one `.ts` or `.js` file for each tool.
The AI client calls your tool from a script that it runs with the `execute` tool of the MCP server.
The file name is the tool name, and the script calls the tool as a camelCase function: `@mcp/get-weather.ts` becomes `tools.getWeather`.
A client that uses [tools mode](./index.md#tools-mode) gets your tool as its own MCP tool.

## Create a tool

A tool file has one default export with a description, JSON Schemas for the input and the result, and an `execute` function:

```ts {% title="@mcp/get-weather.ts" %}
import type { McpToolDefinition } from '@redocly/config';

const tool: McpToolDefinition<{ city: string }> = {
  description: 'Get the current temperature in a city.',
  inputSchema: {
    type: 'object',
    required: ['city'],
    properties: {
      city: { type: 'string', description: 'City name, for example "Berlin".' },
    },
  },
  outputSchema: {
    type: 'object',
    required: ['city', 'temperatureC'],
    properties: {
      city: { type: 'string' },
      temperatureC: { type: 'number', description: 'Current temperature, in °C.' },
    },
  },
  annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: true },
  async execute({ city }) {
    const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    if (!response.ok) {
      throw new Error(`Weather lookup failed: ${response.status}`);
    }
    const data = await response.json();
    return { city, temperatureC: Number(data.current_condition[0].temp_C) };
  },
};

export default tool;
```

The `McpToolDefinition` type import is optional.
For type checks in a local editor, install `@redocly/config` and `@types/node` in your project.
The Redocly platform editor loads these types automatically.

You can put tool files in subfolders of `@mcp`, or in more than one `@mcp` folder in your project.
Only the file name sets the tool name, so `@mcp/weather/get-weather.ts` still becomes `tools.getWeather`.
If two tool files anywhere in your project have the same name, the build fails.

## Tool definition

The default export supports the following properties:

{% table %}

- Property
- Type
- Description

---

- description
- string
- **REQUIRED.**
  Description that the AI model reads to decide when to call the tool.

---

- execute
- function
- **REQUIRED.**
  Tool implementation.
  Receives `(args, context, extra)` and returns a [tool result](#tool-result).

---

- inputSchema
- object
- JSON Schema for the tool arguments.
  The schema must describe an object.
  Default: `{ type: 'object', properties: {} }`

---

- outputSchema
- object
- JSON Schema for the value that `execute` returns.
  See [Describe the result](#describe-the-result).

---

- annotations
- object
- Behavior hints, as the MCP specification defines them:
  `readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`.
  The server combines the hints of all tools into the hints of the `execute` tool.
  Set `readOnlyHint`, `destructiveHint`, and `openWorldHint` on every tool.
  A tool without them counts as a destructive write that can reach external systems, and AI clients then ask the user to confirm every `execute` call.

---

- isAvailable
- function
- Decides whether the current caller can see and call the tool.
  Receives the same `context` object as `execute` and returns a boolean or a `Promise<boolean>`.
  See [Availability and authorization](#availability-and-authorization).

{% /table %}

## Execute function

The `execute` function receives three arguments:

{% table %}

- Argument
- Type
- Description

---

- args
- object
- Input arguments from the AI client, validated against `inputSchema`.

---

- context
- [McpToolContext](#context)
- Information about the project and the current user.

---

- extra
- object
- MCP protocol metadata: `requestId`, `sessionId`, `authInfo`, `requestInfo`, `_meta`.

{% /table %}

### Context

The most useful `context` properties:

{% table %}

- Property
- Type
- Description

---

- user
- object
- Current user: `email`, `teams`, `claims`, `isAuthenticated`, `idpAccessToken`.

---

- config
- object
- Resolved project configuration from `redocly.yaml`.

---

- baseUrl
- string
- Origin of the current request.

---

- accessToken
- string
- Access token of the authenticated MCP connection, when present.

---

- metadata
- object
- Free-form caller metadata from the `X-Redocly-AI-Metadata` request header.

---

- fs
- object
- Read access to the built project output.
  `fs.readFile(path)` returns the text of a file, and rejects paths outside the output directory.
  When the project publishes `llms.txt`, the output also has a Markdown copy of each page.
  RBAC does not apply to these reads: the output contains restricted pages too.
  Before you return file content, check that `context.user` can access it.

{% /table %}

### Tool result

The value that your `execute` function returns is the result of the tool call.
The script receives the result, or, in tools mode, the result is the MCP tool result.
Return a JSON-serializable value, such as an object, an array, or a string.

To report a failure, throw an `Error` from `execute`.
The tool call in the script, for example `tools.getWeather()`, then throws an error with the same message.

### Describe the result

Declare an `outputSchema` for each tool.
The AI model reads the TypeScript signature of each tool from the `describe-tools` tool.
The server makes the result type of the signature from `outputSchema`.
Without an `outputSchema`, the result type is `unknown`, and the model must guess the field names.
A wrong guess makes the script fail, or return empty data without an error.
The build logs a warning for each tool without an `outputSchema`.

The server does not validate the result against `outputSchema`, so keep the schema and the returned value the same.

## Availability and authorization

The project access controls apply to the entire MCP server.
If the project requires login or restricts content with [RBAC](../../config/access/rbac.md), the `/mcp` endpoint requires authentication.
In these projects, `context.user` identifies the caller.
In other projects, every caller is anonymous.
If you enable [`mcp.docs.publicEndpoint`](../../config/mcp.md), anonymous clients can also call your tools at `/mcp-public`.

To limit a tool to specific users or teams, add an `isAvailable` function.

When `isAvailable` returns `false`, the server removes the tool from `describe-tools`, from the script, and from the tool list in tools mode.
`isAvailable` does not get the tool arguments, so do checks that depend on the arguments in `execute`.

The following tool finds API error codes in a data file of the project.
Only the `partners` and `support` teams can use the tool.
Only the `support` team gets the internal error codes:

```ts {% title="data/error-codes.ts" %}
export type ErrorCode = {
  code: string;
  message: string;
  fix: string;
  internal: boolean;
};

export const errorCodes: ErrorCode[] = [
  {
    code: 'E1042',
    message: 'The API key has expired.',
    fix: 'Create a new API key on the Credentials page.',
    internal: false,
  },
  {
    code: 'E9001',
    message: 'The billing service did not respond.',
    fix: 'Retry the request. If it fails again, restart the billing sync job.',
    internal: true,
  },
];
```

```ts {% title="@mcp/get-error-code.ts" %}
import type { McpToolDefinition } from '@redocly/config';
import { errorCodes } from '../data/error-codes';

const tool: McpToolDefinition<{ code: string }> = {
  description: 'Look up an API error code and get the steps to fix the error.',
  inputSchema: {
    type: 'object',
    required: ['code'],
    properties: {
      code: {
        type: 'string',
        description: 'Error code from an API response, for example "E1042".',
      },
    },
  },
  outputSchema: {
    type: 'object',
    required: ['code', 'message', 'fix'],
    properties: {
      code: { type: 'string' },
      message: { type: 'string', description: 'What the error means.' },
      fix: { type: 'string', description: 'Steps to fix the error.' },
    },
  },
  annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  isAvailable: (context) =>
    context.user.teams.includes('partners') || context.user.teams.includes('support'),
  execute({ code }, context) {
    const entry = errorCodes.find((item) => item.code === code);
    if (!entry || (entry.internal && !context.user.teams.includes('support'))) {
      throw new Error(`Unknown error code "${code}".`);
    }
    return { code: entry.code, message: entry.message, fix: entry.fix };
  },
};

export default tool;
```

The build bundles `data/error-codes.ts` into the tool, so the site does not publish the data file.

## Constraints

- A tool name can contain only letters, numbers, hyphens, and underscores, and can have a maximum of 64 characters.
- A tool name must be different from the built-in tool names, for example `execute`, `describe-tools`, `search`, or `list-apis`.
- Each file in an `@mcp` folder must be a tool.
  Keep shared helper code outside the `@mcp` folder.
- The build imports each tool file once to read its schemas.
  Code at the top level of a tool file must not call other services or change data.

If a tool file breaks these rules, the build fails with an error that names the file.
In local development, the server reports the error and skips the tool.

## Resources

- **[MCP server](./index.md)** - Learn what the MCP server of your project serves to AI clients
- **[Control access to the MCP server](./access.md)** - Restrict the server to teams and serve public content without a sign-in
- **[`mcp` configuration](../../config/mcp.md)** - Turn the server off, rename it, and remove content from it
