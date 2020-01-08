import { Component, h, Element, Event, EventEmitter, Method, Listen, State, Prop, Watch, Host } from '@stencil/core';
import { Store, Unsubscribe } from "@stencil/redux";
import openseadragon from 'openseadragon';
import { clearOverlays } from "../../store/actions/document";
import { viewItem } from '../../store/actions/viewport';

import iconPlus from '../../assets/material-design-icons/add-24px.svg'
import iconMinus from '../../assets/material-design-icons/remove-24px.svg'
import iconRefresh from '../../assets/material-design-icons/refresh-24px.svg'
import iconChevronLeft from '../../assets/material-design-icons/ic_chevron_left_48px.svg'
import iconChevronRight from '../../assets/material-design-icons/ic_chevron_right_48px.svg'
import { homedir } from 'os';

@Component({
    tag: 'harmonized-openseadragon',
    styleUrl: 'openseadragon-component.scss'
})
export class OpenSeadragonComponent {

    @Element() el: HTMLElement
    @Event() overlayClick: EventEmitter

    //private this.viewer: any
    private instance: any
    private mouseTracker: any
    //private context: any

    viewItem: typeof viewItem
    clearOverlays: typeof clearOverlays

    storeUnsubscribe: Unsubscribe

    @State() overlays: MyAppState["document"]["overlays"]

    currentItem: DocumentPage
    @State() currentItemIndex: MyAppState['viewport']['itemIndex']
    @State() items: MyAppState['viewport']['items']

    @Prop({ context: "store" }) store: Store

    @Event() pageLoad: EventEmitter

    /*@Watch('currentItemIndex')
    handlePageChange(newValue: number, oldValue: number) { 
        if (this.instance) {
            this.instance.goToPage(newValue)
        }
    }*/

    /*@Watch('url')
    handleUrlChange(newValue: string, oldValue: string) {
    }*/

    @Watch('zoomRequest')
    handleZoomRequest(newValue: DocumentZoom, oldValue: DocumentZoom) {
        if (this.instance) {
            this.instance.viewport.zoomTo(newValue.value)
        }
    }

    /*async resolve() {
        await this.resolver.init(this.manifest.manifest.id)
        this.create()
    }*/

    componentWillLoad() {
        this.store.mapDispatchToProps(this, {  viewItem, clearOverlays })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                viewport: { itemIndex, items }
            } = state
            return {
                currentItemIndex: itemIndex,
                items
            }
        })
    }

    componentDidLoad() {

        /*const resolver = new IIIFResolver()

        const options = this.options.filter(i => i.component && i.component === 'openseadragon')

        const optionDisableDeepzoom = options.find(i => i.name && i.name === 'disabledeepzoom')
        if (optionDisableDeepzoom) {
            resolver.disableDeepzoom = optionDisableDeepzoom.value as boolean
        }

        this.resolver = resolver

        await this.resolve()*/

        this.currentItem = this.items[this.currentItemIndex];
        this.create();
    }

    componentWillUpdate() {
        this.currentItem = this.items[this.currentItemIndex];
    }

    componentDidUpdate() {
        this.create();
    }

    // componentDidRender() {

    //     // const pageChanged = (this.page !== this.previousState['page'])
    //     // const zoomChanged = (this.zoomRequest && this.zoomRequest.value !== this.previousState['zoom'])

    //     if (this.viewer) {

    //         //if (pageChanged) {
    //         //this.viewer.goToPage(this.page)
    //         //}

    //         //if (zoomChanged) {
    //         //this.viewer.viewport.zoomTo(this.zoomRequest.value)
    //         //}
    //     }
    //     else if (this.url) {
    //         //this.load(this.url)
    //     }

    //     // Update duplicate state properties in order
    //     // to detect the next value change
    //     // this.previousState['page'] = this.page
    //     // this.previousState['zoom'] = this.zoomRequest && this.zoomRequest.value
    // }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidRender() {
        this.drawOverlays()
    }

    @Method()
    async openseadragon() {
        return this.instance
    }

    @Method()
    async getOverlays() {
        return this.overlays
    }

    @Listen('overlayClick')
    handleOverlayClick(ev: MouseEvent) {
        console.log('overlay click')
    }

    handleCanvasLoad(tiledImage: any, callback: () => any) {

        if (tiledImage.getFullyLoaded()) {
            setTimeout(callback, 1) // So both paths are asynchronous
        } else {
            tiledImage.addOnceHandler('fully-loaded-change', function () {
                callback() // Calling it this way keeps the arguments consistent (if we passed callback into addOnceHandler it would get an event on this path but not on the setTimeout path above)
            })
        }
    }

    handleZoomIn() {
        if (this.instance && this.instance.viewport) {
            this.instance.viewport.zoomBy(this.instance.zoomPerClick / 1.0);
            this.instance.viewport.applyConstraints();
        }
    }

    handleZoomOut() {
        if (this.instance && this.instance.viewport) {
            this.instance.viewport.zoomBy(1.0 / this.instance.zoomPerClick);
            this.instance.viewport.applyConstraints();
        }
    }

    handleRefreshClick() {
        if (this.instance && this.instance.viewport) {
            this.instance.viewport.goHome();
        }
    }

    handlePreviousClick() {
        this.viewItem(this.currentItemIndex - 1)
    }

    handleNextClick() {
        this.viewItem(this.currentItemIndex + 1)
    }

    create() {
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }

        if (!this.currentItem)
            return;

        this.instance = openseadragon({
            element: this.el.querySelector(".openseadragon"),
            prefixUrl: "/dist/vendors/openseadragon/images/",
            animationTime: 0.1,
            springStiffness: 10.0,
            showNavigator: true,
            navigatorPosition: "BOTTOM_RIGHT",
            showNavigationControl: false,
            showSequenceControl: false,
            sequenceMode: true,
            maxZoomPixelRatio: 300,
            tileSources: this.currentItem.tileSources,
            initialPage: this.currentItemIndex
        })

        this.instance.addHandler('open', () => {

            this.clearOverlays()

            this.instance.viewport.zoomTo(this.instance.viewport.getMinZoom(), null, true)
            this.instance.viewport.applyConstraints()

            //this.setStatus('loaded')
            // TODO check if index or pos
            this.pageLoad.emit(this.currentItemIndex)
        })

        this.instance.addHandler('page', (page: number) => {

            //this.setStatus('loading')
        })

        this.instance.addHandler('tile-loaded', (image: any) => {

        })

        this.instance.addHandler('zoom', (ev: any) => {

            /*if (isNaN(ev.zoom)) {
                return undefined
            }

            const value = Number(ev.zoom)

            const min = this.instance.viewport.getMinZoom()
            const max = this.instance.viewport.getMaxZoom()

            const range = (max - min)
            let ratio = (range == 0) ? 0 : (value - min) / (max - min)*/
            // if (this.context) {
            //     this.context.shadowBlur = Math.round(ratio * 20 + 20)
            // }

            /*this.setZoom({
                min: min,
                max: max,
                ratio: ratio,
                value: ev.zoom
            })*/
        })
    }

    // clearOverlays() {

    //     this.clearOverlays()

    //     // const elements = Array.from(this.el.querySelectorAll('.overlay'))
    //     // elements.forEach((elem) => elem.parentElement.removeChild(elem))

    // }

    drawOverlays() {

        // if (!this.instance) {
        //     this.create()
        // }

        if (this.overlays) {
            this.overlays.forEach((overlay) => {

                const element = this.el.querySelector(`#overlay-${overlay.id}`) as HTMLElement
                if (element) {

                    const bounds = this.instance.viewport.imageToViewportRectangle(overlay.x, overlay.y, overlay.width, overlay.height)
                    this.instance.addOverlay(element, bounds, 'TOP_LEFT')

                    // tippy(element, {
                    //     appendTo: 'parent',
                    //     theme: 'harmonized-light',
                    //     placement: 'bottom',
                    //     animation: 'shift-toward',
                    //     arrow: false,
                    //     sticky: true,
                    //     plugins: [sticky],
                    //     content: overlay.
                    // })

                    // Required in order to prevent click propagation to OpenSeadragon
                    new openseadragon.MouseTracker({
                        element: element, clickHandler: () => this.overlayClick.emit(overlay)
                    })
                }
            });
        }
    }

    render() {
        return <Host>
            <div class="button-topbar-group">
                <harmonized-button
                    class="button-topbar"
                    icon={iconPlus}
                    size="sm"
                    title="Zoom in"
                    aria-label="Zoom in"
                    onClick={this.handleZoomIn.bind(this)}
                />
                <harmonized-button
                    class="button-topbar"
                    icon={iconMinus}
                    size="sm"
                    title="Zoom out"
                    aria-label="Zoom out"
                    onClick={this.handleZoomOut.bind(this)}
                />
                <harmonized-button
                    class="button-topbar"
                    icon={iconRefresh}
                    size="sm"
                    title="Refresh zoom"
                    aria-label="Refresh zoom"
                    onClick={this.handleRefreshClick.bind(this)}
                />
            </div>

            <harmonized-button
                class="button-navigation button-navigation--prev"
                icon={iconChevronLeft}
                size="lg"
                title="Go to previous page"
                aria-label="Go to previous page"
                onClick={this.handlePreviousClick.bind(this)}
                disabled={/*this.status.loading ||*/ this.currentItemIndex === 0} />

            <div class="openseadragon-container">
                <div class="openseadragon"></div>
            </div>

            <harmonized-button
                class="button-navigation button-navigation--next"
                icon={iconChevronRight}
                size="lg"
                title="Go to next page"
                aria-label="Go to next page"
                onClick={this.handleNextClick.bind(this)}
                disabled={/*this.status.loading ||*/ this.currentItemIndex + 1 >= this.items.length} />

            <div class="overlays">
                {this.overlays &&
                    this.overlays.map((overlay) =>
                        <harmonized-overlay id={"overlay-" + overlay.id} tabindex="-1">
                            {overlay.id}
                        </harmonized-overlay>)
                }
            </div>
        </Host>
    }
}
