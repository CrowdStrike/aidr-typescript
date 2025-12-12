export default {
  plugins: [
    {
      name: 'valibot',
      definitions: { case: 'PascalCase', name: '{{name}}Schema' },
      metadata: false,
      requests: { case: 'PascalCase', name: '{{name}}RequestSchema' },
      responses: { case: 'PascalCase', name: '{{name}}ResponseSchema' },
    },
    {
      name: '@hey-api/sdk',
      validator: true,
    },
  ],
};
