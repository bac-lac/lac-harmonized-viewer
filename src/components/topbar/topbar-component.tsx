import { Component, h, Element, Prop, Host } from '@stencil/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import "../../utils/icon-library";

@Component({
    tag: 'harmonized-viewer-topbar',
    styleUrl: 'topbar-component.scss'
})
export class TopbarComponent {

    @Element() el: HTMLElement;

    @Prop() text: string;

    showSettings() {

        const settings = this.el.querySelector(".modal.modal-settings");
        if (settings) {
            settings.classList.toggle("is-active");
        }
        // var modal = this.el.querySelector('#modal-settings');

        // var modalInstance = Modal.create(modal);
        // modalInstance.show();
    }

    render() {
        return <Host class="topbar">
            <header class="hv-topbar__content" role="banner">
                {/* <img src={this.thumbnail} class="hv-logo" alt={this.publisher} /> */}
                <a href="#">
                    {/* <div class="hv-creator" innerHTML={this.publisher}></div> */}
                    <h1 class={(this.text ? "hv-title" : "hv-title hv-title--loading")}>{this.text}</h1>
                </a>
                <div class="hv-topbar__actions">
                    <div data-content-switcher class="bx--content-switcher" role="tablist">
                        <button class="bx--content-switcher-btn bx--content-switcher--selected" data-target=".demo--panel--opt-1" role="tab" aria-selected="true">
                            <span class="bx--content-switcher__label">JPG</span>
                        </button>
                        <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-2" role="tab">
                            <span class="bx--content-switcher__label">PDF</span>
                        </button>
                    </div>
                    <button type="button" class="button" title="Settings" onClick={this.showSettings.bind(this)}>
                        <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "cog" }).html[0]}></span>
                    </button>
                    <hv-settings></hv-settings>
                </div>
            </header>
        </Host>;
    }
}
