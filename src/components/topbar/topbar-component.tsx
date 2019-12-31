import { Component, h, Element, Prop, Host, State, Listen } from '@stencil/core';
import { Store, Unsubscribe } from '@stencil/redux';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCMenu, Corner } from '@material/menu';
import { MDCSnackbar } from '@material/snackbar';
//import iconMenu from '../../assets/material-design-icons/ic_menu_18px.svg'
//import iconLanguage from '../../assets/material-icons/translate.svg';
import iconInfo from '../../assets/material-icons/ic_info_24px.svg';
import iconInfoFull from '../../assets/material-icons/ic_info_full_24px.svg';
import iconFullscreen from '../../assets/material-icons/ic_fullscreen_24px.svg';
import iconFullscreenExit from '../../assets/material-icons/ic_fullscreen_exit_24px.svg';
import iconThemeLight from "../../assets/material-icons/theme-light.svg"
import iconThemeDark from "../../assets/material-icons/theme-dark.svg"
import { enterFullscreen, exitFullscreen, toggleDrawer } from '../../store/actions/document';
import { t } from '../../services/i18n-service';

@Component({
    tag: 'harmonized-topbar',
    styleUrl: 'topbar-component.scss'
})
export class TopbarComponent {

    @Element() el: HTMLElement

    @Prop({ context: "store" }) store: Store

    @State() fullscreen: boolean = false
    @State() infoShown: boolean = false
    @State() availableLanguages: MyAppState["document"]["availableLanguages"]
    @State() title: MyAppState["document"]["document"]["label"]
    @State() theme: MyAppState["document"]["theme"]
    @State() viewport: MyAppState["document"]["viewport"]

    enterFullscreen: typeof enterFullscreen
    exitFullscreen: typeof exitFullscreen
    toggleDrawer: typeof toggleDrawer

    storeUnsubscribe: Unsubscribe

    private topAppBar?: MDCTopAppBar
    private menuDisplay?: MDCMenu
    private menuLanguage?: MDCMenu
    private snackBar?: MDCSnackbar

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { enterFullscreen, exitFullscreen, toggleDrawer })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { document, fullscreen, infoShown, theme }
            } = state
            return {
                fullscreen: fullscreen,
                infoShown: infoShown,
                title: (document ? document.label : null),
                theme
            }
        })
    }

    componentDidLoad() {

        this.topAppBar = new MDCTopAppBar(this.el.querySelector('.mdc-top-app-bar'))

        // this.menuDisplay = new MDCMenu(this.el.querySelector('.mdc-menu'))
        // this.menuDisplay.setAnchorCorner(Corner.BOTTOM_LEFT)

        const languageElem = this.el.querySelector('#menu-language')
        if (languageElem) {

            this.menuLanguage = new MDCMenu(languageElem)
            this.menuLanguage.setAnchorCorner(Corner.BOTTOM_LEFT)
            this.menuLanguage.quickOpen = true
        }

        const snackBarElem = this.el.querySelector(".mdc-snackbar")
        if (snackBarElem) {
            this.snackBar = new MDCSnackbar(snackBarElem)
        }
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    @Listen('fullscreenchange', { target: 'document' })
    handleFullScreenChange() {
        this.fullscreen = (document.fullscreenElement ? true : false)
    }

    handleEnterFullscreenClick() {
        this.enterFullscreen(this.el.closest(".harmonized-viewer"))
    }

    handleExitFullscreenClick() {
        this.exitFullscreen()
    }

    handleDisplayClick() {
        this.menuDisplay.open = !this.menuDisplay.open
    }

    render() {

        const iconTheme = (this.theme == "light" ? iconThemeDark : iconThemeLight)

        return <Host>
            <div class="mdc-top-app-bar mdc-top-app-bar--dense">
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">

                        {<harmonized-button
                            class="mdc-top-app-bar__action-item"
                            icon={this.infoShown ? iconInfoFull : iconInfo}
                            size="sm"
                            label={''}
                            aria-label={this.infoShown ? t('hideInfo') : t('showInfo')}
                            tooltip={this.infoShown ? t('hideInfo') : t('showInfo')}
                            onClick={this.toggleDrawer}>

                        </harmonized-button>}

                        <harmonized-button
                                class={`mdc-top-app-bar__action-item ${this.fullscreen && 'button-fullscreen-exit'}`}
                                icon={this.fullscreen ? iconFullscreenExit : iconFullscreen}
                                size="sm"
                                label={''}
                                aria-label={this.fullscreen ? t('exitFullscreen') : t('enterFullscreen')}
                                tooltip={this.fullscreen ? t('exitFullscreen') : t('enterFullscreen')}
                                onClick={this.fullscreen
                                            ? this.handleExitFullscreenClick.bind(this)
                                            : this.handleEnterFullscreenClick.bind(this)}>

                        </harmonized-button>
                    </section>
                </div>
            </div>
        </Host>
    }
}
