# LAC-Harmonized-viewer
Open-source web-based viewer for archival material. IIIF compliant &amp; based on JQuery and Openseadragon.

Demo (default configuration):
https://archives-viewer-demo.azurewebsites.net/demo/index.html


## Prerequisites

- **NodeJS**
  Install NodeJS on your local development environment (required for NPM dependencies).
  Make sure the NPM folder is appended to your PATH environment variable.
  `https://nodejs.org/en/download`

- **Grunt CLI**
  Install Grunt (command line interface) on your local development environment (required for compilation).
  NodeJS must be installed before Grunt.
    1. Open a command prompt
    2. Run `npm install -g grunt-cli`

- **Git CLI**
  Optional. Install Git (command line interface) on your local development environment.

- **Visual Studio Code**
  Optional. Develop themes and extensions.
  `https://code.visualstudio.com/download`


## Proxy

NPM requires Internet access in order to download and install dependencies.
Warning: The following steps will save your password in plaintext.

Configure HTTP proxy for NPM:
  1. Open a command prompt
  2. Run `npm config set proxy http://[username]:[password]@10.254.1.16:8080`

Configure HTTPS proxy for NPM (not tested):
  1. Open a command prompt
  2. Run `npm config set https-proxy http://[username]:[password]@10.254.1.16:8080`


## Working copy

Create a local working copy of the Harmonized Viewer repository:
  1. Open a command prompt
  2. Run `git clone https://github.com/bac-lac/lac-harmonized-viewer.git`

Install dependencies:
  1. Run `cd lac-harmonized-viewer`
  2. Run `npm install`

Build the Harmonized Viewer:
  1. Run `grunt dist` for a production build