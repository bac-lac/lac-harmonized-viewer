import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'stencil-starter-project-name',
  outputTargets: [
    {
      type: 'dist'
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
      'node_modules/path': ['path'],
      "node_modules/i18next": ['i18next'],
      "node_modules/i18next-xhr-backend": ['i18next-xhr-backend'],
      'node_modules/openseadragon/openseadragon.js': ['openseadragon']
    }
  },
  nodeResolve: {
    browser: true,
    preferBuiltins: true
  },
  plugins: [
    sass({
      injectGlobalPaths: ['src/globals/variables.scss']
    }),
    nodePolyfills()
  ]
};
