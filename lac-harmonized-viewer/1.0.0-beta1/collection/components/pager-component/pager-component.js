import { h, Host } from "@stencil/core";
import { setPage } from '../../store/actions/document';
import { MDCSlider } from '@material/slider';
import iconFirst from '../../assets/material-icons/ic_page_first_24px.svg';
import iconPrevious from '../../assets/material-icons/ic_page_previous_24px.svg';
import iconNext from '../../assets/material-icons/ic_page_next_24px.svg';
import iconLast from '../../assets/material-icons/ic_page_last_24px.svg';
import { isNullOrUndefined, isNumber } from 'util';
export class PagerComponent {
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { setPage });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { loading: loading, page: page, pageCount: pageCount, status: status } } = state;
            return {
                loading: loading,
                page: page,
                pageCount: pageCount,
                status: status
            };
        });
    }
    componentDidLoad() {
        this.slider = this.createSlider();
    }
    componentDidUnload() {
        this.slider.destroy();
        this.slider = null;
        this.storeUnsubscribe();
    }
    componentDidRender() {
        //console.log(this.slider && this.slider.value)
        //this.updateSlider()
    }
    handleSliderInput() {
        this.marker = this.slider.value;
    }
    handleSliderChange() {
        this.marker = null;
        this.setPage(this.slider.value ? this.slider.value : 0);
    }
    isFirst() {
        return (this.page <= 0);
    }
    isLast() {
        return (this.page >= (this.pageCount - 1));
    }
    handleFirstClick() {
        this.setPage(0);
    }
    handlePreviousClick() {
        this.setPage(this.page - 1);
    }
    handleNextClick() {
        this.setPage(this.page + 1);
    }
    handleLastClick() {
        this.setPage(this.pageCount - 1);
    }
    createSlider() {
        if (this.slider) {
            this.slider.destroy();
            this.slider = null;
        }
        this.slider = new MDCSlider(this.el.querySelector('.mdc-slider'));
        this.slider.step = 1;
        this.slider.min = 0;
        this.slider.max = 1;
        this.slider.value = 0;
        this.slider.listen('MDCSlider:input', () => {
            this.handleSliderInput();
        });
        this.slider.listen('MDCSlider:change', () => {
            this.handleSliderChange();
        });
        this.updateSlider();
        return this.slider;
    }
    updateSlider() {
        if (!this.slider) {
            return undefined;
        }
        const max = (this.pageCount ? (this.pageCount - 1) : 1);
        if (this.slider.max !== max) {
            this.slider.max = max;
        }
        this.slider.disabled = this.status.loading;
        this.slider.value = (isNumber(this.page) ? this.page : 0);
    }
    render() {
        return (h(Host, { role: "toolbar", "aria-label": "Toolbar navigation" },
            h("div", { class: "pager__text" },
                h("span", null, "Page"),
                h("span", { class: "mdc-chip" },
                    h("span", { class: "mdc-chip__text" }, isNullOrUndefined(this.marker) ? (this.page + 1) : (this.marker + 1))),
                h("span", null,
                    "of ",
                    this.pageCount,
                    " pages")),
            h("div", { class: "pager__controls" },
                h("div", { class: "button-pager" },
                    h("button", { type: "button", "aria-label": "Go to first page", onClick: this.handleFirstClick.bind(this), disabled: this.status.loading || this.isFirst() },
                        h("div", { class: "mdc-button__ripple" }),
                        h("div", { class: "mdc-button__icon", innerHTML: iconFirst }),
                        h("div", { class: "mdc-button__touch" }))),
                h("div", { class: "button-pager" },
                    h("button", { type: "button", "aria-label": "Go to previous page", onClick: this.handlePreviousClick.bind(this), disabled: this.status.loading || this.isFirst() },
                        h("div", { class: "mdc-button__ripple" }),
                        h("div", { class: "mdc-button__icon", innerHTML: iconPrevious }),
                        h("div", { class: "mdc-button__touch" }))),
                h("div", { class: "slider-control" },
                    h("div", { class: "mdc-slider", role: "slider", tabindex: "0", "aria-label": "Select Value" },
                        h("div", { class: "mdc-slider__track-container" },
                            h("div", { class: "mdc-slider__track" })),
                        h("div", { class: "mdc-slider__thumb-container" },
                            h("svg", { class: "mdc-slider__thumb", width: "21", height: "21" },
                                h("circle", { cx: "10.5", cy: "10.5", r: "7.875" })),
                            h("div", { class: "mdc-slider__focus-ring" })))),
                h("div", { class: "button-pager" },
                    h("button", { type: "button", "aria-label": "Go to next page", onClick: this.handleNextClick.bind(this), disabled: this.status.loading || this.isLast() },
                        h("div", { class: "mdc-button__ripple" }),
                        h("div", { class: "mdc-button__icon", innerHTML: iconNext }),
                        h("div", { class: "mdc-button__touch" }))),
                h("div", { class: "button-pager" },
                    h("button", { type: "button", "aria-label": "Go to last page", onClick: this.handleLastClick.bind(this), disabled: this.status.loading || this.isLast() },
                        h("div", { class: "mdc-button__ripple" }),
                        h("div", { class: "mdc-button__icon", innerHTML: iconLast }),
                        h("div", { class: "mdc-button__touch" }))))));
    }
    static get is() { return "harmonized-pager"; }
    static get originalStyleUrls() { return {
        "$": ["pager-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["pager-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "loading": {},
        "page": {},
        "pageCount": {},
        "status": {},
        "marker": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "page",
            "methodName": "updateSlider"
        }, {
            "propName": "pageCount",
            "methodName": "updateSlider"
        }, {
            "propName": "status",
            "methodName": "updateSlider"
        }]; }
}
