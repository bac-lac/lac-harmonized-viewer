import { Component, h, Element, Prop, State, Host, Watch, Listen } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { setPage } from '../../store/actions/document';
//import { MDCRipple } from '@material/ripple';
import { MDCSlider } from '@material/slider';
//import iconFirst from '../../assets/material-icons/ic_page_first_24px.svg'
//import iconPrevious from '../../assets/material-icons/ic_page_previous_24px.svg'
//import iconNext from '../../assets/material-icons/ic_page_next_24px.svg'
//import iconLast from '../../assets/material-icons/ic_page_last_24px.svg'
import { isNullOrUndefined, isNumber } from 'util';
import { t } from '../../services/i18n-service';

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
        this.createSlider()
    }

    componentDidUnload() {
        this.destroySlider()
        this.storeUnsubscribe()
    }

    componentDidRender() {

        // MDCSlider must be resized manually when an MDCDrawer is present on the page
        // https://github.com/material-components/material-components-web/issues/4365

        if (this.slider) {
            this.slider.layout()
        }
    }

    handleSliderInput() {

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

    getSliderElement(): HTMLElement {
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

        this.slider.layout()
    }

    render() {

        const page = isNullOrUndefined(this.marker) ?
            (this.page + 1) : (this.marker + 1)

        return <div role="toolbar" aria-label="Toolbar navigation">

            <div class="paging-status">
                <div innerHTML={t('pager', { page: this.page + 1, pageCount: this.pageCount })}></div>
                {/*<span class="paging-status__spacer--right">
                    Page
                </span>
                <span class="paging-status__value">
                    {page}
                </span>
                <span class="paging-status__spacer--left paging-status__spacer--right">
                    of
                </span>
                <span class="paging-status__value">
                    {this.pageCount}
                </span>*/}
            </div>

            {/*<div class="pager__controls">

                <harmonized-button
                    icon={iconFirst}
                    title="Go to first page"
                    aria-label="Go to first page"
                    onClick={this.handleFirstClick.bind(this)}
                    disabled={this.status.loading || this.isFirst()} />

                <harmonized-button
                    icon={iconPrevious}
                    title="Go to previous page"
                    aria-label="Go to previous page"
                    onClick={this.handlePreviousClick.bind(this)}
                    disabled={this.status.loading || this.isFirst()} />

                <div class="slider-control">
                    <div class="mdc-slider"
                        role="slider"
                        tabindex="0"
                        aria-valuemin={0}
                        aria-valuemax={(this.pageCount ? (this.pageCount - 1) : 1)}
                        aria-valuenow={(isNumber(this.page) ? this.page : 0)}
                        aria-disabled={this.status.loading}
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

                <harmonized-button
                    icon={iconNext}
                    title="Go to next page"
                    aria-label="Go to next page"
                    onClick={this.handleNextClick.bind(this)}
                    disabled={this.status.loading || this.isLast()} />

                <harmonized-button
                    icon={iconLast}
                    title="Go to last page"
                    aria-label="Go to last page"
                    onClick={this.handleLastClick.bind(this)}
                    disabled={this.status.loading || this.isLast()} />

                </div>*/}

        </div>
    }
}
