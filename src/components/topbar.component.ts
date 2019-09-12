import { Component } from "./component";
import { ManifestLoad } from "../events/manifest-load.event";
import { NavigationOpen } from "../events/navigation-open";

export class TopbarComponent extends Component {

    text: string;

    async init() {

        this.bind('click', 'navigation-open', undefined, '.mdc-top-app-bar__navigation-icon');

        this.on('manifest-load', (event: ManifestLoad) => {
            this.text = event.manifest.getDefaultLabel();
        });
    }

    async render() {
        this.element.querySelector(".mdc-top-app-bar__title").textContent = this.text;
    }

    static Events = {
        onNavigationButtonClick: 'topbar.navigation-button.click'
    };

}