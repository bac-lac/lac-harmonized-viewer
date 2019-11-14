import { Component, h, Element, Prop, State, Host, Watch } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { setPage } from '../../store/actions/document';
import { MDCRipple } from '@material/ripple';
import { MDCSlider } from '@material/slider';
import iconFirst from '../../assets/material-icons/ic_page_first_24px.svg'
import iconPrevious from '../../assets/material-icons/ic_page_previous_24px.svg'
import iconNext from '../../assets/material-icons/ic_page_next_24px.svg'
import iconLast from '../../assets/material-icons/ic_page_last_24px.svg'
import { isNullOrUndefined, isNumber } from 'util';

@Component({
    tag: 'harmonized-pager',
    styleUrls: [
        'pager-component.scss'
    ]
})
export class PagerComponent {

    @Element() el: HTMLElement

    setPage: typeof setPage

    storeUnsubscribe: Unsubscribe

    @State() loading: MyAppState["document"]["loading"]
    @State() page: MyAppState["document"]["page"]
    @State() pageCount: MyAppState["document"]["pageCount"]
    @State() status: MyAppState["document"]["status"]

    @State() marker: number

    @Prop({ context: "store" }) store: Store

    private slider: MDCSlider

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setPage })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { loading: loading, page: page, pageCount: pageCount, status: status }
            } = state
            return {
                loading: loading,
                page: page,
                pageCount: pageCount,
                status: status
            }
        })
    }

    componentDidLoad() {
        this.slider = this.createSlider()
    }

    componentDidUnload() {

        this.slider.destroy()
        this.slider = null

        this.storeUnsubscribe()
    }

    componentDidRender() {
        //console.log(this.slider && this.slider.value)
        //this.updateSlider()

    }

    handleSliderInput() {
        this.marker = this.slider.value
    }

    handleSliderChange() {
        this.marker = null
        this.setPage(this.slider.value ? this.slider.value : 0)
    }

    isFirst() {
        return (this.page <= 0)
    }

    isLast() {
        return (this.page >= (this.pageCount - 1))
    }

    handleFirstClick() {
        this.setPage(0)
    }

    handlePreviousClick() {
        this.setPage(this.page - 1)
    }

    handleNextClick() {
        this.setPage(this.page + 1)
    }

    handleLastClick() {
        this.setPage(this.pageCount - 1)
    }

    createSlider() {

        if (this.slider) {
            this.slider.destroy()
            this.slider = null
        }

        this.slider = new MDCSlider(this.el.querySelector('.mdc-slider'))

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

        this.updateSlider()

        return this.slider
    }

    @Watch('page')
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
    }

    render() {

        return (
            <Host role="toolbar" aria-label="Toolbar navigation">

                <div class="pager__text">
                    <span>Page</span>
                    <span class="mdc-chip">
                        <span class="mdc-chip__text">
                            {isNullOrUndefined(this.marker) ? (this.page + 1) : (this.marker + 1)}
                        </span>
                    </span>
                    <span>of {this.pageCount} pages</span>
                </div>

                <div class="pager__controls">

                    <div class="button-pager">
                        <button
                            type="button"
                            aria-label="Go to first page"
                            onClick={this.handleFirstClick.bind(this)} disabled={this.status.loading || this.isFirst()}>
                            <div class="mdc-button__ripple"></div>
                            <div class="mdc-button__icon" innerHTML={iconFirst}></div>
                            <div class="mdc-button__touch"></div>
                        </button>
                    </div>

                    <div class="button-pager">
                        <button
                            type="button"
                            aria-label="Go to previous page"
                            onClick={this.handlePreviousClick.bind(this)} disabled={this.status.loading || this.isFirst()}>
                            <div class="mdc-button__ripple"></div>
                            <div class="mdc-button__icon" innerHTML={iconPrevious}></div>
                            <div class="mdc-button__touch"></div>
                        </button>
                    </div>

                    <div class="slider-control">

                        <div class="mdc-slider"
                            role="slider"
                            tabindex="0"
                            aria-label="Select Value">
                            <div class="mdc-slider__track-container">
                                <div class="mdc-slider__track"></div>
                            </div>
                            <div class="mdc-slider__thumb-container">
                                <svg class="mdc-slider__thumb" width="21" height="21">
                                    <circle cx="10.5" cy="10.5" r="7.875"></circle>
                                </svg>
                                <div class="mdc-slider__focus-ring"></div>
                            </div>
                        </div>

                    </div>

                    <div class="button-pager">
                        <button
                            type="button"
                            aria-label="Go to next page"
                            onClick={this.handleNextClick.bind(this)} disabled={this.status.loading || this.isLast()}>
                            <div class="mdc-button__ripple"></div>
                            <div class="mdc-button__icon" innerHTML={iconNext}></div>
                            <div class="mdc-button__touch"></div>
                        </button>
                    </div>

                    <div class="button-pager">
                        <button
                            type="button"
                            aria-label="Go to last page"
                            onClick={this.handleLastClick.bind(this)} disabled={this.status.loading || this.isLast()}>
                            <div class="mdc-button__ripple"></div>
                            <div class="mdc-button__icon" innerHTML={iconLast}></div>
                            <div class="mdc-button__touch"></div>
                        </button>
                    </div>

                </div>

            </Host>
        )
    }
}
