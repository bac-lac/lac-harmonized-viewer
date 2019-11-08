import { Component, h, Element, Prop, State, Host } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { setPage } from '../../store/actions/document';
import { MDCRipple } from '@material/ripple';
import { MDCSlider } from '@material/slider';

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

    @Prop({ context: "store" }) store: Store

    private slider: MDCSlider

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setPage })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { loading: loading, page: page, pageCount: pageCount }
            } = state
            return {
                loading: loading,
                page: page,
                pageCount: pageCount
            }
        })
    }

    componentDidLoad() {

        const slider = MDCSlider.attachTo(this.el.querySelector('.mdc-slider'))
        slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`))
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidRender() {



        // const foos = [].map.call(this.el.querySelectorAll('.mdc-icon-button'), function (el) {
        //     const foo = new MDCRipple(el)
        //     foo.unbounded = true
        //     return foo
        // });

        //(window as any).mdc.autoInit()
    }

    isFirst() {
        return (this.page <= 0)
    }

    isLast() {
        return (this.page >= (this.pageCount - 1))
    }

    handleFirstPageClick() {
        this.setPage(0)
    }

    handlePreviousPageClick() {
        this.setPage(this.page - 1)
    }

    handleNextPageClick() {
        this.setPage(this.page + 1)
    }

    handleLastPageClick() {
        this.setPage(this.pageCount - 1)
    }

    render() {

        return (
            <Host role="toolbar" aria-label="Toolbar navigation">

                <button type="button" class="mdc-icon-button mdc-button--raised" title="Go to first page" onClick={this.handleFirstPageClick.bind(this)} disabled={this.isFirst()}>
                    {/* <span class="mdc-icon-button__icon" innerHTML={icon({ prefix: 'fas', iconName: 'angle-double-left' }).html[0]}></span> */}
                </button>

                <button type="button" class="mdc-icon-button mdc-button--raised" title="Go to previous page" onClick={this.handlePreviousPageClick.bind(this)} disabled={this.isFirst()}>
                    {/* <span class="mdc-icon-button__icon" innerHTML={icon({ prefix: 'fas', iconName: 'angle-left' }).html[0]}></span> */}
                </button>

                <div class="slider-control">

                    <div class="mdc-slider" tabindex="0" role="slider" data-step="1"
                        aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
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

                    {/* <a class="tag">{(this.page + 1)}</a>
                        <span>&nbsp;</span>
                        <span>of {this.pageCount} pages</span> */}
                </div>

                <button type="button" class="mdc-icon-button mdc-button--raised" title="Go to next page" onClick={this.handleNextPageClick.bind(this)} disabled={this.isLast()}>
                    {/* <span class="mdc-icon-button__icon" innerHTML={icon({ prefix: 'fas', iconName: 'angle-right' }).html[0]}></span> */}
                </button>

                <button type="button" class="mdc-icon-button mdc-button--raised" title="Go to last page" onClick={this.handleLastPageClick.bind(this)} disabled={this.isLast()}>
                    {/* <span class="mdc-icon-button__icon" innerHTML={icon({ prefix: 'fas', iconName: 'angle-double-right' }).html[0]}></span> */}
                </button>

            </Host>
        )
    }
}
