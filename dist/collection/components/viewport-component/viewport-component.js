import { h, Host } from "@stencil/core";
import { toggleDrawer } from '../../store/actions/viewport';
import { t } from '../../services/i18n-service';
import { resolveViewportType } from '../../utils/viewport';
import { selectCurrentItem } from '../../store/selectors/item';
export class ViewportComponent {
    constructor() {
        this.suppressGallery = false;
    }
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { toggleDrawer });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            return {
                suppressGallery: state.document.configuration ? state.document.configuration.suppressGallery : false,
                numberOfItems: state.viewport.items.length,
                currentItem: selectCurrentItem(state)
            };
        });
    }
    componentDidUpdate() {
        this.updatedEvent.emit();
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    render() {
        let viewportType = this.currentItem ? resolveViewportType(this.currentItem.contentType) : undefined;
        // TODO
        /*if (this.status.code == 'empty') {
            return undefined
        }*/
        return h(Host, { class: `viewport viewport-${viewportType}` }, this.currentItem &&
            h("div", { class: "viewport__content" },
                (() => {
                    switch (viewportType) {
                        case 'image':
                            return h("harmonized-openseadragon", { id: "viewport", allowPaging: !this.suppressGallery });
                        case 'pdf':
                            return h("harmonized-embed", { id: "viewport", url: this.currentItem.image });
                        case 'audio':
                            return h("harmonized-audio", { id: "viewport", url: this.currentItem.image, contentType: this.currentItem.contentType });
                        case 'video':
                            return h("harmonized-video", { id: "viewport", url: this.currentItem.image, contentType: this.currentItem.contentType });
                        default:
                            return null;
                    }
                })(),
                this.numberOfItems > 1 &&
                    h("div", { class: "viewport__content-pager" },
                        h("div", { class: "paging-label" }, t(this.currentItem.label)),
                        !this.suppressGallery &&
                            h("harmonized-pager", null))));
    }
    static get is() { return "harmonized-viewport"; }
    static get originalStyleUrls() { return {
        "$": ["viewport-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["viewport-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "suppressGallery": {},
        "numberOfItems": {},
        "currentItem": {}
    }; }
    static get events() { return [{
            "method": "updatedEvent",
            "name": "harmonizedViewerViewportUpdated",
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
