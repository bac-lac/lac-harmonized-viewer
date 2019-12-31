import { Component, Element, h, Prop, State, Host, Listen } from '@stencil/core';
import '../../utils/manifest';
import { Unsubscribe, Store } from '@stencil/redux';
import { setStatus, setPage, setLoading, setError, toggleDrawer } from '../../store/actions/document';
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
    @State() drawerToggle: number = 0

    setLoading: typeof setLoading
    setError: typeof setError
    setPage: typeof setPage
    setStatus: typeof setStatus
    toggleDrawer: typeof toggleDrawer

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

    @State() infoShown: MyAppState["document"]["infoShown"];

    @Prop({ context: "store" }) store: Store

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setLoading, setError, setPage, setStatus, toggleDrawer })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { annotations, contentType, document, language, status, page, pages, pageCount, url, viewport, infoShown }
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
                viewport: viewport,

                infoShown: infoShown
            }
        })
    }

    componentDidLoad() {
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidRender() {
        this.setContentMargins()
    }

    @Listen('viewerDrawerToggle')
    handleDrawerToggle() {
        this.toggleDrawer()
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

        return <Host class="viewport viewport--bottom-nav">

            {
                this.status.code == 'loading' &&
                <harmonized-spinner />
            }

            <div class="viewport__content">

                <main class="hv-main">
                    <div class="hv-main__content">

                        <div class="viewport__content-inner">

                            {this.renderViewport()}
                            <div class="viewport__content-pager">
                                {this.renderLabel()}
                                {this.pages && this.pages.length > 0 && <harmonized-pager />}
                            </div>
                            

                        </div>

                    </div>
                </main>

                {this.infoShown &&
                    <harmonized-drawer headerTitle="Details" placement="right">
                        <harmonized-annotations></harmonized-annotations>
                    </harmonized-drawer>
                }

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

    renderLabel() {
        if (this.pages && this.pages[this.page]) {
            return <div class="paging-label">{t(this.pages[this.page].label)}</div>
        }
    }

    renderViewport() {
        let element = null

        try {
            if (this.contentType) {
                this.component = this.resolveComponent(this.contentType)
                if (!this.component) {
                    this.setError('contenttype-unsupported', { key: 'contentType', value: this.contentType })
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