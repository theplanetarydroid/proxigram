const esbuild = require('esbuild');
const { cp, rm } = require('fs/promises');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
esbuild
  .build({
    format: 'cjs',
    entryPoints: [
      './src/index.ts',
      './src/public/css/index.css',
      './src/public/js/index.js',
    ],
    outdir: 'dist/',
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'node14',
    external: ['handlebars'],
    plugins: [nodeExternalsPlugin()],
  })
  .then(async () => {
    const options = {
      recursive: true,
    };
    await cp('src/views', 'dist/views', options);
    await rm('dist/views/helpers', options);
    console.log('Finished!');
  })
  .catch(() => process.exit(1));
