import { h, Host } from "@stencil/core";
import { t } from '../../services/i18n-service';
// Item number display + Slider (removed for now)
export class PagerComponent {
    //private slider: MDCSlider
    componentWillLoad() {
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { viewport: { itemIndex, items } } = state;
            return {
                currentItemIndex: itemIndex,
                itemCount: items.length
            };
        });
    }
    componentDidLoad() {
        //this.createSlider()
    }
    componentDidUnload() {
        //this.destroySlider()
        this.storeUnsubscribe();
    }
    componentDidRender() {
        // MDCSlider must be resized manually when an MDCDrawer is present on the page
        // https://github.com/material-components/material-components-web/issues/4365
        /*if (this.slider) {
            this.slider.layout()
        }*/
    }
    /*handleSliderInput() {

        if (this.slider) {

            this.marker = this.slider.value

            const element = this.getSliderElement()
            if (element) {
                element.classList.add('mdc-slider--active')
            }
        }
    }

    handleSliderChange() {
        this.marker = null
        if (this.slider) {
            this.setPage(this.slider.value ? this.slider.value : 0)
        }
    }*/
    /*isFirst() {
        return (this.currentItemIndex <= 0)
    }

    isLast() {
        return (this.currentItemIndex >= (this.itemCount - 1))
    }

    handleFirstClick() {
        this.setPage(0)
    }

    handlePreviousClick() {
        this.setPage(this.currentItemIndex - 1)
    }

    handleNextClick() {
        this.setPage(this.currentItemIndex + 1)
    }

    handleLastClick() {
        this.setPage(this.itemCount - 1)
    }*/
    /*getSliderElement(): HTMLElement {
        return this.el.querySelector('.mdc-slider')
    }

    createSlider() {

        this.destroySlider()

        const element = this.getSliderElement()
        if (!element) {
            return undefined
        }

        this.slider = new MDCSlider(element)

        this.slider.step = 1
        this.slider.min = 0
        this.slider.max = 1
        this.slider.value = 0

        this.slider.listen('MDCSlider:input', () => {
            this.handleSliderInput()
        })

        this.slider.listen('MDCSlider:change', () => {
            this.handleSliderChange()
        })

        this.slider.listen('focus', () => {
            const element = this.getSliderElement()
            if (element) {
                element.classList.add('mdc-slider--focus')
            }
        })

        this.updateSlider()
    }

    destroySlider() {
        if (this.slider) {
            this.slider.destroy()
            this.slider = null
        }
    }*/
    /*@Watch('page')
    @Watch('pageCount')
    @Watch('status')
    updateSlider() {

        if (!this.slider) {
            return undefined
        }

        const max = (this.pageCount ? (this.pageCount - 1) : 1)

        if (this.slider.max !== max) {
            this.slider.max = max
        }

        this.slider.disabled = this.status.loading
        this.slider.value = (isNumber(this.page) ? this.page : 0)

        this.slider.layout()
    }*/
    render() {
        /*const page = isNullOrUndefined(this.marker) ?
            (this.page + 1) : (this.marker + 1)*/
        return h("div", { role: "toolbar", "aria-label": "Toolbar navigation" },
            h("div", { class: "paging-status" },
                h("div", { innerHTML: t('pager', { page: this.currentItemIndex + 1, pageCount: this.itemCount }) })));
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
        "currentItemIndex": {},
        "itemCount": {},
        "marker": {}
    }; }
    static get elementRef() { return "el"; }
}
