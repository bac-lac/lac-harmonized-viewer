import { Component, h, Element, Event, EventEmitter, Method, Listen, State, Prop, Watch, Host } from '@stencil/core';
import { Store, Unsubscribe } from "@stencil/redux";
import openseadragon from 'openseadragon';
import { clearOverlays } from "../../store/actions/document";
import { viewItem } from '../../store/actions/viewport';

import { t } from '../../services/i18n-service';

import iconPlus from '../../assets/material-design-icons/add-24px.svg'
import iconMinus from '../../assets/material-design-icons/remove-24px.svg'
import iconRefresh from '../../assets/material-design-icons/refresh-24px.svg'
import iconEnterFullscreen from '../../assets/material-design-icons/ic_fullscreen_24px.svg'
import iconExitFullscreen from '../../assets/material-design-icons/ic_fullscreen_exit_24px.svg'
import iconChevronLeft from '../../assets/material-design-icons/ic_chevron_left_48px.svg'
import iconChevronRight from '../../assets/material-design-icons/ic_chevron_right_48px.svg'
import { selectCurrentItem } from '../../store/selectors/item';

@Component({
    tag: 'harmonized-openseadragon',
    styleUrl: 'openseadragon-component.scss'
})
export class OpenSeadragonComponent {

    @Element() el: HTMLElement
    @Event() overlayClick: EventEmitter

    @Prop() allowPaging: boolean =  true;

    //private this.viewer: any
    private instance: any
    private mouseTracker: any
    //private context: any

    viewItem: typeof viewItem
    clearOverlays: typeof clearOverlays

    storeUnsubscribe: Unsubscribe

    @State() overlays: MyAppState["document"]["overlays"]

    @State() currentItemIndex: MyAppState["viewport"]["itemIndex"]
    @State() numberOfItems: number;
    @State() currentItem: DocumentPage

    @State() isFullscreen: boolean = false;

    @Prop({ context: "store" }) store: Store

    @Event() pageLoad: EventEmitter

    @Listen('keydown', { target: 'parent' })
    handleKeyDown(ev: KeyboardEvent) {
        // If we let the event bubble up, moving the image (key up/down) will change items
        ev.stopPropagation();
    }

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
            return {
                currentItemIndex: state.viewport.itemIndex,
                numberOfItems: state.viewport.items.length,
                currentItem: selectCurrentItem(state)
            }
        });
    }

    componentDidLoad() {
        this.create();
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

    handleFullscreenToggle() {
        if (this.instance) {
            if (!this.isFullscreen) {
                const viewerElement: any = this.el;
                if (viewerElement) {
                    if (viewerElement.requestFullscreen) {
                        viewerElement.requestFullscreen();
                    } else if (viewerElement.msRequestFullscreen) {
                        viewerElement.msRequestFullscreen();
                    } else if (viewerElement.mozRequestFullscreen) {
                        viewerElement.mozRequestFullscreen();
                    } else if (viewerElement.webkitRequestFullscreen) {
                        viewerElement.webkitRequestFullscreen();
                    } else {
                        return;
                    }
                }
            } else {
                const documentElement: any = document;
                if (documentElement.fullscreenElement && documentElement.exitFullscreen) {
                    documentElement.exitFullscreen();
                } else if (documentElement.msFullscreenElement && documentElement.msExitFullscreen) {
                    documentElement.msExitFullscreen();
                } else if (documentElement.mozFullScreenElement && documentElement.mozCancelFullscreen) {
                    documentElement.mozCancelFullscreen();
                } else if (documentElement.webkitFullscreenElement && documentElement.webkitExitFullscreen) {
                    documentElement.webkitExitFullscreen();
                } else {
                    return;
                }
            }
        }
    }

    @Listen('fullscreenchange', { target: 'document' })
    @Listen('MSFullscreenChange', { target: 'document' })
    @Listen('mozfullscreenchange', { target: 'document' })
    @Listen('webkitfullscreenchange', { target: 'document' })
    handleFullscreenExternalToggle() {
        // Possibilities - fullscreenElement is null, our current element or some other element
        const documentElement: any = document;
        // Due to shadowDOM => use viewer element
        const viewerElement: any = document.querySelector('harmonized-viewer');
        // Remove our element from fullscreen if any other element is in fullscreen
        if (documentElement.fullscreenElement === viewerElement ||
            documentElement.msFullscreenElement === this.el || // Doesn't use shadow dom
            documentElement.mozFullScreenElement === viewerElement ||
            documentElement.webkitFullscreenElement === viewerElement) { // ??? 

            // Toggle after comparison
            if (!this.isFullscreen) {
                this.isFullscreen = true;
                return;

            } else {
                // Exit fullscreen - avoids overlaying fullscreens
                if (documentElement.fullscreenElement && documentElement.exitFullscreen) {
                    documentElement.exitFullscreen();
                } else if (documentElement.msFullscreenElement && documentElement.msExitFullscreen) {
                    documentElement.msExitFullscreen();
                } else if (documentElement.mozFullScreenElement && documentElement.mozCancelFullscreen) {
                    documentElement.mozCancelFullscreen();
                } else if (documentElement.webkitFullscreenElement && documentElement.webkitExitFullscreen) {
                    documentElement.webkitExitFullscreen();
                } else {
                    return;
                }

                this.isFullscreen = false;
            }
        } else if (this.isFullscreen) {
            this.isFullscreen = false;
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
            animationTime: 0.1,
            springStiffness: 10.0,
            showNavigator: true,
            navigatorPosition: "TOP_LEFT",
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
                    class="button-topbar circle"
                    style={{'marginBottom': '15px'}}
                    icon={this.isFullscreen ? iconExitFullscreen : iconEnterFullscreen}
                    size="sm"
                    title={this.isFullscreen ? t('exitFullscreen') : t('enterFullscreen')}
                    aria-label={this.isFullscreen  ? t('exitFullscreen') : t('enterFullscreen')}
                    onClick={this.handleFullscreenToggle.bind(this)}
                />

                <harmonized-button
                    class="button-topbar circle"
                    icon={iconPlus}
                    size="sm"
                    title={t('zoomIn')}
                    aria-label={t('zoomIn')}
                    onClick={this.handleZoomIn.bind(this)}
                />
                <harmonized-button
                    class="button-topbar circle"
                    icon={iconMinus}
                    size="sm"
                    title={t('zoomOut')}
                    aria-label={t('zoomOut')}
                    onClick={this.handleZoomOut.bind(this)}
                />
                <harmonized-button
                    class="button-topbar circle"
                    icon={iconRefresh}
                    size="sm"
                    title={t('zoomReset')}
                    aria-label={t('zoomReset')}
                    onClick={this.handleRefreshClick.bind(this)}
                />
            </div>

            {!this.isFullscreen && this.allowPaging && 
                <harmonized-button
                    class="button-navigation button-navigation--prev"
                    icon={iconChevronLeft}
                    size="lg"
                    title={t('goToPrevPage')}
                    aria-label={t('goToPrevPage')}
                    onClick={this.handlePreviousClick.bind(this)}
                    disabled={/*this.status.loading ||*/ this.currentItemIndex === 0}
                />
            }

            <div class="openseadragon-container">
                <div class="openseadragon"></div>
            </div>

            {!this.isFullscreen && this.allowPaging &&
                <harmonized-button
                    class="button-navigation button-navigation--next"
                    icon={iconChevronRight}
                    size="lg"
                    title={t('goToNextPage')}
                    aria-label={t('goToNextPage')}
                    onClick={this.handleNextClick.bind(this)}
                    disabled={/*this.status.loading ||*/ this.currentItemIndex + 1 >= this.numberOfItems}
                />
            }
            

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
