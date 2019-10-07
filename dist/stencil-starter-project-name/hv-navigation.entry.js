import { r as registerInstance, c as createEvent, h, d as getElement } from './core-60b8aeac.js';
import './_commonjsHelpers-1acf89e0.js';
import './process-es6-5440eddf.js';
import './manifesto-fc55e54c.js';
import './events-a002731b.js';

const NavigationComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.page = 0;
        this.goto = createEvent(this, "goto", 7);
    }
    componentDidRender() {
        var lazyImages = [].slice.call(this.el.querySelectorAll(".hv-lazyload"));
        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target.querySelector('img');
                        lazyImage.src = lazyImage.dataset.src;
                        //lazyImage.srcset = lazyImage.dataset.srcset;
                        lazyImage.classList.remove("hv-lazyload--loading");
                        lazyImage.classList.add("hv-lazyload--complete");
                        lazyImageObserver.unobserve(lazyImage);
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
        li.classList.add('hv-lazyload--complete');
    }
    render() {
        const items = this.getItems();
        const loading = (items ? false : true);
        const skeleton = Array.apply(null, Array(10)).map(function () { });
        const source = (loading ? skeleton : items);
        return (h("div", { class: "bx--grid bx--grid--condensed" }, h("ul", { class: (loading ? "bx--row hv-navigation__list" : "bx--row hv-navigation__list") }, source.map((item, index) => h("li", { class: (this.page == index) ? "bx--col-lg-6 hv-lazyload hv-lazyload--loading active" : "bx--col-lg-6 hv-lazyload hv-lazyload--loading" }, h("span", { class: "hv-skeleton", "aria-hidden": "true" }), (loading ? h("span", null) :
            h("a", { href: "javascript:;", onClick: (e) => this.onClick(e, index) }, h("img", { "data-src": item.thumbnailUrl, onLoad: this.onImageLoad, alt: item.title }))))))));
    }
    get el() { return getElement(this); }
    static get style() { return ".hv-navigation__list {\n  margin-top: 1rem;\n}\n.hv-navigation__list li[class*=col] {\n  padding-left: 0.3rem;\n  padding-right: 0.3rem;\n  padding-bottom: 0.6rem;\n}\n.hv-navigation__list li.hv-lazyload.hv-lazyload--loading .hv-skeleton {\n  display: inline-block;\n  width: 90px;\n  height: 120px;\n  background: red;\n}\n.hv-navigation__list li.hv-lazyload.hv-lazyload--loading a {\n  display: none;\n}\n.hv-navigation__list li.hv-lazyload.hv-lazyload--complete .hv-skeleton {\n  display: none;\n}\n.hv-navigation__list li.hv-lazyload.hv-lazyload--complete a {\n  display: inline-block;\n}\n.hv-navigation__list li a {\n  border-radius: 0px;\n  -webkit-transition: -webkit-box-shadow 200ms ease;\n  transition: -webkit-box-shadow 200ms ease;\n  transition: box-shadow 200ms ease;\n  transition: box-shadow 200ms ease, -webkit-box-shadow 200ms ease;\n}\n.hv-navigation__list li a:hover {\n  -webkit-box-shadow: 0 0 1px 3px #c9c9c9;\n  box-shadow: 0 0 1px 3px #c9c9c9;\n}\n.hv-navigation__list li.active a {\n  -webkit-box-shadow: 0 0 1px 4px #d97854;\n  box-shadow: 0 0 1px 4px #d97854;\n}\n.hv-navigation__list img {\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  display: block;\n  -webkit-box-shadow: 1px 1px 3px 1px rgba(76, 86, 106, 0.3);\n  box-shadow: 1px 1px 3px 1px rgba(76, 86, 106, 0.3);\n  border: #fff 1px solid;\n}"; }
};

export { NavigationComponent as hv_navigation };
