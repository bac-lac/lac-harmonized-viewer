import { Component, h, Element, Prop, Host, State, Listen } from '@stencil/core';
import { Store, Unsubscribe } from '@stencil/redux';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCMenu, Corner } from '@material/menu';
import iconMenu from '../../assets/material-design-icons/ic_menu_18px.svg'
import iconLanguage from '../../assets/material-icons/ic_world_24px.svg';
import iconFullscreen from '../../assets/material-icons/ic_fullscreen_24px.svg';
import iconFullscreenExit from '../../assets/material-icons/ic_fullscreen_exit_24px.svg';
import { setViewport, setLanguage, enterFullscreen, exitFullscreen } from '../../store/actions/document';
import i18next from 'i18next';
import { translate } from '../../services/i18n-service';

@Component({
    tag: 'harmonized-topbar',
    styleUrl: 'topbar-component.scss'
})
export class TopbarComponent {

    @Element() el: HTMLElement

    @State() fullscreen: boolean = false

    @Prop({ context: "store" }) store: Store

    @State() language: MyAppState["document"]["language"]
    @State() availableLanguages: MyAppState["document"]["availableLanguages"]
    @State() title: MyAppState["document"]["document"]["label"]
    @State() viewport: MyAppState["document"]["viewport"]

    setLanguage: typeof setLanguage
    enterFullscreen: typeof enterFullscreen
    exitFullscreen: typeof exitFullscreen
    setViewport: typeof setViewport

    storeUnsubscribe: Unsubscribe

    private topAppBar?: MDCTopAppBar
    private menuDisplay?: MDCMenu
    private menuLanguage?: MDCMenu

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setLanguage, enterFullscreen, exitFullscreen, setViewport })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { document, language, availableLanguages, fullscreen, viewport }
            } = state
            return {
                language,
                availableLanguages,
                fullscreen: fullscreen,
                title: (document ? document.label : null),
                viewport
            }
        })
    }

    componentDidLoad() {

        this.topAppBar = new MDCTopAppBar(this.el.querySelector('.mdc-top-app-bar'))

        // this.menuDisplay = new MDCMenu(this.el.querySelector('.mdc-menu'))
        // this.menuDisplay.setAnchorCorner(Corner.BOTTOM_LEFT)

        this.menuLanguage = new MDCMenu(this.el.querySelector('#menu-language'))
        this.menuLanguage.setAnchorCorner(Corner.BOTTOM_LEFT)
        this.menuLanguage.quickOpen = true
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    @Listen('fullscreenchange', { target: 'document' })
    handleFullScreenChange() {
        this.fullscreen = (document.fullscreenElement ? true : false)
    }

    handleLanguageClick() {
        this.menuLanguage.open = !this.menuLanguage.open
    }

    handleLanguageSelectionChange(selectedValue: string) {
        this.setLanguage(selectedValue)
    }

    handleEnterFullscreenClick() {
        this.enterFullscreen(this.el.closest('.harmonized-viewer'))
    }

    handleExitFullscreenClick() {
        this.exitFullscreen()
    }

    handleDisplayClick() {
        this.menuDisplay.open = !this.menuDisplay.open
    }

    handleDisplaySelectionChange(placement: PlacementType, ev: any) {
        // this.setViewport({
        //     navigationPlacement: placement
        // })
    }

    render() {

        return <Host>
            <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <button class="mdc-top-app-bar__navigation-icon mdc-icon-button">
                            <i class="mdc-icon-button__icon" innerHTML={iconMenu}></i>
                        </button>
                        <span class="mdc-top-app-bar__title">{translate(this.title)}</span>
                    </section>
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">

                        <harmonized-button
                            class="mdc-top-app-bar__action-item mdc-menu-surface--anchor"
                            icon={iconLanguage}
                            dropdown={true}
                            size="sm"
                            label={this.language && this.language.name}
                            aria-label={i18next.t('changeLanguage')}
                            tooltip={i18next.t('changeLanguage')}
                            onClick={this.handleLanguageClick.bind(this)}>

                            <div class="mdc-menu mdc-menu-surface" id="menu-language">
                                <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                                    {this.availableLanguages.map((language) => <li
                                        role="menuitem"
                                        class={(this.language && this.language.code == language.code) ?
                                            "mdc-list-item mdc-list-item--selected" : "mdc-list-item"}
                                        onClick={(ev) => { this.handleLanguageSelectionChange(language.code) }}>
                                        <span class="mdc-list-item__text">
                                            {language.name}
                                        </span>
                                    </li>)}
                                </ul>
                            </div>

                        </harmonized-button>

                        {
                            !this.fullscreen &&
                            <harmonized-button
                                class="mdc-top-app-bar__action-item"
                                icon={iconFullscreen}
                                size="sm"
                                label={i18next.t('fullscreen')}
                                aria-label="Enter fullscreen"
                                tooltip="Enter fullscreen"
                                onClick={this.handleEnterFullscreenClick.bind(this)}>

                            </harmonized-button>
                        }

                        {
                            this.fullscreen &&
                            <harmonized-button
                                class="mdc-top-app-bar__action-item button-fullscreen-exit"
                                icon={iconFullscreenExit}
                                size="sm"
                                label={i18next.t('Exit fullscreen')}
                                aria-label="Exit fullscreen"
                                tooltip="Exit fullscreen"
                                onClick={this.handleExitFullscreenClick.bind(this)}>

                            </harmonized-button>
                        }

                    </section>
                </div>
            </header>
        </Host>
    }
}
