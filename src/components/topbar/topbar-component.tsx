import { Component, h, Element, Prop, Host, State, Listen, Watch, Event, EventEmitter } from '@stencil/core';
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
import { toggleFullscreen, toggleDrawer } from '../../store/actions/viewport';
import { t } from '../../services/i18n-service';
import { resolveViewportType } from '../../utils/viewport';

@Component({
    tag: 'harmonized-topbar',
    styleUrl: 'topbar-component.scss'
})
export class TopbarComponent {

    @Element() el: HTMLElement

    @Prop({ context: "store" }) store: Store

    @State() title: MyAppState["viewport"]["title"]
    @State() fullscreen: MyAppState["viewport"]["fullscreen"]
    @State() infoShown: MyAppState["viewport"]["infoShown"]
    @State() currentItemIndex: MyAppState['viewport']['itemIndex']
    @State() items: MyAppState['viewport']['items']

    @State() theme: MyAppState["document"]["theme"]

    toggleFullscreen: typeof toggleFullscreen
    toggleDrawer: typeof toggleDrawer

    storeUnsubscribe: Unsubscribe

    @Event({ eventName: '_hvFullscreenToggle' }) fullscreenToggle: EventEmitter
    @Event({ eventName: 'harmonizedViewerTopBarUpdated'}) updatedEvent: EventEmitter

    private topAppBar?: MDCTopAppBar
    private menuDisplay?: MDCMenu
    private menuLanguage?: MDCMenu
    private snackBar?: MDCSnackbar

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { toggleFullscreen, toggleDrawer })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { theme },
                viewport: { title, itemIndex, items, fullscreen, infoShown }
            } = state
            return {
                title,
                currentItemIndex: itemIndex,
                items,
                fullscreen,
                infoShown,
                theme
            }
        });
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

    componentDidUpdate() {
        this.updatedEvent.emit();
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    handleFullscreenToggle() {
        
    }

    handleDisplayClick() {
        this.menuDisplay.open = !this.menuDisplay.open
    }

    render() {
        // Top bar is fixed for PDFs & Video/Audio - for now
        const currentItem = this.items[this.currentItemIndex] as DocumentPage;
        const viewportType = currentItem ? resolveViewportType(currentItem.contentType) : undefined;
        const hasFixedTopbar = true; //viewportType !== 'image';    Make it fixed for all, for now.

        return <Host>
            <div class={`mdc-top-app-bar ${hasFixedTopbar && 'mdc-top-app-bar--fixed'} mdc-top-app-bar--dense`}>
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">

                    </section>

                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                        <div class="group">
                            <harmonized-button
                                class="mdc-top-app-bar__action-item"
                                style={{display: 'inline'}}
                                icon={this.infoShown ? iconInfoFull : iconInfo}
                                size="sm"
                                label={''}
                                aria-label={this.infoShown ? t('hideInfo') : t('showInfo')}
                                tooltip={this.infoShown ? t('hideInfo') : t('showInfo')}
                                onClick={this.toggleDrawer}>
                            </harmonized-button>

                            <harmonized-button
                                    class={`mdc-top-app-bar__action-item ${this.fullscreen && 'button-fullscreen-exit'}`}
                                    style={{display: 'inline'}}
                                    icon={this.fullscreen ? iconFullscreenExit : iconFullscreen}
                                    size="sm"
                                    label={''}
                                    aria-label={this.fullscreen ? t('exitFullscreen') : t('enterFullscreen')}
                                    tooltip={this.fullscreen ? t('exitFullscreen') : t('enterFullscreen')}
                                    onClick={this.fullscreenToggle.emit}>
                            </harmonized-button>
                        </div>
                    </section>
                </div>
            </div>
        </Host>
    }
}
