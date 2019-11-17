import { Component, Element, h, Prop, State, Host } from '@stencil/core';
import '../../utils/manifest';
import { Unsubscribe, Store } from '@stencil/redux';
import { parseContentType } from '../../utils/utils';
import axios from 'axios';
import iconChevronLeft from '../../assets/material-design-icons/ic_chevron_left_48px.svg'
import iconChevronRight from '../../assets/material-design-icons/ic_chevron_right_48px.svg'
import iconInfo from '../../assets/material-icons/ic_info_24px.svg'
import { setDocumentContentType, setStatus, setPage, setLoading, setError } from '../../store/actions/document';
import { label } from '../../services/i18n-service';

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
    @State() document: MyAppState["document"]["document"]
    @State() status: MyAppState["document"]["status"]
    @State() page: MyAppState["document"]["page"]
    @State() pages: MyAppState["document"]["pages"]
    @State() pageCount: MyAppState["document"]["pageCount"]
    @State() url: MyAppState["document"]["url"]

    @Prop({ context: "store" }) store: Store

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setLoading, setError, setPage, setStatus, setDocumentContentType })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { contentType: contentType, document: document, status: status, page: page, pages: pages, pageCount: pageCount, url: url }
            } = state
            return {
                contentType: contentType,
                document: document,
                status: status,
                page: page,
                pages: pages,
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
        //this.setContentMargins()
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

        return <Host>

            {
                this.status.code == 'loading' &&
                <harmonized-spinner />
            }

            {this.renderNavigation('top')}

            <div class="hv-content">

                <harmonized-content
                    width={250}
                    placement="left"
                    showNavigation={true}
                    showMetadata={false} />

                <main class="hv-main mdc-drawer-app-content">

                    {
                        this.status.error &&
                        <harmonized-message type="error" class="mdc-drawer-app-content">
                            <p>
                                <strong>{this.status.error.code}</strong>
                                <span>&nbsp;&ndash;&nbsp;</span>
                                <span>{this.status.error.message}</span>
                            </p>
                        </harmonized-message>
                    }

                    <div class="hv-main__content">

                        <harmonized-button
                            class="button-navigation button-navigation--prev"
                            icon={iconChevronLeft}
                            size="lg"
                            raised={true}
                            title="Go to previous page"
                            aria-label="Go to previous page"
                            onClick={this.handlePreviousClick.bind(this)}
                            disabled={this.status.loading || this.isFirst()} />

                        <div class="viewport-content">

                            {this.renderOpenSeadragon()}

                            {this.renderPaging()}
                            {this.renderLabel()}

                            <harmonized-pager />

                        </div>

                        <harmonized-button
                            class="button-navigation button-navigation--next"
                            icon={iconChevronRight}
                            size="lg"
                            raised={true}
                            title="Go to next page"
                            aria-label="Go to next page"
                            onClick={this.handleNextClick.bind(this)}
                            disabled={this.status.loading || this.isLast()} />

                    </div>

                </main>

                <harmonized-content
                    width={300}
                    placement="right"
                    showNavigation={false}
                    showMetadata={true} />

                {this.renderNavigation('right')}


            </div>

            {this.renderNavigation('bottom')}

        </Host>
    }

    setContentMargins() {

        const content = this.el.querySelector('.mdc-drawer-app-content') as HTMLElement
        if (content) {

            const previousSibling = this.findPreviousSibling(content, 'harmonized-content')
            const nextSibling = this.findNextSibling(content, 'harmonized-content')

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
            this.navigationPlacement == placement) {

            if (placement == 'left' || placement == 'right') {

                return <harmonized-content width={300} placement={placement} />
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

    renderPaging() {

        return <div class="paging__label">
            <span class="paging__label-spacer--right">
                Page
                                </span>
            <span class="paging__label-value">
                {(this.page + 1)}
            </span>
            <span class="paging__label-spacer--left paging__label-spacer--right">
                of
                                </span>
            <span class="paging__label-value">
                {this.pageCount}
            </span>
        </div>
    }

    renderLabel() {

        if (this.pages && this.pages[this.page]) {

            return <div class="paging__label">
                {label(this.pages[this.page].label)}
            </div>
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
        return <harmonized-openseadragon />
    }

    renderPDF() {
        return <harmonized-pdf />
    }
}