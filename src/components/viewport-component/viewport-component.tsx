import { Component, Element, h, Prop, State, Host } from '@stencil/core';
import '../../utils/manifest';
import { setPage, setStatus, setDocumentContentType, setLoading, setError } from '../../store/actions/document';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { parseContentType } from '../../utils/utils';
import axios from 'axios';
import iconChevronLeft from '../../assets/material-design-icons/ic_chevron_left_48px.svg'
import iconChevronRight from '../../assets/material-design-icons/ic_chevron_right_48px.svg'

@Component({
    tag: 'harmonized-viewport',
    styleUrl: 'viewport-component.scss'
})
export class ViewportComponent {

    @Element() el: HTMLElement

    @Prop() navigationEnable: boolean = true
    @Prop() navigationPlacement: PlacementType = 'left'

    @Prop() annotationsEnable: boolean = false

    setLoading: typeof setLoading
    setError: typeof setError
    setPage: typeof setPage
    setStatus: typeof setStatus
    setDocumentContentType: typeof setDocumentContentType

    storeUnsubscribe: Unsubscribe

    @State() contentType: MyAppState["document"]["contentType"]
    @State() status: MyAppState["document"]["status"]
    @State() page: MyAppState["document"]["page"]
    @State() pageCount: MyAppState["document"]["pageCount"]
    @State() url: MyAppState["document"]["url"]

    @Prop({ context: "store" }) store: Store

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setLoading, setError, setPage, setStatus, setDocumentContentType })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { contentType: contentType, status: status, page: page, pageCount: pageCount, url: url }
            } = state
            return {
                contentType: contentType,
                status: status,
                page: page,
                pageCount: pageCount,
                url: url
            }
        })
    }

    async componentDidLoad() {

        try {

            // Pre-fetch document
            // Use response content-type to resolve viewer

            this.setStatus('prefetching')

            const response = await axios.head(this.url)

            this.setStatus('prefetched')

            const contentType = parseContentType(response.headers['content-type'])
            if (contentType) {
                this.setDocumentContentType(contentType)
            }
        }
        catch (e) {
            const err: Error = e
            this.setError(err.name, err.message)
        }

        // const buttons = Array.from(this.el.querySelectorAll('.mdc-icon-button'))
        // buttons.forEach((button) => {
        //     const b = new MDCRipple(button)
        //     b.unbounded = true
        // })
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidRender() {
        this.setContentMargins()
    }

    isFirst() {
        return (this.page <= 0)
    }

    isLast() {
        return (this.page >= (this.pageCount - 1))
    }

    handlePreviousClick() {
        this.setPage(this.page - 1)
    }

    handleNextClick() {
        this.setPage(this.page + 1)
    }

    render() {

        return (
            <Host>

                {
                    this.status.code == 'loading' &&
                    <harmonized-spinner />
                }

                {this.renderNavigation('top')}

                <div class="hv-content">


                    {this.renderNavigation('left')}

                    <main class="hv-main mdc-drawer-app-content">

                        <div class="hv-main__content">

                            <div class="button-navigation button-navigation--prev">
                                <button
                                    type="button"
                                    aria-label="Go to previous page"
                                    onClick={this.handlePreviousClick.bind(this)} disabled={this.status.loading || this.isFirst()}>
                                    <div class="mdc-button__ripple"></div>
                                    <div class="mdc-button__icon" innerHTML={iconChevronLeft}></div>
                                    <div class="mdc-button__touch"></div>
                                </button>
                            </div>

                            <div class={this.status.loading ? 'viewport-content viewport-content--loading' : 'viewport-content'}>
                                {this.renderOpenSeadragon()}
                            </div>

                            <div class="button-navigation button-navigation--next">
                                <button
                                    type="button"
                                    aria-label="Go to next page"
                                    onClick={this.handleNextClick.bind(this)} disabled={this.status.loading || this.isLast()}>
                                    <div class="mdc-button__ripple"></div>
                                    <div class="mdc-button__icon" innerHTML={iconChevronRight}></div>
                                    <div class="mdc-button__touch"></div>
                                </button>
                            </div>

                        </div>

                    </main>

                    {
                        this.annotationsEnable &&
                        <harmonized-drawer placement="right" toolbar={false} visible={true}>
                            <hv-annotations></hv-annotations>
                        </harmonized-drawer>
                    }

                    {this.renderNavigation('right')}


                </div>

                {this.renderNavigation('bottom')}

            </Host>
        )
    }

    setContentMargins() {

        const content = this.el.querySelector('.mdc-drawer-app-content') as HTMLElement
        if (content) {

            const previousSibling = this.findPreviousSibling(content, '.mdc-drawer')
            const nextSibling = this.findNextSibling(content, '.mdc-drawer')

            content.style.marginLeft = `${(previousSibling && previousSibling.clientWidth) || 0}px`
            content.style.marginRight = `${(nextSibling && nextSibling.clientWidth) || 0}px`
        }
    }

    findPreviousSibling(element: Element, selector: string) {

        if (!element || !selector) {
            return undefined
        }

        const match = element.matches(selector)
        if (match) {
            return element
        }
        else {
            return this.findPreviousSibling(element.previousElementSibling, selector)
        }
    }

    findNextSibling(element: Element, selector: string) {

        if (!element || !selector) {
            return undefined
        }

        const match = element.matches(selector)
        if (match) {
            return element
        }
        else {
            return this.findNextSibling(element.nextElementSibling, selector)
        }
    }

    renderNavigation(placement: PlacementType) {

        if (this.navigationEnable &&
            this.navigationPlacement === placement) {

            if (placement == 'left' || placement == 'right') {

                return <harmonized-drawer
                    placement={placement}
                    visible={true}>
                    <harmonized-navigation
                        class={"navigation navigation--" + this.navigationPlacement}
                        placement={placement}>
                    </harmonized-navigation>
                </harmonized-drawer>
            }
            else {

                return <harmonized-navigation
                    class={"navigation navigation--" + this.navigationPlacement}
                    placement={placement}
                    rows={1}>
                </harmonized-navigation>
            }
        }
    }

    renderViewport() {

        let element = null

        switch (this.contentType) {
            case 'application/json':
                element = this.renderOpenSeadragon()
                break
            case 'application/pdf':
                element = this.renderPDF()
                break
        }

        return element
    }

    renderOpenSeadragon() {
        //return <harmonized-openseadragon />
        return [<harmonized-openseadragon />, <harmonized-pager />]
    }

    renderPDF() {
        return <harmonized-pdf />
    }
}