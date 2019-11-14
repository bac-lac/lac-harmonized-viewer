import { h } from "@stencil/core";
import 'manifesto.js';
import { setPage } from '../../store/actions/document';
import { label } from '../../services/i18n-service';
export class NavigationComponent {
    constructor() {
        this.cols = 2;
        this.rows = 1;
        this.placement = 'left';
        this.loadedImageCount = 0;
    }
    handleRowsChange() {
        this.resize();
    }
    //private tabs: MDCTabBar
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { setPage });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { locale: locale, loading: loading, page: page, pages: pages } } = state;
            return {
                locale: locale,
                loading: loading,
                page: page,
                pages: pages
            };
        });
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    componentDidLoad() {
        //this.tabs = new MDCTabBar(this.el.querySelector('.mdc-tab-bar'))
        this.resize();
    }
    handleKeyDown(ev) {
        // Handle keyboard previous/next navigation
        if (ev.key === 'ArrowRight' || ev.key == 'ArrowDown') {
            this.setPage(this.page + 1);
        }
        else if (ev.key === 'ArrowLeft' || ev.key == 'ArrowUp') {
            this.setPage(this.page - 1);
        }
    }
    handleThumbnailClick(page) {
        this.setPage(page);
    }
    handleThumbnailLoad(ev) {
        this.resize();
    }
    handleResize() {
        this.resize();
    }
    resize() {
        if (this.placement != 'top' && this.placement != 'bottom') {
            return undefined;
        }
        // Adjust the height of the navigation to show a specific number of rows
        const item = this.el.querySelector('harmonized-image-list > .is-loaded');
        if (item) {
            const paddingTop = this.getComputedStyle(item, 'padding-top');
            const paddingBottom = this.getComputedStyle(item, 'padding-bottom');
            const marginTop = this.getComputedStyle(item, 'margin-top');
            const marginBottom = this.getComputedStyle(item, 'margin-bottom');
            const paddingY = paddingTop + paddingBottom;
            const marginY = marginTop + marginBottom;
            // Padding already included in clientHeight
            const rowHeight = (item.clientHeight + marginY);
            const height = (rowHeight * this.rows) + this.getListTopOffset();
            this.el.style.height = `${height}px`;
        }
    }
    getListTopOffset() {
        const list = this.el.querySelector('harmonized-image-list');
        if (list) {
            const paddingTop = this.getComputedStyle(list, 'padding-top');
            const paddingBottom = this.getComputedStyle(list, 'padding-bottom');
            const marginTop = this.getComputedStyle(list, 'margin-top');
            const marginBottom = this.getComputedStyle(list, 'margin-bottom');
            return paddingTop + paddingBottom + marginTop + marginBottom;
        }
        else {
            return 0;
        }
    }
    getComputedStyle(element, name) {
        if (!element || !name) {
            return undefined;
        }
        const value = window.getComputedStyle(element, null).getPropertyValue(name);
        // Strip units
        const matches = value.match(/(([-0-9\.]+)+)/gi);
        if (matches) {
            return Number(matches[0]);
        }
    }
    render() {
        let className = 'mdc-image-list';
        if (this.placement == 'left' || this.placement == 'right') {
            className += ' mdc-image-list--2col';
        }
        return h("div", { class: "navigation-content" },
            h("harmonized-image-list", { class: className }, this.pages.map((page, index) => h("harmonized-image", { src: page.thumbnail, page: index, caption: label(page.label), showCaption: true, showTooltip: false, preload: index < 16, onImageLoad: this.handleThumbnailLoad.bind(this) }))));
    }
    static get is() { return "harmonized-navigation"; }
    static get originalStyleUrls() { return {
        "$": ["navigation-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["navigation-component.css"]
    }; }
    static get properties() { return {
        "cols": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "cols",
            "reflect": false,
            "defaultValue": "2"
        },
        "rows": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "rows",
            "reflect": false,
            "defaultValue": "1"
        },
        "placement": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "PlacementType",
                "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
                "references": {
                    "PlacementType": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "placement",
            "reflect": false,
            "defaultValue": "'left'"
        }
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "loading": {},
        "locale": {},
        "page": {},
        "pages": {},
        "loadedImageCount": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "rows",
            "methodName": "handleRowsChange"
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeyDown",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "resize",
            "method": "handleResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
