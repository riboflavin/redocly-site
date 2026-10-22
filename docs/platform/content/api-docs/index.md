---
plans:
  - Pro
  - Scale
  - Enterprise
---
# Document APIs

{% configOptionRequirements plans=$frontmatter.plans /%}

Redocly supports API description files written according to the most commonly-used specifications:

- [Add AsyncAPI descriptions](./add-asyncapi-docs.md)
- [Add GraphQL descriptions](./add-graphql-docs.md)
- [Add OpenAPI descriptions](./add-openapi-docs.md)
- [Add SOAP documentation from WSDL files](./add-soap-docs.md)

Redocly also offers the mock server as an alternative to live endpoints and supports extensions for AsyncAPI and OpenAPI description files:

- [Configure the mock server](./configure-mock-server.md): use the Replay console to send calls to your API operations and see sample responses without the need for backend services.
- [AsyncAPI extensions](./asyncapi-extensions/index.md): See the full list of supported AsyncAPI extensions.
- [OpenAPI extensions](./openapi-extensions/index.md): See the full list of supported OpenAPI extensions.
