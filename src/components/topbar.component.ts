import { Component } from "./component";
import { ManifestLoaded } from "../events/manifest-loaded.event";
import { bindNativeListener } from "../event";

export class TopbarComponent extends Component {

    text: string;

    async init() {
        // this.element.querySelector('.mdc-top-app-bar__navigation-icon')
        //     .addEventListener('click', (eventArgs: any) => this.publish(TopbarComponent.Events.onNavigationButtonClick, eventArgs));

        let buttonDrawer = this.element.querySelector('.mdc-top-app-bar__navigation-icon');
        bindNativeListener(buttonDrawer as HTMLElement, 'click', TopbarComponent.Events.onNavigationButtonClick);

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