import { r as registerInstance, d as getContext, h, g as getElement } from './core-b1fe98b5.js';
import { s as setPage } from './document-de552146.js';

const HVToolbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.store = getContext(this, "store");
    }
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { setPage });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { alternateFormats: alternateFormats, loading: loading, page: page, pageCount: pageCount } } = state;
            return {
                alternateFormats: alternateFormats,
                loading: loading,
                page: page,
                pageCount: pageCount
            };
        });
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    isFirst() {
        return (this.page <= 0);
    }
    isLast() {
        return (this.page >= (this.pageCount - 1));
    }
    handleHomeClick() {
        this.setPage(0);
    }
    handlePreviousClick() {
        this.setPage(this.page - 1);
    }
    handleNextClick() {
        this.setPage(this.page + 1);
    }
    handleFullscreenClick() {
        const instance = this.el.closest('.harmonized-viewer');
        if (instance) {
            instance.requestFullscreen();
            instance.classList.add('is-fullscreen');
        }
    }
    handleAlternateFormatClick() {
    }
    handleDropdownClick(ev) {
        ev.stopPropagation();
        const target = ev.currentTarget;
        if (target) {
            const dropdown = target.closest('.has-dropdown');
            if (dropdown) {
                dropdown.classList.toggle('is-active');
            }
        }
    }
    render() {
        return (h("nav", { class: "navbar is-light", role: "toolbar", "aria-label": "Toolbar navigation" }, h("div", { class: "navbar-menu" }, h("div", { class: "navbar-start" }, h("a", { class: "navbar-item", title: "Home", onClick: this.handleHomeClick.bind(this) }), h("harmonized-zoom-slider", null), h("div", { class: "navbar-item has-dropdown" }, h("a", { class: "navbar-link" }, "View as"), h("div", { class: "navbar-dropdown" }, h("a", { class: "navbar-item" }, "IIIF"), h("a", { class: "navbar-item" }, "PDF")))), h("div", { class: "navbar-start navbar-center" }, h("a", { class: "navbar-item", title: "Previous", onClick: this.handlePreviousClick.bind(this) }), h("div", { class: "navbar-item toolbar-page" }, h("a", { class: "tag" }, (this.page + 1)), h("span", null, "\u00A0"), h("span", null, "of ", this.pageCount, " pages")), h("a", { class: "navbar-item", title: "Next", onClick: this.handleNextClick.bind(this) })), h("div", { class: "navbar-end" }, h("a", { class: "navbar-item", title: "Fullscreen", onClick: this.handleFullscreenClick.bind(this) }, h("span", { class: "text" }, "Fullscreen")), this.alternateFormats && this.alternateFormats.length > 0 &&
            h("div", { class: "navbar-item has-dropdown" }, h("a", { class: "navbar-link", onClick: this.handleDropdownClick.bind(this) }, h("span", { class: "text" }, "Download")), h("div", { class: "navbar-dropdown is-right" }, this.alternateFormats.map((alternateFormat) => {
                return (h("a", { class: "navbar-item", onClick: this.handleAlternateFormatClick.bind(this) }, h("span", { class: "icon" }), h("span", { class: "text" }, alternateFormat.label)));
            })))))));
    }
    get el() { return getElement(this); }
    static get style() { return "\@-webkit-keyframes spinAround{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}\@keyframes spinAround{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.hv-toolbar{padding:0;border-bottom:1px solid #d3d3d3;background-color:#f5f5f5}.hv-toolbar .navbar-center{-ms-flex-positive:1;flex-grow:1;-ms-flex-pack:center;justify-content:center}.hv-toolbar .navbar-item{padding-left:1.25rem;padding-right:1.25rem}.hv-toolbar .navbar-item.has-dropdown .navbar-link{padding-right:2rem}.hv-toolbar .navbar-item.has-dropdown .navbar-link .icon~.text{margin-left:4px}.hv-toolbar .navbar-item.has-dropdown .navbar-link:after{font-size:10px}.hv-toolbar .navbar-item .tag{font-size:1rem;padding:0 .5rem}.hv-toolbar .navbar-item .tag:hover{text-decoration:none;background-color:#e8e8e8}.hv-toolbar .navbar-item svg{height:16px}.hv-toolbar .toolbar-page{padding:0 .75rem}\@media screen and (min-width:1024px){.hv-toolbar .navbar{min-height:3rem}}"; }
};

export { HVToolbar as hv_toolbar };
