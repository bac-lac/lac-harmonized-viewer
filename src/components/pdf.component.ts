import { BaseComponent, Component } from "./base.component";

const pdfjsLib = require('pdfjs-dist/build/pdf');

export class PDFComponent extends BaseComponent implements Component {

    create() {
        const embed = document.createElement('embed');
        return embed;
    }

    loadPDF(url: string) {

        this.getElement().setAttribute('src', url);

    }

}