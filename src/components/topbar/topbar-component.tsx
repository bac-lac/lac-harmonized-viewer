import { Component, h, Element, Prop, Host, State } from '@stencil/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import "../../utils/icon-library";
import { MyAppState } from '../../interfaces';
import { Store, Unsubscribe } from '@stencil/redux';

@Component({
    tag: 'harmonized-viewer-topbar',
    styleUrl: 'topbar-component.scss'
})
export class TopbarComponent {

    @Element() el: HTMLElement

    @State() title: MyAppState["document"]["title"]

    @Prop({ context: "store" }) store: Store
    storeUnsubscribe: Unsubscribe

    componentWillLoad() {

        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { title: title }
            } = state
            return {
                title: title
            }
        })
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    openSettings() {

        const settings = this.el.querySelector(".modal.modal-settings")
        if (settings) {
            settings.classList.toggle("is-active")
        }
    }

    render() {
        return (
            <Host class="topbar">
                <nav class="navbar is-primary" role="navigation" aria-label="Dropdown navigation">
                    <div class="navbar-brand">

                        <a class="navbar-item">
                            <figure class="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/128x128.png" />
                            </figure>
                        </a>
                        <a class="navbar-item">
                            <h1 class="hv-title">{this.title}</h1>
                        </a>

                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="topbar-menu">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>

                    </div>
                    <div id="topbar-menu" class="navbar-menu">

                        <div class="navbar-start">

                        </div>
                        <div class="navbar-end">
                            {/* <div data-content-switcher class="bx--content-switcher" role="tablist">
                        <button class="bx--content-switcher-btn bx--content-switcher--selected" data-target=".demo--panel--opt-1" role="tab" aria-selected="true">
                            <span class="bx--content-switcher__label">JPG</span>
                        </button>
                        <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-2" role="tab">
                            <span class="bx--content-switcher__label">PDF</span>
                        </button>
                    </div> */}
                            <a class="navbar-item" title="Settings" onClick={this.openSettings.bind(this)}>
                                <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "cog" }).html[0]}></span>
                            </a>
                            <a class="navbar-item button-fullscreen-exit" title="Exit fullscreen" onClick={this.openSettings.bind(this)}>
                                <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "compress" }).html[0]}></span>
                                Exit fullscreen
                            </a>
                        </div>
                    </div>
                </nav>
                <hv-settings></hv-settings>
            </Host>
        )
    }
}
