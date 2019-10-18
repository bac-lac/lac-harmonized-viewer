import { Component, h, Element, Prop } from '@stencil/core';
import { Modal } from 'carbon-components';

@Component({
    tag: 'hv-topbar',
    styleUrl: 'topbar-component.scss'
})
export class TopbarComponent {

    @Element() el: HTMLElement;

    @Prop() text: string;

    showSettings() {
        var modal = this.el.querySelector('#modal-settings');

        var modalInstance = Modal.create(modal);
        modalInstance.show();
    }

    render() {
        return (
            <header class="hv-topbar__content" role="banner">
                {/* <img src={this.thumbnail} class="hv-logo" alt={this.publisher} /> */}
                <a href="#">
                    {/* <div class="hv-creator" innerHTML={this.publisher}></div> */}
                    <h1 class={(this.text ? "hv-title" : "hv-title hv-title--loading")} innerHTML={(this.text ? this.text : null)}></h1>
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
                    <button type="button" class="bx--btn bx--btn--secondary bx--btn--icon-only" aria-label="Settings" onClick={e => this.showSettings()}>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1 2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1 2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1 2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51zM25.21 24l-3.43-1.16a8.86 8.86 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.36 9.36 0 0 1-2.7-1.57L6.79 24l-2.36-4 2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4 3.43 1.16a8.86 8.86 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.36 9.36 0 0 1 2.7 1.57L25.21 8l2.36 4-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20z"></path><path d="M16 22a6 6 0 1 1 6-6 5.94 5.94 0 0 1-6 6zm0-10a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4z"></path><title>Settings</title></svg>
                    </button>
                    <hv-settings></hv-settings>
                </div>
            </header>
        );
    }
}