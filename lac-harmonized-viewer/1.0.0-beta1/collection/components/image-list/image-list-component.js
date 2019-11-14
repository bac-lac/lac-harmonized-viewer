import { h, Host } from "@stencil/core";
export class ImageListComponent {
    constructor() {
        this.children = 0;
    }
    componentDidLoad() {
        this.observer = this.createObserver();
        this.bind();
    }
    componentDidUnload() {
        this.observer.disconnect();
    }
    componentDidRender() {
        this.bind();
    }
    handleImageAdded() {
        this.children = this.el.children.length;
    }
    createObserver() {
        return new IntersectionObserver(this.handleObserve);
    }
    bind() {
        const images = Array.from(this.el.querySelectorAll('img[data-lazy-load]'));
        images.forEach((image) => this.bindOne(image));
    }
    bindOne(element) {
        if (!element) {
            return undefined;
        }
        if (!this.observer) {
            this.observer = this.createObserver();
        }
        if (element.classList.contains('is-observed') === false) {
            this.observer.observe(element);
            element.classList.add('is-observed');
        }
    }
    handleObserve(entries, observer) {
        if (!entries || !observer) {
            return undefined;
        }
        entries.forEach((entry) => {
            let image = entry.target;
            if (image) {
                if (entry.isIntersecting) {
                    image.classList.remove('is-observed');
                    image.src = image.dataset.src;
                    //image.srcset = this.srcset
                    observer.unobserve(image);
                }
            }
        });
    }
    static get is() { return "harmonized-image-list"; }
    static get originalStyleUrls() { return {
        "$": ["image-list-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["image-list-component.css"]
    }; }
    static get states() { return {
        "children": {}
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "imageAdded",
            "method": "handleImageAdded",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
