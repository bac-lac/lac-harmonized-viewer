import { h, Host } from "@stencil/core";
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCMenu, Corner } from '@material/menu';
import { MDCSnackbar } from '@material/snackbar';
//import iconMenu from '../../assets/material-design-icons/ic_menu_18px.svg'
//import iconLanguage from '../../assets/material-icons/translate.svg';
import iconInfo from '../../assets/material-icons/ic_info_24px.svg';
import iconInfoFull from '../../assets/material-icons/ic_info_full_24px.svg';
import { toggleFullscreen, toggleDrawer } from '../../store/actions/viewport';
import { t } from '../../services/i18n-service';
import { resolveViewportType } from '../../utils/viewport';
export class TopbarComponent {
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { toggleFullscreen, toggleDrawer });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { theme }, viewport: { title, itemIndex, items, fullscreen, infoShown } } = state;
            return {
                title,
                currentItemIndex: itemIndex,
                items,
                fullscreen,
                infoShown,
                theme
            };
        });
    }
    componentDidLoad() {
        this.topAppBar = new MDCTopAppBar(this.el.querySelector('.mdc-top-app-bar'));
        // this.menuDisplay = new MDCMenu(this.el.querySelector('.mdc-menu'))
        // this.menuDisplay.setAnchorCorner(Corner.BOTTOM_LEFT)
        const languageElem = this.el.querySelector('#menu-language');
        if (languageElem) {
            this.menuLanguage = new MDCMenu(languageElem);
            this.menuLanguage.setAnchorCorner(Corner.BOTTOM_LEFT);
            this.menuLanguage.quickOpen = true;
        }
        const snackBarElem = this.el.querySelector(".mdc-snackbar");
        if (snackBarElem) {
            this.snackBar = new MDCSnackbar(snackBarElem);
        }
    }
    componentDidUpdate() {
        this.updatedEvent.emit();
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    handleDisplayClick() {
        this.menuDisplay.open = !this.menuDisplay.open;
    }
    render() {
        // Top bar is fixed for PDFs & Video/Audio - for now
        const currentItem = this.items[this.currentItemIndex];
        const viewportType = currentItem ? resolveViewportType(currentItem.contentType) : undefined;
        const hasFixedTopbar = true; //viewportType !== 'image';    Make it fixed for all, for now.
        return h(Host, null,
            h("div", { class: `mdc-top-app-bar ${hasFixedTopbar && 'mdc-top-app-bar--fixed'} mdc-top-app-bar--dense` },
                h("div", { class: "mdc-top-app-bar__row" },
                    h("section", { class: "mdc-top-app-bar__section mdc-top-app-bar__section--align-start" }),
                    h("section", { class: "mdc-top-app-bar__section mdc-top-app-bar__section--align-end", role: "toolbar" },
                        h("div", { class: "group" },
                            h("harmonized-button", { class: "mdc-top-app-bar__action-item", style: { display: 'inline' }, icon: this.infoShown ? iconInfoFull : iconInfo, size: "sm", label: '', "aria-label": this.infoShown ? t('hideInfo') : t('showInfo'), tooltip: this.infoShown ? t('hideInfo') : t('showInfo'), onClick: this.toggleDrawer }))))));
    }
    static get is() { return "harmonized-topbar"; }
    static get originalStyleUrls() { return {
        "$": ["topbar-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["topbar-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "title": {},
        "fullscreen": {},
        "infoShown": {},
        "currentItemIndex": {},
        "items": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "fullscreenToggle",
            "name": "_hvFullscreenToggle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "updatedEvent",
            "name": "harmonizedViewerTopBarUpdated",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
}
