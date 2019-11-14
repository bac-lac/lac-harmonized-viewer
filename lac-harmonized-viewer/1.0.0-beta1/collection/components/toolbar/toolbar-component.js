import { h } from "@stencil/core";
import { setPage } from '../../store/actions/document';
export class HVToolbar {
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
        return (h("nav", { class: "navbar is-light", role: "toolbar", "aria-label": "Toolbar navigation" },
            h("div", { class: "navbar-menu" },
                h("div", { class: "navbar-start" },
                    h("a", { class: "navbar-item", title: "Home", onClick: this.handleHomeClick.bind(this) }),
                    h("harmonized-zoom-slider", null),
                    h("div", { class: "navbar-item has-dropdown" },
                        h("a", { class: "navbar-link" }, "View as"),
                        h("div", { class: "navbar-dropdown" },
                            h("a", { class: "navbar-item" }, "IIIF"),
                            h("a", { class: "navbar-item" }, "PDF")))),
                h("div", { class: "navbar-start navbar-center" },
                    h("a", { class: "navbar-item", title: "Previous", onClick: this.handlePreviousClick.bind(this) }),
                    h("div", { class: "navbar-item toolbar-page" },
                        h("a", { class: "tag" }, (this.page + 1)),
                        h("span", null, "\u00A0"),
                        h("span", null,
                            "of ",
                            this.pageCount,
                            " pages")),
                    h("a", { class: "navbar-item", title: "Next", onClick: this.handleNextClick.bind(this) })),
                h("div", { class: "navbar-end" },
                    h("a", { class: "navbar-item", title: "Fullscreen", onClick: this.handleFullscreenClick.bind(this) },
                        h("span", { class: "text" }, "Fullscreen")),
                    this.alternateFormats && this.alternateFormats.length > 0 &&
                        h("div", { class: "navbar-item has-dropdown" },
                            h("a", { class: "navbar-link", onClick: this.handleDropdownClick.bind(this) },
                                h("span", { class: "text" }, "Download")),
                            h("div", { class: "navbar-dropdown is-right" }, this.alternateFormats.map((alternateFormat) => {
                                return (h("a", { class: "navbar-item", onClick: this.handleAlternateFormatClick.bind(this) },
                                    h("span", { class: "icon" }),
                                    h("span", { class: "text" }, alternateFormat.label)));
                            })))))));
    }
    static get is() { return "hv-toolbar"; }
    static get originalStyleUrls() { return {
        "$": ["toolbar-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["toolbar-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "loading": {},
        "page": {},
        "pageCount": {},
        "alternateFormats": {}
    }; }
    static get elementRef() { return "el"; }
}
