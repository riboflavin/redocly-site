When Replay uses a Redocly-hosted CORS proxy, each request follows these steps:

1. Replay sends the request from the browser to your Redocly project built-in CORS proxy endpoint (`/_api/cors/`) or to the hosted CORS proxy endpoint (`https://cors.redocly.com/`).
1. The proxy sends the request to your target API and returns the response back to Replay.

To allow requests from the built-in proxy endpoint and the hosted proxy, add these IP addresses to your API's allowlist:

```sh
3.211.34.228
44.206.14.241
54.156.60.142
```

If your API is accessible only through a private network or VPN, configure `corsProxyUrl` to point to a proxy that runs inside your own network.
