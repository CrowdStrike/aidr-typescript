# CrowdStrike AIDR TypeScript SDK

TypeScript SDK for CrowdStrike AIDR.

## Installation

```bash
npm install @crowdstrike/aidr
```

```bash
pnpm add @crowdstrike/aidr
```

```bash
yarn add @crowdstrike/aidr
```

## Usage

```typescript
import { AIGuard } from "@crowdstrike/aidr";

const client = new AIGuard({
  token: "your-api-token",
  baseURLTemplate: "https://api.crowdstrike.com/aidr/{SERVICE_NAME}",
});

const response = await client.guardChatCompletions({
  guard_input: {
    messages: [
      {
        role: "user",
        content: "Hello, how can I help you?",
      },
    ],
  },
});

console.log(response);
```

## Retries

The SDK supports automatic retries for temporary failures (network errors or
HTTP/5XX server errors). It supports configuring retries at the client level or
per-request.

```typescript
// Set the default number of retries when creating the client.
const client = new AIGuard({
  token: "your-api-token",
  baseURLTemplate: "https://api.crowdstrike.com/aidr/{SERVICE_NAME}",
  maxRetries: 3, // Default is 2.
});

const response = await client.guardChatCompletions(
  {
    guard_input: {
      messages: [{ role: "user", content: "Hello" }],
    },
  },
  {
    // Override the default retry count for this specific request.
    maxRetries: 5,
  }
);
```

## Timeouts

Configure request timeouts to control how long the client waits for a response
before timing out.

```typescript
// Set the default timeout (in milliseconds) when creating the client.
const client = new AIGuard({
  token: "your-api-token",
  baseURLTemplate: "https://api.crowdstrike.com/{SERVICE_NAME}",
  timeout: 30000, // 30 seconds (default is 60 seconds).
});

const response = await client.guardChatCompletions(
  {
    guard_input: {
      messages: [{ role: "user", content: "Hello" }],
    },
  },
  {
    // Override the default timeout for a specific request.
    timeout: 10000, // 10 seconds.
  }
);
```

## Fetch options

If you want to set custom `fetch` options without overriding the `fetch`
function, you can provide a `fetchOptions` object when instantiating the client
or making a request. Request-specific options override client options.

```ts
const client = new AIGuard({
  fetchOptions: {
    // `RequestInit` options.
  },
});
```

## Configuring proxies

To modify proxy behavior, you can provide custom `fetchOptions` that add
runtime-specific proxy options to requests:

### Node.js

```ts
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
const client = new AIGuard({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

### Bun

```ts
const client = new AIGuard({
  fetchOptions: {
    proxy: 'http://localhost:8888',
  },
});
```

### Deno

```ts
const httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });
const client = new AIGuard({
  fetchOptions: {
    client: httpClient,
  },
});
```
