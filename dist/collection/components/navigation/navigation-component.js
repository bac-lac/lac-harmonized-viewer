import { h } from "@stencil/core";
import 'manifesto.js';
import OverlayScrollbars from 'overlayscrollbars';
export class NavigationComponent {
    constructor() {
        this.page = 0;
    }
    componentDidLoad() {
    }
    componentDidRender() {
        OverlayScrollbars(this.el.querySelector('.hv-navigation__content'), {});
        var lazyImages = [].slice.call(this.el.querySelectorAll(".hv-lazyload"));
        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target.querySelector('img');
                        if (lazyImage) {
                            lazyImage.src = lazyImage.dataset.src;
                            //lazyImage.srcset = lazyImage.dataset.srcset;
                            lazyImage.classList.remove("hv-lazyload--loading");
                            lazyImage.classList.add("hv-lazyload--complete");
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    }
                });
            });
            lazyImages.forEach(function (lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        }
        else {
            // Possibly fall back to a more compatible method here
        }
    }
    getItems() {
        if (!this.manifest) {
            return undefined;
        }
        return this.manifest
            .getSequenceByIndex(0)
            .getCanvases()
            .map(canvas => {
            let imageUrl;
            if (canvas.getThumbnail()) {
                imageUrl = canvas.getThumbnail().id;
            }
            else if (!imageUrl) {
                let baseUrl = canvas.getImages()[0].getResource().getServices()[0].id;
                imageUrl = baseUrl + '/full/90,/0/default.jpg';
            }
            return {
                title: canvas.getDefaultLabel(),
                thumbnailUrl: imageUrl
            };
        });
    }
    // @Watch('items')
    // watchItemsHandler() {
    //   console.log('watch');
    //   var lazyImages = this.el.querySelectorAll('img.hv-lazy');
    //   lazyload(lazyImages);
    // }
    gotoHandler(event) {
        this.page = event.detail;
        const items = Array
            .from(this.el.querySelectorAll('.hv-navigation li'))
            .map(child => child);
        // Apply active CSS class
        items.forEach((item, index) => (this.page == index) ? item.classList.add('active') : item.classList.remove('active'));
        // Make sure the canvas thumbnail is visible
        // by scrolling to its corresponding element
        items[this.page].scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
    onClick(event, page) {
        this.goto.emit(page);
    }
    onImageLoad(event) {
        var target = event.target;
        var li = target.parentElement.parentElement;
        li.classList.remove('hv-lazyload--loading');
        li.classList.add('hv-lazyload--complete', 'animated', 'fadeIn', 'faster');
    }
    render() {
        const items = this.getItems();
        const loading = (items ? false : true);
        const skeleton = Array.apply(null, Array(10)).map(function () { });
        const source = (loading ? skeleton : items);
        return (h("div", { class: "hv-navigation__content" },
            h("div", { class: "bx--grid bx--grid--condensed" },
                h("ul", { class: (loading ? "bx--row hv-navigation__list" : "bx--row hv-navigation__list") }, source.map((item, index) => h("li", { class: (this.page == index) ? "bx--col-lg-6 hv-lazyload hv-lazyload--loading active" : "bx--col-lg-6 hv-lazyload hv-lazyload--loading" },
                    h("span", { class: "hv-skeleton", "aria-hidden": "true" }),
                    (loading ? h("span", null) :
                        h("a", { href: "javascript:;", onClick: (e) => this.onClick(e, index) },
                            h("img", { "data-src": item.thumbnailUrl, onLoad: this.onImageLoad, alt: item.title })))))))));
    }
    static get is() { return "hv-navigation"; }
    static get originalStyleUrls() { return {
        "$": ["navigation-component.scss", "../../../node_modules/overlayscrollbars/css/OverlayScrollbars.min.css"]
    }; }
    static get styleUrls() { return {
        "$": ["navigation-component.css", "../../../node_modules/overlayscrollbars/css/OverlayScrollbars.min.css"]
    }; }
    static get properties() { return {
        "page": {
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
            "attribute": "page",
            "reflect": false,
            "defaultValue": "0"
        },
        "manifest": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Manifesto.IManifest",
                "resolved": "IManifest",
                "references": {
                    "Manifesto": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get events() { return [{
            "method": "goto",
            "name": "goto",
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
            "name": "goto",
            "method": "gotoHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
