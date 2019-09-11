import { Component } from "./component";
import { ManifestLoaded } from "../events/manifest-loaded.event";

export class TopbarComponent extends Component {

    text: string;

    async init() {
        this.element.querySelector('.mdc-top-app-bar__navigation-icon')
            .addEventListener('click', (eventArgs: any) => this.publish(TopbarComponent.Events.onNavigationButtonClick, eventArgs));

        this.on<ManifestLoaded>('manifest-loaded', (eventArgs: ManifestLoaded) => {
            this.text = eventArgs.manifest.getDefaultLabel();
        });
    }

    async render() {
        this.element.querySelector(".mdc-top-app-bar__title").textContent = this.text;
    }

    static Events = {
        onNavigationButtonClick: 'topbar.navigation-button.click'
    };

}