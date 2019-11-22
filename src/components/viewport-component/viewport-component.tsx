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
import i18next from 'i18next';
import { AppConfig } from '../../app.config';

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

            const response = await axios.get(this.url)

            this.setStatus('prefetched')

            const contentType = parseContentType(response.headers['content-type'])
            if (contentType) {
                this.setDocumentContentType(contentType)
            }
        }
        catch (e) {

            if (e.response.status && e.response.status == 404) {
                this.setError('e-document-notfound', this.url)
            }
            else {
                this.setError(e.name, e.message)
            }
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

        return <Host class="viewport">

            {
                this.status.code == 'loading' &&
                <harmonized-spinner />
            }

            {this.renderNavigation('top')}

            <div class="viewport__content">

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

                        <div class="viewport__content-inner">

                            {this.renderViewport()}
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

        let component = null

        let componentName: string = null
        let contentType: string = null

        const page = this.pages[this.page]
        contentType = page && page.contentType

        if (!contentType) {
            contentType = this.contentType
        }

        // temporary
        contentType = 'video/mp4'

        // Resolve component from content type
        const mappings: ContentTypeMapping[] = AppConfig.contentTypes

        // const customResolvers: HTMLElement[] =
        //     Array.from(this.el.querySelectorAll('harmonized-custom-resolver'))

        // customResolvers.forEach((resolver: HTMLHarmonizedCustomResolverElement) => {

        //     // Existing resolver with the same content type will be overwritten
        //     const existingIndex = mappings.findIndex(i => i.contentType && i.contentType == resolver.contentType)
        //     if (existingIndex !== -1) {
        //         mappings.slice(existingIndex, 1)
        //     }

        //     mappings.push({
        //         contentType: resolver.contentType,
        //         component: 'custom-resolver'
        //     })
        // })


        if (mappings) {
            const resolved = mappings.find(i => i.contentType && i.contentType == contentType)
            componentName = resolved && resolved.component
        }

        if (componentName) {

            switch (componentName.toLowerCase()) {
                case 'openseadragon':
                    component = <harmonized-openseadragon />
                    break
                case 'embed':
                    component = <harmonized-embed />
                    break
                case 'video':
                    component = <harmonized-video url={this.url} />
                    break
                // case 'custom-resolver':
                //     component = this.renderCustomResolver(contentType, this.url)
                //     break
                default:
                    this.setError('e-contenttype-unmapped', contentType)
                    break
            }
        }

        return component
    }

    renderCustomResolver(contentType: string, url: string): HTMLHarmonizedCustomResolverElement {

        if (!contentType || !url) {
            return undefined
        }

        const customResolvers: HTMLHarmonizedCustomResolverElement[] =
            Array.from(document.querySelectorAll('harmonized-custom-resolver'))

        const customResolver = customResolvers.find(i => i.contentType && i.contentType == contentType)
        return customResolver && customResolver.cloneNode(true) as HTMLHarmonizedCustomResolverElement
    }

    // renderOpenSeadragon() {
    //     return <harmonized-openseadragon />
    // }

    // renderPDF() {
    //     return <harmonized-pdf />
    // }
}