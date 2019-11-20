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
    @State() viewport: MyAppState["document"]["viewport"]

    @Prop({ context: "store" }) store: Store

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setLoading, setError, setPage, setStatus, setDocumentContentType })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { contentType: contentType, document: document, status: status, page: page, pages: pages, pageCount: pageCount, url: url, viewport: viewport }
            } = state
            return {
                contentType: contentType,
                document: document,
                status: status,
                page: page,
                pages: pages,
                pageCount: pageCount,
                url: url,
                viewport: viewport
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

            if (e.response && e.response.status === 404) {
                this.setStatus('empty')
            }

            // To be investigated:
            // Firefox throws a network exception (cors) even when cors is configured
            // Had to comment out the line below
            //this.setError(err.name, err.message)
        }
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

        if (this.status.code == 'empty') {
            return undefined
        }

        return <Host>

            {
                this.status.code == 'loading' &&
                <harmonized-spinner />
            }

            {this.renderNavigation('top')}

            <div class="hv-content">

                {
                    (this.viewport.navigationPlacement == 'left') && (
                        <harmonized-content
                            width={250}
                            placement="left"
                            showNavigation={this.viewport.navigationEnable}
                            showMetadata={false} />
                    )
                }

                <main class="hv-main mdc-drawer-app-content">
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
                            {this.renderLabel()}
                            {this.viewport.pagingEnable && <harmonized-pager />}

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
                    width={250}
                    placement="right"
                    showNavigation={false}
                    showMetadata={true} />

                <slot name="right" />

            </div>

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

        if (this.viewport.navigationPlacement == placement) {
            const width: number = (placement == 'left' || placement == 'right') && 300
            return <harmonized-content placement={placement} width={width} />
        }
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