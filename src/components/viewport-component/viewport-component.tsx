import { Component, Element, h, Prop, State, Host } from '@stencil/core';
import '../../utils/manifest';
import "../../utils/icon-library";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { setPage } from '../../store/actions/document';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';

@Component({
    tag: 'harmonized-viewport',
    styleUrls: [
        'viewport-component.scss',
        '../../../node_modules/animate.css/animate.min.css']
})
export class ViewportComponent {

    @Element() el: HTMLElement

    setPage: typeof setPage
    storeUnsubscribe: Unsubscribe

    @State() contentType: MyAppState["document"]["contentType"]
    @State() loading: MyAppState["document"]["loading"]
    @State() page: MyAppState["document"]["page"]
    @State() pageCount: MyAppState["document"]["pageCount"]
    @State() url: MyAppState["document"]["url"]

    @Prop({ context: "store" }) store: Store

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setPage })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { loading: loading, page: page, pageCount: pageCount, url: url }
            } = state
            return {
                loading: loading,
                page: page,
                pageCount: pageCount,
                url: url
            }
        })
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    private handleCanvasLoad(tiledImage: any, callback: () => any) {

        if (tiledImage.getFullyLoaded()) {
            setTimeout(callback, 1); // So both paths are asynchronous
        } else {
            tiledImage.addOnceHandler('fully-loaded-change', function () {
                callback(); // Calling it this way keeps the arguments consistent (if we passed callback into addOnceHandler it would get an event on this path but not on the setTimeout path above)
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

                <button type="button" class="button hv-navigation__prev" onClick={this.handlePreviousClick.bind(this)} disabled={this.loading || this.isFirst()}>
                    <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "chevron-left" }).html[0]}></span>
                </button>

                <div class={this.loading ? 'viewport-content viewport-content--loading' : 'viewport-content'}>
                    <harmonized-viewer-openseadragon />
                </div>

                <button type="button" class="button hv-navigation__next" onClick={this.handleNextClick.bind(this)} disabled={this.loading || this.isLast()}>
                    <span class="icon" innerHTML={icon({ prefix: "fas", iconName: "chevron-right" }).html[0]}></span>
                </button>

            </Host>
        )
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
        return <harmonized-viewer-openseadragon />
    }

    renderPDF() {
        return <harmonized-pdf />
    }
}