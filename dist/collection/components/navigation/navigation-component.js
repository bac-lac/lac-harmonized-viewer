import { h, Host } from "@stencil/core";
import 'manifesto.js';
import { viewItem } from '../../store/actions/viewport';
import { t } from '../../services/i18n-service';
export class NavigationComponent {
    constructor() {
        this.cols = 10;
        this.rows = 1;
        this.autoResize = false;
        this.currentItemIndex = 0;
        this.items = [];
        this.loadedImageCount = 0;
    }
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { viewItem });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { viewport: { itemIndex, items } } = state;
            return {
                currentItemIndex: itemIndex,
                items
            };
        });
    }
    componentDidLoad() {
        this.resize();
    }
    componentDidUpdate() {
        if (!this.imageList) {
            this.imageList = this.el.querySelector('.harmonized-image-list');
        }
        this.resize();
        this.scaleScroll();
        this.updatedEvent.emit();
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    handleKeyDown(ev) {
        // Handle keyboard previous/next navigation
        if (ev.key === 'ArrowRight' || ev.key == 'ArrowDown') {
            this.viewItem(this.currentItemIndex + 1);
        }
        else if (ev.key === 'ArrowLeft' || ev.key == 'ArrowUp') {
            this.viewItem(this.currentItemIndex - 1);
        }
        if (ev.key == "ArrowDown" || ev.key == 'ArrowUp') {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    handleThumbnailClick(page) {
        this.viewItem(page);
    }
    handleThumbnailLoad(ev) {
        if (this.autoResize) {
            this.resize();
        }
    }
    /*@Watch('currentItemIndex')
    handlePageChange() {
        if (this.items.length >= this.currentItemIndex) {
            const image: HTMLElement = this.el.querySelector(`harmonized-image[page="${this.currentItemIndex}"]`);
            if (image) {
                this.scaleScroll()
                //image.scrollIntoView({ behavior: "smooth", block: "nearest" })
            }
        }
    }*/
    handleResize() {
        if (this.autoResize) {
            this.resize();
        }
    }
    // Keeps the select item visible as a user goes through the thumbnail list
    scaleScroll() {
        const currentItem = this.el.querySelector(`harmonized-image[page="${this.currentItemIndex}"]`);
        if (this.imageList && currentItem) {
            // The value 4 in calculations is the margin
            // Image is past the left border of the overflow
            if (currentItem.offsetLeft < this.imageList.scrollLeft) {
                //console.log(`Image offsetLeft=${currentItem.offsetLeft} < Image list scrollLeft=${this.imageList.scrollLeft}`);
                this.imageList.scrollLeft = this.imageList.scrollLeft - currentItem.clientWidth - 4;
            }
            // Image is past the right border of the overflow
            // Image left offset location + image width is PAST imagelist scrollLeft location + imagelist width
            else if (currentItem.offsetLeft + currentItem.clientWidth > this.imageList.scrollLeft + this.imageList.clientWidth) {
                //console.log(`Image offsetLeft=${currentItem.offsetLeft} & clientWidth=${currentItem.clientWidth} > Image list scrollLeft=${this.imageList.scrollLeft} & clientWidth=${this.imageList.clientWidth}`);
                this.imageList.scrollLeft += currentItem.clientWidth + 4;
            }
        }
    }
    resize() {
        /* Doesn't seem to server a purpose
        // Adjust the height of the navigation to show a specific number of rows
        if (this.imageList) {
            //this.el.style.height = `${this.imageList.offsetHeight}px`
        }
        */
    }
    getListTopOffset() {
        const list = this.el.querySelector('.harmonized-image-list');
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
        if (this.items.length <= 1) {
            return null;
        }
        const className = `harmonized-image-list mdc-image-list mdc-image-list--horizontal mdc-image-list--${this.cols}col`;
        return h("harmonized-image-list", { class: className, tabindex: 0 }, this.items.map((page, index) => h("harmonized-image", { src: page.thumbnail, contentType: page.contentType, page: index, caption: t(page.label), "show-caption": false, "show-tooltip": false, preload: index < 16, onImageLoad: this.handleThumbnailLoad.bind(this) })));
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
            "defaultValue": "10"
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
        "autoResize": {
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
            "attribute": "auto-resize",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "currentItemIndex": {},
        "items": {},
        "loadedImageCount": {}
    }; }
    static get events() { return [{
            "method": "updatedEvent",
            "name": "hvNavigationUpdated",
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
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeyDown",
            "target": "parent",
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
