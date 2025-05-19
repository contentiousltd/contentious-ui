import { defineConfig } from 'tsup';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

export default defineConfig(async (options) => {
  // Identify dependencies from package.json
  const pkgJson = JSON.parse(
    await readFile(resolve(__dirname, 'package.json'), 'utf-8')
  );

  return {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: [
      ...Object.keys(pkgJson.peerDependencies || {}),
      ...Object.keys(pkgJson.dependencies || {})
    ],
    esbuildOptions(options) {
      // Keep class names for better debugging
      options.keepNames = true;
    },
    // Support CSS files
    loader: {
      '.css': 'copy',
    },
    // Copy CSS files to dist folder
    async onSuccess() {
      // Additional post-build steps could go here
      console.log('Build successful!');
    },
  };
});