import { h, Host } from "@stencil/core";
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCMenu, Corner } from '@material/menu';
import iconMenu from '../../assets/material-design-icons/ic_menu_18px.svg';
import iconMore from '../../assets/material-design-icons/navigation/ic_more_vert_18px.svg';
import iconDisplay from '../../assets/material-icons/ic_display_24px.svg';
import iconDockLeft from '../../assets/material-icons/ic_dock_left_24px.svg';
import iconDockBottom from '../../assets/material-icons/ic_dock_bottom_24px.svg';
import { setViewport } from '../../store/actions/document';
import { label } from '../../services/i18n-service';
export class TopbarComponent {
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { setViewport });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { document: document, locale: locale, viewport: viewport } } = state;
            return {
                locale: locale,
                title: (document ? document.label : null),
                viewport: viewport
            };
        });
    }
    componentDidLoad() {
        this.topAppBar = new MDCTopAppBar(this.el.querySelector('.topbar'));
        this.menuDisplay = new MDCMenu(this.el.querySelector('.mdc-menu'));
        this.menuDisplay.setAnchorCorner(Corner.BOTTOM_LEFT);
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    handleDisplayClick() {
        this.menuDisplay.open = !this.menuDisplay.open;
    }
    handleDisplaySelectionChange(placement, ev) {
        this.setViewport({
            navigationPlacement: placement
        });
    }
    openSettings() {
        this.elemSettings.open();
    }
    render() {
        return h(Host, null,
            h("header", { class: "topbar", style: { backgroundColor: this.backgroundColor } },
                h("div", { class: "topbar-row" },
                    h("section", { class: "mdc-top-app-bar__section mdc-top-app-bar__section--align-start" },
                        h("button", { class: "material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" },
                            h("i", { class: "mdc-icon-button__icon", innerHTML: iconMenu })),
                        h("span", { class: "mdc-top-app-bar__title" }, label(this.title))),
                    h("section", { class: "mdc-top-app-bar__section mdc-top-app-bar__section--align-end", role: "toolbar" },
                        h("div", { class: "mdc-menu-surface--anchor" },
                            h("button", { type: "button", class: "material-icons mdc-top-app-bar__action-item mdc-icon-button", onClick: this.handleDisplayClick.bind(this) },
                                h("i", { class: "mdc-icon-button__icon", innerHTML: iconDisplay })),
                            h("div", { class: "mdc-menu mdc-menu-surface", id: "demo-menu" },
                                h("ul", { class: "mdc-list", role: "menu", "aria-hidden": "true", "aria-orientation": "vertical", tabindex: "-1" },
                                    h("li", null,
                                        h("ul", { class: "mdc-menu__selection-group" },
                                            h("li", { role: "menuitem", class: "mdc-list-item mdc-list-item--selected", onClick: this.handleDisplaySelectionChange.bind(this, 'left') },
                                                h("span", { class: "mdc-list-item__graphic mdc-menu__selection-group-icon", innerHTML: iconDockLeft }),
                                                h("span", { class: "mdc-list-item__text" }, "Left")),
                                            h("li", { role: "menuitem", class: "mdc-list-item", onClick: this.handleDisplaySelectionChange.bind(this, 'bottom') },
                                                h("span", { class: "mdc-list-item__graphic mdc-menu__selection-group-icon", innerHTML: iconDockBottom }),
                                                h("span", { class: "mdc-list-item__text" }, "Bottom"))))))),
                        h("button", { type: "button", class: "material-icons mdc-top-app-bar__action-item mdc-icon-button", "aria-label": "Bookmark this page", onClick: this.openSettings.bind(this) },
                            h("i", { class: "mdc-icon-button__icon", innerHTML: iconMore }))))),
            h("hv-settings", { ref: el => this.elemSettings = el }));
    }
    static get is() { return "harmonized-topbar"; }
    static get originalStyleUrls() { return {
        "$": ["topbar-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["topbar-component.css"]
    }; }
    static get properties() { return {
        "backgroundColor": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "background-color",
            "reflect": false
        }
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "locale": {},
        "title": {},
        "viewport": {}
    }; }
    static get elementRef() { return "el"; }
}
