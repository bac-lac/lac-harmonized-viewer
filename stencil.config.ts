import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { inlineSvg } from 'stencil-inline-svg';

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
        },
        {
          src: 'assets/material-design-icons/**.svg',
          dest: 'assets/material-design-icons'
        }
      ]
    },
    {
      type: 'www',
      copy: [
        {
          src: 'locales/**.json',
          dest: 'locales'
        },
        {
          src: 'assets/material-design-icons/**.svg',
          dest: 'assets/material-design-icons'
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
  globalStyle: 'src/global/variables.scss',
  plugins: [
    sass({ includePaths: ['node_modules'] }),
    nodePolyfills(),
    inlineSvg()
  ]
};
