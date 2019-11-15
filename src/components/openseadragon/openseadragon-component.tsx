import { Component, h, Element, Event, EventEmitter, Method, Listen, State, Prop, Watch, Host } from '@stencil/core';
import { Store, Unsubscribe } from "@stencil/redux";
import { setDocumentUrl, setDocumentPages, setDocumentTitle, setAnnotations, setZoom, setPage, setDocumentAlternateFormats, setError, setStatus, clearOverlays } from "../../store/actions/document";
import openseadragon from 'openseadragon';
import { Resolver } from '../../resolvers/resolver';
import { IIIFResolver } from '../../resolvers/iiif-resolver/iiif-resolver';
import { IIIFDocument } from '../../resolvers/iiif-resolver/iiif-document';
import tippy, { sticky } from 'tippy.js';

@Component({
    tag: 'harmonized-openseadragon',
    styleUrl: 'openseadragon-component.scss'
})
export class OpenSeadragonComponent {

    @Element() el: HTMLElement
    @Event() overlayClick: EventEmitter

    private resolver: Resolver

    //private this.viewer: any
    private instance: any
    private mouseTracker: any
    //private context: any

    setError: typeof setError
    setStatus: typeof setStatus
    setDocumentUrl: typeof setDocumentUrl
    setDocumentPages: typeof setDocumentPages
    setDocumentTitle: typeof setDocumentTitle
    setDocumentAlternateFormats: typeof setDocumentAlternateFormats
    setAnnotations: typeof setAnnotations
    setPage: typeof setPage
    setZoom: typeof setZoom
    clearOverlays: typeof clearOverlays

    storeUnsubscribe: Unsubscribe

    @State() document: MyAppState["document"]["document"]
    @State() error: MyAppState["document"]["error"]
    @State() url: MyAppState["document"]["url"]
    @State() options: MyAppState["document"]["options"]
    @State() overlays: MyAppState["document"]["overlays"]
    @State() page: MyAppState["document"]["page"]
    @State() pages: MyAppState["document"]["pages"]
    @State() zoomRequest: MyAppState["document"]["zoomRequest"]

    @Prop({ context: "store" }) store: Store

    @Event() pageLoad: EventEmitter

    @Watch('page')
    handlePageChange(newValue: number, oldValue: number) {
        if (this.instance) {
            this.instance.goToPage(newValue)
        }
    }

    @Watch('url')
    handleUrlChange(newValue: string, oldValue: string) {

    }

    @Watch('zoomRequest')
    handleZoomRequest(newValue: DocumentZoom, oldValue: DocumentZoom) {
        if (this.instance) {
            this.instance.viewport.zoomTo(newValue.value)
        }
    }

    async resolve() {
        await this.resolver.init(this.url)
        this.create()
    }

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setError, setStatus, setDocumentUrl, setDocumentPages, setDocumentTitle, setDocumentAlternateFormats, setAnnotations, setPage, setZoom, clearOverlays })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { document: document, error: error, options: options, overlays: overlays, page: page, pages: pages, url: url, zoomRequest: zoomRequest }
            } = state
            return {
                document: document,
                error: error,
                options: options,
                overlays: overlays,
                page: page,
                pages: pages,
                url: url,
                zoomRequest: zoomRequest
            }
        })
    }

    async componentDidLoad() {

        const resolver = new IIIFResolver()

        const options = this.options.filter(i => i.component && i.component === 'openseadragon')

        const optionIgnoreImageService = options.find(i => i.name && i.name === 'ignoreimageservice')
        if (optionIgnoreImageService) {
            resolver.ignoreImageService = optionIgnoreImageService.value as boolean
        }

        this.resolver = resolver

        await this.resolve()
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

    create() {

        if (this.instance) {
            this.instance.destroy()
            this.instance = null
        }

        const document = this.document as IIIFDocument
        const resolver = this.resolver as IIIFResolver

        //resolver.getTableOfContents()

        this.setDocumentTitle(resolver.title())

        // const tileSources = manifest.getSequences()[0].getCanvases().map((canvas) => {
        //     const images = canvas.getImages()
        //     const resource = images[0].getResource()
        //     //var json = '{"@context":"http://iiif.io/api/image/2/context.json","@id":"https://libimages1.princeton.edu/loris/pudl0001%2F4609321%2Fs42%2F00000004.jp2","height":7200,"width":5434,"profile":["http://iiif.io/api/image/2/level2.json"],"protocol":"http://iiif.io/api/image","tiles":[{"scaleFactors":[1,2,4,8,16,32],"width":1024}]}';
        //     //return JSON.parse(json);
        //     return resource.getServices()[0].id + '/info.json'
        // })

        this.setDocumentPages(resolver.pages())

        // Annotations
        this.setAnnotations(resolver.annotations())

        // Alternate formats
        this.setDocumentAlternateFormats(resolver.alternateFormats())

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
            tileSources: resolver.tileSources(),
            initialPage: resolver.startPageIndex()
        })

        this.instance.addHandler('open', () => {

            this.clearOverlays()

            const page = this.instance.currentPage()
            this.setPage(page)

            this.instance.viewport.zoomTo(this.instance.viewport.getMinZoom(), null, true)
            this.instance.viewport.applyConstraints()

            this.setStatus('loaded')
            this.pageLoad.emit(this.page)
        })

        this.instance.addHandler('page', (page: number) => {

            this.setStatus('loading')
        })

        this.instance.addHandler('tile-loaded', (image: any) => {

        })

        this.instance.addHandler('zoom', (ev: any) => {

            if (isNaN(ev.zoom)) {
                return undefined
            }

            const value = Number(ev.zoom)

            const min = this.instance.viewport.getMinZoom()
            const max = this.instance.viewport.getMaxZoom()

            const range = (max - min)
            let ratio = (range == 0) ? 0 : (value - min) / (max - min)
            // if (this.context) {
            //     this.context.shadowBlur = Math.round(ratio * 20 + 20)
            // }

            this.setZoom({
                min: min,
                max: max,
                ratio: ratio,
                value: ev.zoom
            })
        })
    }

    drawShadow() {

        // const canvas = this.el.querySelector('.openseadragon .openseadragon-canvas > canvas') as HTMLCanvasElement
        // if (canvas) {

        //     this.context = canvas.getContext('2d')
        //     if (this.context) {

        //         this.context.rect(188, 40, 200, 100)
        //         this.context.shadowColor = '#777'
        //         this.context.shadowBlur = 20
        //         this.context.shadowOffsetX = 5
        //         this.context.shadowOffsetY = 5
        //         this.context.fill()
        //         this.context.clearRect(188, 40, 200, 100)

        //         const image = this.openseadragonInstance.world.getItemAt(0)

        //         let bounds = image.getBounds(true)
        //         bounds = this.openseadragonInstance.viewport.viewportToViewerElementRectangle(bounds)
        //     }
        // }

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
        })


    }

    render() {
        return <Host>
            <div class="openseadragon"></div>
            <div class="overlays">
                {
                    this.overlays.map((overlay) =>
                        <harmonized-overlay id={"overlay-" + overlay.id} tabindex="-1">{overlay.id}</harmonized-overlay>)
                }
            </div>
        </Host>
    }
}
