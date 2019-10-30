import { Component, h, Element, Event, EventEmitter, Method, Listen, State, Prop } from '@stencil/core';
import { id } from '../../utils/utils';
import { Overlay } from '../../overlay';
import { Store, Unsubscribe } from "@stencil/redux";
import { setDocumentUrl, setDocumentPages, setDocumentTitle, setLoading, setAnnotations, setZoom, setPage, setDocumentAlternateFormats } from "../../store/actions/document";
import { MyAppState } from '../../interfaces';
import openseadragon from 'openseadragon';
import { Md5 } from 'ts-md5/dist/md5';
import { LocalStorage } from '../../services/storage-service';

@Component({
    tag: 'harmonized-viewer-openseadragon',
    styleUrl: 'openseadragon-component.scss'
})
export class OpenSeadragonComponent {

    @Element() el: HTMLElement

    @Event() overlayClick: EventEmitter

    //private this.viewer: any
    private overlays: Overlay[] = []
    private storage: LocalStorage
    private viewer: any

    setLoading: typeof setLoading
    setDocumentUrl: typeof setDocumentUrl
    setDocumentPages: typeof setDocumentPages
    setDocumentTitle: typeof setDocumentTitle
    setDocumentAlternateFormats: typeof setDocumentAlternateFormats
    setAnnotations: typeof setAnnotations
    setPage: typeof setPage
    setZoom: typeof setZoom

    storeUnsubscribe: Unsubscribe

    @State() url: MyAppState["document"]["url"]
    @State() page: MyAppState["document"]["page"]
    @State() pages: MyAppState["document"]["pages"]
    @State() zoom: MyAppState["document"]["zoom"]

    private pageOld: number
    private zoomOld: number

    @Prop({ context: "store" }) store: Store

    constructor() {
        this.storage = new LocalStorage()
    }

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setLoading, setDocumentUrl, setDocumentPages, setDocumentTitle, setDocumentAlternateFormats, setAnnotations, setPage, setZoom })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { page: page, pages: pages, url: url, zoom: zoom }
            } = state
            return {
                page: page,
                pages: pages,
                url: url,
                zoom: zoom
            }
        })
    }

    componentDidRender() {

        const pageChanged = (this.page !== this.pageOld)
        const zoomChanged = (this.zoom && this.zoom.zoom !== this.zoomOld)

        if (this.viewer) {

            if (pageChanged) {
                this.viewer.goToPage(this.page)
            }

            if (zoomChanged) {
                this.viewer.viewport.zoomTo(this.zoom.zoom)
            }
        }
        else if (this.url) {
            this.load(this.url)
        }

        // Update duplicate state properties in order
        // to detect the next value change
        this.pageOld = this.page
        this.zoomOld = this.zoom && this.zoom.zoom
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    @Method()
    async getOverlays(): Promise<Overlay[]> {
        return Promise.resolve(this.overlays)
    }

    @Listen('overlayClick')
    handleOverlayClick(ev: MouseEvent) {
        console.log('overlay click')
    }

    load(url: string) {

        if (!url) {
            return undefined
        }

        this.setLoading(true)

        if (this.viewer) {
            this.viewer.destroy()
            this.viewer = null
        }

        this.overlays.push({
            x: 50,
            y: 80,
            width: 500,
            height: 500,
            text: "test overlay"
        })

        //manifesto.loadManifest(url)
        fetch(url, {
            method: 'GET',
            mode: 'cors'
        })
            .then((response: Response) => {

                response.json().then((json) => {

                    const manifest = manifesto.create(json) as Manifesto.IManifest

                    this.setDocumentTitle(manifest.getDefaultLabel())

                    // const tileSources = manifest.getSequences()[0].getCanvases().map((canvas) => {
                    //     const images = canvas.getImages()
                    //     const resource = images[0].getResource()
                    //     //var json = '{"@context":"http://iiif.io/api/image/2/context.json","@id":"https://libimages1.princeton.edu/loris/pudl0001%2F4609321%2Fs42%2F00000004.jp2","height":7200,"width":5434,"profile":["http://iiif.io/api/image/2/level2.json"],"protocol":"http://iiif.io/api/image","tiles":[{"scaleFactors":[1,2,4,8,16,32],"width":1024}]}';
                    //     //return JSON.parse(json);
                    //     return resource.getServices()[0].id + '/info.json'
                    // })

                    const pages = manifest.getSequences()[0].getCanvases()
                        .flatMap((canvas) => canvas.getImages().map((image) => {
                            const resource = image.getResource()
                            if (resource) {
                                const services = resource.getServices()
                                if (services) {
                                    const id = services[0].id
                                    return {
                                        id: canvas.id,
                                        label: canvas.getDefaultLabel(),
                                        image: id,
                                        thumbnail: id + '/full/90,/0/default.jpg'
                                    }
                                }
                            }
                        }))

                    this.setDocumentPages(pages)

                    // Find the start canvas 
                    let startPageIndex = 0
                    const startCanvas = manifest.getSequenceByIndex(0).getStartCanvas()
                    if (startCanvas) {
                        const startPage = this.pages.find((page) => page.id == startCanvas)
                        if (startPage) {
                            startPageIndex = this.pages.indexOf(startPage)
                        }
                    }

                    const annotations = manifest.getMetadata().map((annotation) => {

                        const label = annotation.getLabel()

                        const hash = new Md5()
                        const id = hash.appendStr(label || '').end().toString()

                        const state = this.storage.get('annotation-' + id)
                        const collapsed = (state) ? JSON.parse(state) as boolean : false

                        return {
                            id: id,
                            label: annotation.getLabel(),
                            content: annotation.getValue(),
                            collapsed: collapsed
                        }
                    })

                    this.setAnnotations(annotations)

                    // Alternate formats
                    const alternateFormats = manifest.getSequenceByIndex(0).getRenderings().map((rendering) => {

                        const format = rendering.getFormat()

                        return {
                            contentType: format.value,
                            label: rendering.getDefaultLabel(),
                            url: rendering.id
                        }
                    })

                    this.setDocumentAlternateFormats(alternateFormats)

                    this.viewer = openseadragon({
                        element: this.el.querySelector(".openseadragon"),
                        prefixUrl: "/dist/vendors/openseadragon/images/",
                        animationTime: 0.25,
                        springStiffness: 10.0,
                        showNavigator: true,
                        navigatorPosition: "BOTTOM_RIGHT",
                        showNavigationControl: false,
                        showSequenceControl: false,
                        sequenceMode: true,
                        tileSources: pages.map((page) => ({
                            type: 'image',
                            url: page.image
                        })),
                        initialPage: startPageIndex
                    })

                    this.viewer.addHandler('open', () => {

                        const page = this.viewer.currentPage()
                        this.setPage(page)

                        this.viewer.viewport.zoomTo(this.viewer.viewport.getMinZoom(), null, true)
                        this.viewer.viewport.applyConstraints()

                        this.setLoading(false)
                    })

                    this.viewer.addHandler('zoom', () => {

                        const minZoom = this.viewer.viewport.getMinZoom()
                        const maxZoom = this.viewer.viewport.getMaxZoom()

                        //const value = (event.zoom - minZoom) * 100 / (maxZoom - minZoom)

                        // this.setZoom({
                        //     min: minZoom,
                        //     max: maxZoom,
                        //     zoom: event.zoom//this.viewer.viewport.getZoom(true)
                        // })
                    })
                })
            })
    }



    drawOverlays() {

        this.overlays.forEach((overlay) => {

            const elementId = "hv-overlay-" + id();

            const element = document.createElement("a");
            element.id = elementId;
            element.href = "javascript:;";
            element.classList.add("hv-overlay", "bx--tooltip__trigger", "bx--tooltip--a11y", "bx--tooltip--bottom")

            const tooltip = document.createElement("span")
            tooltip.classList.add("bx--assistive-text")
            tooltip.innerHTML = overlay.text
            element.appendChild(tooltip)

            const bounds = this.viewer.viewport.imageToViewportRectangle(overlay.x, overlay.y, overlay.width, overlay.height);

            this.viewer.addOverlay(element, bounds, "TOP_LEFT");

            // Required in order to prevent click propagation to OpenSeadragon
            overlay.mouseTracker = new openseadragon.MouseTracker({
                element: element,
                clickHandler: () => this.overlayClick.emit(element)
            })
        })
    }

    render() {
        return <div class="openseadragon"></div>
    }
}
