import { Component, BaseComponent } from "./base.component";
import { TopbarComponent } from "./topbar.component";
import { NavigationComponent } from "./navigation.component";
import { HarmonizedViewer } from "..";
import { ViewportComponent } from "./viewport.component";
import { SettingsComponent } from "./settings.component";
import { AnnotationsComponent } from "./annotations.components";
import { PDFComponent } from "./pdf.component";

export class RootComponent extends BaseComponent implements Component {

    private imageViewer: HTMLElement;
    private pdfViewer: PDFComponent;

    constructor(instance: HarmonizedViewer) {
        super(instance);
        this.instance = instance;
    }

    create() {

        const container = this.instance.element;

        const topbar = new TopbarComponent(this.instance);
        container.append(topbar.getElement());

        this.imageViewer = document.createElement('div');

        const navigation = new NavigationComponent(this.instance, this.instance.options.navigation);
        this.imageViewer.append(navigation.getElement());

        const annotations = new AnnotationsComponent(this.instance, this.instance.options.annotations);
        this.imageViewer.append(annotations.getElement());

        const viewport = new ViewportComponent(this.instance, this.instance.options.manifest, this.instance.options.viewport);
        this.imageViewer.append(viewport.getElement());

        container.append(this.imageViewer);

        this.pdfViewer = new PDFComponent(this.instance);
        container.append(this.pdfViewer.getElement());

        const dialogSettings = new SettingsComponent(this.instance);
        container.append(dialogSettings.getElement());

        return container.firstElementChild as HTMLElement;
    }

    switch(mode: string, pdf?: string) {

        this.imageViewer.style.display = 'none';
        this.pdfViewer.getElement().style.display = 'none';

        if (mode == 'pdf' && pdf) {
            this.pdfViewer.loadPDF(pdf);
            this.pdfViewer.getElement().style.display = 'block';
        }
        else {
            this.imageViewer.style.display = 'block';
        }

    }
}