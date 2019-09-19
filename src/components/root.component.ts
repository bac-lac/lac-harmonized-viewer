import { Component, BaseComponent } from "./component";
import { TopbarComponent } from "./topbar.component";
import { NavigationComponent } from "./navigation.component";
import { HarmonizedViewerOptions } from "~/options/options";
import { HarmonizedViewer } from "..";
import { ViewportComponent } from "./viewport.component";

export class RootComponent extends BaseComponent implements Component {

    constructor(instance: HarmonizedViewer) {
        super(instance);
        this.instance = instance;
    }

    create() {

        const container = document.createElement('div');

        const topbar = new TopbarComponent(this.instance);
        container.append(topbar.getElement());

        const navigation = new NavigationComponent(this.instance, this.instance.options.navigation);
        container.append(navigation.getElement());

        // const annotations = new AnnotationsComponent(this.instance, this.options.annotations);
        // container.append(annotations.element);

        const viewport = new ViewportComponent(this.instance, this.instance.options.manifest, this.instance.options.viewport);
        container.append(viewport.getElement());

        return container;
    }

}