import { Component, Element, h, Prop, State, Host } from '@stencil/core';
import '../../utils/manifest';
import { Unsubscribe, Store } from '@stencil/redux';
import axios from 'axios';
import iconInfo from '../../assets/material-icons/ic_info_24px.svg'
import { setDocumentContentType, setStatus, setPage, setLoading, setError } from '../../store/actions/document';
import { t } from '../../services/i18n-service';
import { AppConfig } from '../../app.config';
import contentTypeParser from "content-type-parser";

@Component({
    tag: 'harmonized-viewport',
    styleUrl: 'viewport-component.scss'
})
export class ViewportComponent {

    @Element() el: HTMLElement

    @Prop() annotationsEnable: boolean = false

    @State() component: string

    setLoading: typeof setLoading
    setError: typeof setError
    setPage: typeof setPage
    setStatus: typeof setStatus
    setDocumentContentType: typeof setDocumentContentType

    storeUnsubscribe: Unsubscribe

    @State() annotations: MyAppState["document"]["annotations"]
    @State() contentType: MyAppState["document"]["contentType"]
    @State() document: MyAppState["document"]["document"]
    @State() language: MyAppState["document"]["language"]
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
                document: { annotations: annotations, contentType: contentType, document: document, language: language, status: status, page: page, pages: pages, pageCount: pageCount, url: url, viewport: viewport }
            } = state
            return {
                annotations: annotations,
                contentType: contentType,
                document: document,
                language: language,
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

            const parser = contentTypeParser(response.headers['content-type'])
            if (parser) {

                const contentType = `${parser.type}/${parser.subtype}`
                if (contentType) {

                    this.setDocumentContentType(contentType)

                    this.component = this.resolveComponent(contentType)
                    if (!this.component) {
                        this.setError('contenttype-unsupported', { key: 'contentType', value: contentType })
                    }
                }
            }
        }
        catch (e) {

            if (e.response && e.response.status && e.response.status == 404) {
                this.setError('request-failed-notfound', { key: 'url', value: this.url })
            }
            else {
                this.setError('request-failed', { key: 'url', value: this.url })
            }
        }
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidRender() {
        this.setContentMargins()
    }

    resolveComponent(contentType: string): string {

        if (!contentType) {
            return undefined
        }

        if (!AppConfig.contentTypes) {
            return undefined
        }

        const mapping = AppConfig.contentTypes
            .find(i => i.formats && i.formats.includes(contentType))

        if (mapping && mapping.component) {
            return mapping.component.toLowerCase()
        }
        else {
            return null
        }
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
                    this.pages && this.pages.length > 0 && this.viewport.navigationPlacement == 'left' && (
                        <harmonized-drawer
                            placement="left" toolbar={true} visible={true} width={250}>
                            <harmonized-navigation></harmonized-navigation>
                        </harmonized-drawer>
                    )
                }

                <main class="hv-main mdc-drawer-app-content">
                    <div class="hv-main__content">

                        <div class="viewport__content-inner">

                            {this.renderViewport()}
                            {this.renderLabel()}

                            {this.pages && this.pages.length > 0 && <harmonized-pager />}

                        </div>

                    </div>
                </main>

                {
                    this.annotations && this.annotations.length > 0 && (
                        <harmonized-drawer
                            placement="right" toolbar={true} visible={true} width={300}>
                            <harmonized-tabs>
                                <harmonized-tab icon={iconInfo} label={t('details')}>
                                    <harmonized-annotations></harmonized-annotations>
                                </harmonized-tab>
                            </harmonized-tabs>
                        </harmonized-drawer>
                    )
                }

                <slot name="right" />

            </div>

        </Host>
    }

    setContentMargins() {

        const content = this.el.querySelector('.mdc-drawer-app-content') as HTMLElement
        if (content) {

            const previousSibling = this.findPreviousSibling(content, 'harmonized-drawer')
            const nextSibling = this.findNextSibling(content, 'harmonized-drawer')

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

            return <div class="paging-label">
                {t(this.pages[this.page].label)}
            </div>
        }
    }

    renderViewport() {

        let element = null

        switch (this.component) {
            case 'openseadragon':
                element = <harmonized-openseadragon />
                break
            case 'embed':
                element = <harmonized-embed />
                break
            case 'video':
                element = <harmonized-video url={this.url} />
                break
            // case 'custom-resolver':
            //     element = <slot name="custom-resolver" />
            //     break
        }

        return element
    }

    renderCustomResolver(contentType: string, url: string): HTMLHarmonizedCustomResolverElement {

        if (!contentType || !url) {
            return undefined
        }

        const customResolvers: HTMLHarmonizedCustomResolverElement[] =
            Array.from(document.querySelectorAll('harmonized-custom-resolver'))

        const customResolver = customResolvers.find(i => i.contentType && i.contentType == contentType)
        if (customResolver) {
            return <slot name="custom-resolver"></slot>
        }
    }

    // renderOpenSeadragon() {
    //     return <harmonized-openseadragon />
    // }

    // renderPDF() {
    //     return <harmonized-pdf />
    // }
}