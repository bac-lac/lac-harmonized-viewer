import { Component, h, Element, Prop, Host, State } from '@stencil/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import "../../utils/icon-library";
import { MyAppState } from '../../interfaces';
import { Store, Unsubscribe } from '@stencil/redux';
import { MDCTopAppBar } from '@material/top-app-bar';

@Component({
    tag: 'harmonized-topbar',
    styleUrl: 'topbar-component.scss'
})
export class TopbarComponent {

    @Element() el: HTMLElement

    @Prop() backgroundColor: string

    @State() title: MyAppState["document"]["document"]["title"]

    @Prop({ context: "store" }) store: Store
    storeUnsubscribe: Unsubscribe

    componentWillLoad() {

        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { document: document }
            } = state
            return {
                title: (document ? document.title : null)
            }
        })
    }

    componentDidLoad() {
        const topAppBarElement = this.el.querySelector('.topbar')
        const topAppBar = new MDCTopAppBar(topAppBarElement)
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
            <Host>
                <header class="topbar" style={{ backgroundColor: this.backgroundColor }}>
                    <div class="topbar-row">
                        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                            <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">
                                <span class="mdc-icon-button__icon" innerHTML={icon({ prefix: 'fas', iconName: 'bars' }).html[0]}></span>
                            </button>
                            <span class="mdc-top-app-bar__title">
                                {this.title}
                            </span>
                        </section>
                        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                            {/* <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Download">file_download</button>
                            <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Print this page">print</button> */}
                            <button type="button" class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Bookmark this page" onClick={this.openSettings.bind(this)}>
                                <span class="mdc-icon-button__icon" innerHTML={icon({ prefix: 'fas', iconName: 'cog' }).html[0]}></span>
                            </button>
                        </section>
                    </div>
                </header>

                {/* <nav class="navbar is-primary" role="navigation" aria-label="Dropdown navigation">
                    <div class="navbar-brand">

                        <a class="navbar-item">
                            <figure class="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/128x128.png" />
                            </figure>
                        </a>
                        <div class="navbar-item">
                            <h1 class="manifest-title">
                                {this.title}
                            </h1>
                            <span class="manifest-type tag is-info">IIIF</span>
                        </div>

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

                            <a class="navbar-item" title="Settings" onClick={this.openSettings.bind(this)}>
                                <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "share-alt" }).html[0]}></span>
                            </a>

                            <a class="navbar-item" title="Settings" onClick={this.openSettings.bind(this)}>
                                <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "cog" }).html[0]}></span>
                            </a>

                            <a class="navbar-item button-fullscreen-exit" title="Exit fullscreen" onClick={this.openSettings.bind(this)}>
                                <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "compress" }).html[0]}></span>
                                <span class="text">Exit fullscreen</span>
                            </a>

                        </div>
                    </div>
                </nav> */}

                <hv-settings></hv-settings>
            </Host>
        )
    }
}
