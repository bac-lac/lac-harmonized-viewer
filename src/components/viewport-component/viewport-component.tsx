import { Component, Element, h, Prop, State, Host } from '@stencil/core';
import '../../utils/manifest';
import "../../utils/icon-library";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { setPage, setStatus, setDocumentContentType, setLoading, setError } from '../../store/actions/document';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { parseContentType } from '../../utils/utils';
import axios from 'axios';

@Component({
    tag: 'harmonized-viewport',
    styleUrls: [
        'viewport-component.scss',
        '../../../node_modules/animate.css/animate.min.css']
})
export class ViewportComponent {

    @Element() el: HTMLElement

    @Prop({ reflect: true }) navigationEnable: boolean = true
    @Prop({ reflect: true }) navigationLocation: LocationOption = 'left'

    @Prop({ reflect: true }) annotationsEnable: boolean = false

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
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    handleCanvasLoad(tiledImage: any, callback: () => any) {

        if (tiledImage.getFullyLoaded()) {
            setTimeout(callback, 1) // So both paths are asynchronous
        } else {
            tiledImage.addOnceHandler('fully-loaded-change', function () {
                callback() // Calling it this way keeps the arguments consistent (if we passed callback into addOnceHandler it would get an event on this path but not on the setTimeout path above)
            });
        }
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

                {this.renderNavigation('top')}

                <div class="hv-content">

                    {
                        this.status.loading &&
                        <harmonized-spinner />
                    }

                    {this.renderNavigation('left')}

                    <main class="hv-main">

                        <div class="hv-main__content">

                            <button type="button" class="button hv-navigation__prev" onClick={this.handlePreviousClick.bind(this)} disabled={this.status.loading || this.isFirst()}>
                                <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "chevron-left" }).html[0]}></span>
                            </button>

                            <div class={this.status.loading ? 'viewport-content viewport-content--loading' : 'viewport-content'}>
                                {this.renderOpenSeadragon()}
                            </div>

                            <button type="button" class="button hv-navigation__next" onClick={this.handleNextClick.bind(this)} disabled={this.status.loading || this.isLast()}>
                                <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "chevron-right" }).html[0]}></span>
                            </button>

                        </div>

                    </main>

                    {
                        this.annotationsEnable &&
                        <hv-annotations style={{ width: '250px' }} />
                    }

                    {this.renderNavigation('right')}

                </div>

                {this.renderNavigation('bottom')}

            </Host>
        )
    }

    renderNavigation(location: LocationOption) {

        if (this.status.code == 'loading' || this.status.code == 'loaded') {

            if (this.navigationEnable &&
                this.navigationLocation == location) {
                return <hv-navigation
                    class={"navigation navigation-" + this.navigationLocation} />
            }
        }
    }

    renderViewport() {

        if (this.status.code == 'prefetched' || this.status.code == 'loading' || this.status.code == 'loaded') {

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
    }

    renderOpenSeadragon() {
        return <harmonized-openseadragon />
        //return [<harmonized-openseadragon />, <harmonized-pager />]
    }

    renderPDF() {
        return <harmonized-pdf />
    }
}