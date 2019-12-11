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
import { setLanguage, setTheme, enterFullscreen, exitFullscreen, showInfo, hideInfo } from '../../store/actions/document';
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
    @State() language: MyAppState["document"]["language"]
    @State() languageEnabled: MyAppState["document"]["configuration"]["language"]["enable"]
    @State() availableLanguages: MyAppState["document"]["availableLanguages"]
    @State() title: MyAppState["document"]["document"]["label"]
    @State() theme: MyAppState["document"]["theme"]
    @State() themes: MyAppState["document"]["themes"]
    @State() viewport: MyAppState["document"]["viewport"]

    setLanguage: typeof setLanguage
    setTheme: typeof setTheme
    enterFullscreen: typeof enterFullscreen
    exitFullscreen: typeof exitFullscreen
    showInfo: typeof showInfo
    hideInfo: typeof hideInfo

    storeUnsubscribe: Unsubscribe

    private topAppBar?: MDCTopAppBar
    private menuDisplay?: MDCMenu
    private menuLanguage?: MDCMenu
    private snackBar?: MDCSnackbar

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setLanguage, setTheme, enterFullscreen, exitFullscreen, showInfo, hideInfo })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { configuration, document, language, availableLanguages, fullscreen, infoShown, theme, themes }
            } = state
            return {
                language,
                languageEnabled: configuration && configuration.language && configuration.language.enable,
                availableLanguages,
                fullscreen: fullscreen,
                infoShown: infoShown,
                title: (document ? document.label : null),
                theme,
                themes
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

    handleLanguageClick() {
        this.menuLanguage.open = !this.menuLanguage.open
    }

    handleLanguageSelectionChange(selectedValue: string) {

        if (!selectedValue) {
            return undefined
        }

        if (this.language && this.language.code != selectedValue) {

            this.setLanguage(selectedValue)

            const labelElem = this.el.querySelector(".mdc-snackbar .mdc-snackbar__label")
            if (labelElem) {

                labelElem.textContent = t("language_changed", { language: t("name") })
                this.snackBar.open()
            }
        }
    }

    handleEnterFullscreenClick() {
        this.enterFullscreen(this.el.closest(".harmonized-viewer"))
    }

    handleExitFullscreenClick() {
        this.exitFullscreen()
    }

    handleShowInfoClick() {
        this.showInfo();
    }

    handleHideInfoClick() {
        this.hideInfo();
    }


    handleDisplayClick() {
        this.menuDisplay.open = !this.menuDisplay.open
    }

    handleThemeToggleClick() {
        const theme = this.theme == "light" ? "dark" : "light"
        this.setTheme(theme)
    }

    render() {

        const iconTheme = (this.theme == "light" ? iconThemeDark : iconThemeLight)

        return <Host>
            <div class="mdc-top-app-bar mdc-top-app-bar--dense">
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        {/*<button class="mdc-top-app-bar__navigation-icon mdc-icon-button">
                            <i class="mdc-icon-button__icon" innerHTML={iconMenu}></i>
                        </button>
                        <span class="mdc-top-app-bar__title">{t(this.title)}</span>*/}
                    </section>
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">

                        {/*<harmonized-button
                            class="mdc-top-app-bar__action-item"
                            icon={iconTheme}
                            size="sm"
                            aria-label={t('change_theme')}
                            tooltip={t('change_theme')}
                            onClick={this.handleThemeToggleClick.bind(this)}>

                        </harmonized-button>*/}
                        {/*
                            this.languageEnabled &&
                            <harmonized-button
                                class="mdc-top-app-bar__action-item mdc-menu-surface--anchor"
                                icon={iconLanguage}
                                dropdown={true}
                                size="sm"
                                label={this.language && this.language.name}
                                aria-label={t('changeLanguage')}
                                tooltip={t('changeLanguage')}
                                onClick={this.handleLanguageClick.bind(this)}>

                                <div class="mdc-menu mdc-menu-surface" id="menu-language">
                                    <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                                        {this.availableLanguages.map((language) => {
                                            const selected = (this.language && this.language.code == language.code)
                                            return <li
                                                role="menuitem"
                                                class={selected ? "mdc-list-item mdc-list-item--selected" : "mdc-list-item"}
                                                tabIndex={selected ? 0 : undefined}
                                                onClick={(ev) => { this.handleLanguageSelectionChange(language.code) }}>
                                                <span class="mdc-list-item__text">
                                                    {language.name}
                                                </span>
                                            </li>
                                        })}
                                    </ul>
                                </div>

                            </harmonized-button>*/
                        }

                        {<harmonized-button
                            class="mdc-top-app-bar__action-item"
                            icon={this.infoShown ? iconInfoFull : iconInfo}
                            size="sm"
                            label={''}
                            aria-label={this.infoShown ? t('hideInfo') : t('showInfo')}
                            tooltip={this.infoShown ? t('hideInfo') : t('showInfo')}
                            onClick={this.infoShown ? this.handleHideInfoClick.bind(this) : this.handleShowInfoClick.bind(this) }>

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
                        {/*
                            !this.fullscreen &&
                            <harmonized-button
                                class="mdc-top-app-bar__action-item"
                                icon={iconFullscreen}
                                size="sm"
                                label={''}
                                aria-label={t('enterFullscreen')}
                                tooltip={t('enterFullscreen')}
                                onClick={this.handleEnterFullscreenClick.bind(this)}>

                            </harmonized-button>
                        }

                        {
                            this.fullscreen &&
                            <harmonized-button
                                class="mdc-top-app-bar__action-item button-fullscreen-exit"
                                icon={iconFullscreenExit}
                                size="sm"
                                label={''}
                                aria-label={t('exitFullscreen')}
                                tooltip={t('exitFullscreen')}
                                onClick={this.handleExitFullscreenClick.bind(this)}>

                            </harmonized-button>
                        */}

                    </section>
                </div>
            </div>
            {/*<div class="mdc-snackbar">
                <div class="mdc-snackbar__surface">
                    <div class="mdc-snackbar__label"
                        role="status"
                        aria-live="polite">
                    </div>
                    <div class="mdc-snackbar__actions">
                        <button type="button" class="mdc-button mdc-snackbar__action">
                            {t("ok")}
                        </button>
                    </div>
                </div>
            </div>*/}
        </Host>
    }
}
