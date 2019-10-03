import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'stencil-starter-project-name',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      copy: [
        {
          src: 'locales/**.json',
          dest: 'locales'
        }
      ],
      serviceWorker: null // disable service workers
    }
  ],
  commonjs: {
    namedExports: {
      'node_modules/openseadragon/openseadragon.js': ['openseadragon']
    }
  },
  nodeResolve: {
    browser: true
  },
  plugins: [
    sass({
      injectGlobalPaths: ['src/globals/variables.scss']
    }),
    nodePolyfills()
  ]
};
