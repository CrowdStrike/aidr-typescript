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
