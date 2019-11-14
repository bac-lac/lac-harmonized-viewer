import { h, Host } from "@stencil/core";
import '../../utils/manifest';
import { parseContentType } from '../../utils/utils';
import axios from 'axios';
import iconChevronLeft from '../../assets/material-design-icons/ic_chevron_left_48px.svg';
import iconChevronRight from '../../assets/material-design-icons/ic_chevron_right_48px.svg';
import { setDocumentContentType, setStatus, setPage, setLoading, setError } from '../../store/actions/document';
export class ViewportComponent {
    constructor() {
        this.navigationEnable = true;
        this.navigationPlacement = 'left';
        this.annotationsEnable = false;
    }
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { setLoading, setError, setPage, setStatus, setDocumentContentType });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { contentType: contentType, status: status, page: page, pageCount: pageCount, url: url } } = state;
            return {
                contentType: contentType,
                status: status,
                page: page,
                pageCount: pageCount,
                url: url
            };
        });
    }
    async componentDidLoad() {
        try {
            // Pre-fetch document
            // Use response content-type to resolve viewer
            this.setStatus('prefetching');
            const response = await axios.head(this.url);
            this.setStatus('prefetched');
            const contentType = parseContentType(response.headers['content-type']);
            if (contentType) {
                this.setDocumentContentType(contentType);
            }
        }
        catch (e) {
            const err = e;
            this.setError(err.name, err.message);
        }
        // const buttons = Array.from(this.el.querySelectorAll('.mdc-icon-button'))
        // buttons.forEach((button) => {
        //     const b = new MDCRipple(button)
        //     b.unbounded = true
        // })
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    componentDidRender() {
        this.setContentMargins();
    }
    isFirst() {
        return (this.page <= 0);
    }
    isLast() {
        return (this.page >= (this.pageCount - 1));
    }
    handlePreviousClick() {
        this.setPage(this.page - 1);
    }
    handleNextClick() {
        this.setPage(this.page + 1);
    }
    render() {
        return (h(Host, null,
            this.status.code == 'loading' &&
                h("harmonized-spinner", null),
            this.renderNavigation('top'),
            h("div", { class: "hv-content" },
                this.renderNavigation('left'),
                h("main", { class: "hv-main mdc-drawer-app-content" },
                    h("div", { class: "hv-main__content" },
                        h("div", { class: "button-navigation button-navigation--prev" },
                            h("button", { type: "button", "aria-label": "Go to previous page", onClick: this.handlePreviousClick.bind(this), disabled: this.status.loading || this.isFirst() },
                                h("div", { class: "mdc-button__ripple" }),
                                h("div", { class: "mdc-button__icon", innerHTML: iconChevronLeft }),
                                h("div", { class: "mdc-button__touch" }))),
                        h("div", { class: this.status.loading ? 'viewport-content viewport-content--loading' : 'viewport-content' }, this.renderOpenSeadragon()),
                        h("div", { class: "button-navigation button-navigation--next" },
                            h("button", { type: "button", "aria-label": "Go to next page", onClick: this.handleNextClick.bind(this), disabled: this.status.loading || this.isLast() },
                                h("div", { class: "mdc-button__ripple" }),
                                h("div", { class: "mdc-button__icon", innerHTML: iconChevronRight }),
                                h("div", { class: "mdc-button__touch" }))))),
                this.annotationsEnable &&
                    h("harmonized-drawer", { placement: "right", toolbar: false, visible: true },
                        h("hv-annotations", null)),
                this.renderNavigation('right')),
            this.renderNavigation('bottom')));
    }
    setContentMargins() {
        const content = this.el.querySelector('.mdc-drawer-app-content');
        if (content) {
            const previousSibling = this.findPreviousSibling(content, '.mdc-drawer');
            const nextSibling = this.findNextSibling(content, '.mdc-drawer');
            content.style.marginLeft = `${(previousSibling && previousSibling.clientWidth) || 0}px`;
            content.style.marginRight = `${(nextSibling && nextSibling.clientWidth) || 0}px`;
        }
    }
    findPreviousSibling(element, selector) {
        if (!element || !selector) {
            return undefined;
        }
        const match = element.matches(selector);
        if (match) {
            return element;
        }
        else {
            return this.findPreviousSibling(element.previousElementSibling, selector);
        }
    }
    findNextSibling(element, selector) {
        if (!element || !selector) {
            return undefined;
        }
        const match = element.matches(selector);
        if (match) {
            return element;
        }
        else {
            return this.findNextSibling(element.nextElementSibling, selector);
        }
    }
    renderNavigation(placement) {
        if (this.navigationEnable &&
            this.navigationPlacement === placement) {
            if (placement == 'left' || placement == 'right') {
                return h("harmonized-drawer", { placement: placement, visible: true },
                    h("harmonized-navigation", { class: "navigation navigation--" + this.navigationPlacement, placement: placement }));
            }
            else {
                return h("harmonized-navigation", { class: "navigation navigation--" + this.navigationPlacement, placement: placement, rows: 1 });
            }
        }
    }
    renderViewport() {
        let element = null;
        switch (this.contentType) {
            case 'application/json':
                element = this.renderOpenSeadragon();
                break;
            case 'application/pdf':
                element = this.renderPDF();
                break;
        }
        return element;
    }
    renderOpenSeadragon() {
        //return <harmonized-openseadragon />
        return [h("harmonized-openseadragon", null), h("harmonized-pager", null)];
    }
    renderPDF() {
        return h("harmonized-pdf", null);
    }
    static get is() { return "harmonized-viewport"; }
    static get originalStyleUrls() { return {
        "$": ["viewport-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["viewport-component.css"]
    }; }
    static get properties() { return {
        "navigationEnable": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "navigation-enable",
            "reflect": false,
            "defaultValue": "true"
        },
        "navigationPlacement": {
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
            "attribute": "navigation-placement",
            "reflect": false,
            "defaultValue": "'left'"
        },
        "annotationsEnable": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "annotations-enable",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "contentType": {},
        "status": {},
        "page": {},
        "pageCount": {},
        "url": {}
    }; }
    static get elementRef() { return "el"; }
}
