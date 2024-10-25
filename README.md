# OpenAI Structured Data in Practice

This is a companion repository to my Medium article showcasing OpenAI structured data outputs in action.

## Running this application

This is a Svelte front-end application. Here are the steps to get it running. All commands executed in the `example-app` directory.

1. `npm install` install dependencies
2. Either
    - Create a `src/lib/keys.ts` file like:

```typescript
const OPENAI_API_KEY = "<INSERT YOUR OPENAI KEY HERE"

export { OPENAI_API_KEY }
```

    - Or modify `src/lib/index.ts` and pass your OpenAI key directly into the client instantiation.

3. `npm run dev` will start the app.