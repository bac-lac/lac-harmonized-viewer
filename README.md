# Harmonized Viewer
IIIF compliant web-based viewer built with Stencil.js and Openseadragon.

Demo (default configuration):
https://archives-viewer-demo.azurewebsites.net/demo/index.html

## Functionality
Harmonized Viewer supports the following formats:
* Images (jpeg, png, gif)
* PDFs
* Audio (wav, mp3, ogg)
* Video (mp4)


## Getting started

### Dependencies

- **NodeJS**
  Install NodeJS on your local development environment (required for NPM dependencies).
  Make sure the NPM folder is appended to your PATH environment variable.
  `https://nodejs.org/en/download`

- **Git CLI**
  Optional. Install Git (command line interface) on your local development environment.

### Working copy

Create a local working copy of the Harmonized Viewer repository:
```
git clone https://github.com/bac-lac/lac-harmonized-viewer.git
```

Install dependencies:
```sh
cd lac-harmonized-viewer
npm install
```

Build & run the Harmonized Viewer:
```sh
npm start
```

## License
Harmonized Viewer is open source software developed by Library and Archives Canada and [licensed as GPL](https://github.com/bac-lac/lac-harmonized-viewer/blob/master/LICENSE).