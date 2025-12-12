import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    './src/schemas/ai-guard.ts',
    './src/schemas/index.ts',
    './src/index.ts',
  ],
  clean: true,
  dts: true,
  fixedExtension: true,
  format: ['cjs', 'esm'],
  hash: false,
});
