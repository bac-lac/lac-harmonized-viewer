import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'lac-harmonized-viewer',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: 'locales/**.json',
          dest: 'locales'
        }
      ]
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
      'node_modules/openseadragon/openseadragon.js': ['openseadragon']
    }
  },
  nodeResolve: {
    browser: true
  },
  globalStyle: 'src/globals/variables.scss',
  plugins: [
    sass(),
    nodePolyfills()
  ]
};
