import { Resolver } from "../resolver"
import { IIIFDocument } from "./iiif-document"
import axios from 'axios'
import { t } from "../../services/i18n-service"
import 'manifesto.js';

// Library getProperty function had a bug for falsy values (intentional? as in, no boolean values expected?)
Manifesto.Canvas.prototype.getProperty = function(name: string) : any {
    let prop: any = null;
        
        if (this.__jsonld) {
            prop = this.__jsonld[name];

            // if (!prop) {    FIXED - would go into if-block with falsy values
            if (typeof prop === 'undefined') {
                // property may have a prepended '@'
                prop = this.__jsonld['@' + name];
            }
        }
        
        return prop;
}

export class IIIFResolver extends Resolver {

    thumbnailDefaultFormat: string = 'image/jpeg'
    thumbnailDefaultExtension: string = 'jpg'
    thumbnailHeight: number = 150

    disableDeepzoom: boolean = false

    private language: string
    private manifest: Manifesto.IManifest
    private manifestJson: string
    private currentDate  = new Date()

    constructor(language: string = 'en') {
        super();
        this.language = language;
    }

    async init(url: string, fallbackUrl: string) {
        if (!url) {
            return undefined
        }      

        this.addProgressbar();
        
        url += "?" + this.currentDate.getTime().toString();
        await axios.get(url, { validateStatus: status => status === 200 })
        .then( async (response) => {
            this.manifestJson = response.data as string
            if (this.manifestJson) {
                // Add a parse check here eventually                
                const rawManifest = this.manifestJson['sequences'][0]; 
                const canvasCount = rawManifest['canvases'].length;
                if (canvasCount == 0) {
                    console.log('canvase count :' +  canvasCount);
                    console.log('Will execute fall back call');
                   await this.doFallbackCall(fallbackUrl, url);
                   this.manifest = manifesto.create(this.manifestJson) as Manifesto.IManifest
                }
                else {
                    this.manifest = manifesto.create(this.manifestJson) as Manifesto.IManifest
                    this.disableProgressbar();
                }

            }
        })
        .catch((e) => {         
            console.log('do fallback where there is an error');   
            this.doFallbackCall(fallbackUrl,url);
            this.disableProgressbar();
            throw new Error('manifest-not-found');
        });
        return this;
    }

    disableProgressbar() {
        setTimeout(() => {
            document.getElementById('loadingManifest').remove();
        }, 100);        
    }

    addProgressbar() {
        console.log('add progressbar');
        const viewer = document.getElementsByTagName('lac-harmonized-viewer');
        console.log(viewer[0].parentElement);
        const parentElement = viewer[0].parentElement;
        let progressInfo = document.createElement('div');
        progressInfo.setAttribute('id','loadingManifest');
        progressInfo.setAttribute('class','uccLoader');
        parentElement.appendChild(progressInfo);
    }

    async doFallbackCall(fallbackUrl,url) {
        if (!fallbackUrl) {
            return undefined
        }      
        console.log('executing  doFallBackCall:' + fallbackUrl);

        await axios.get(fallbackUrl, { validateStatus: status => status === 200 })
        .then(async (response) => {
            //Start calling and loading again the manifest
            url += "?" + this.currentDate.getTime().toString();
            console.log('calling manifest after fall back call:' + url);
            await axios.get(url, { 
                validateStatus: status => status === 200 
            })
            .then((res) => {
                console.log('response from the manifest call after doFallback');
                this.manifestJson = res.data as string
                if (this.manifestJson) {
                    // Add a parse check here eventually
                    this.manifest = manifesto.create(this.manifestJson) as Manifesto.IManifest
                }
                this.disableProgressbar();
            })
            .catch((e) => {
                console.log('error: response from the manifest call after doFallback');
                this.disableProgressbar();
                throw new Error('manifest-not-found');
            });
            return this;
        })
        .catch((e) => {
            this.disableProgressbar();
            throw new Error('manifest-not-found');

        });

        return this;
    }

    contentTypes(): string[] {
        return [
            'application/json',
            'application/ld+json'
        ]
    }

    getTitle(): DocumentLabel[] {

        if (!this.manifest) {
            return undefined
        }
        return this.mapLabels(this.manifest.getLabel())
    }

    getDocument(): IIIFDocument {
        return {
            label: this.getTitle(),
            tileSources: this.tileSources()
        }
    }

    getSequence(index: number): Manifesto.ISequence {

        if (this.manifest) {
            return this.manifest.getSequenceByIndex(index)
        }
    }

    getDefaultSequence(): Manifesto.ISequence {
        return this.getSequence(0)
    }
    getPages(customItemProps: string[] = [], metadataDictionary: MetadataMapping[] = []): DocumentPage[] {

        return this.getDefaultSequence().getCanvases()
            .flatMap((canvas) => canvas.getImages().map((image) => {

                const resource = image.getResource()
                if (resource) {

                    const format = resource.getFormat()

                    const item: any = {
                        id: canvas.id,
                        contentType: format && format.value,
                        label: this.mapLabels(canvas.getLabel()),
                        image: resource.id,
                        thumbnail: this.getThumbnailUri(canvas),
                        tileSources: this.resolveTileSource(image),
                        metadata: canvas.getMetadata().map(
                            (lvp: Manifesto.LabelValuePair): DocumentMetadata => {
                                const key = lvp.getLabel();
                                const label: DocumentLabel[] = lvp.label;
                                const value: DocumentLabel[] = lvp.value; 

                                return {
                                    key,
                                    label,
                                    value
                                } 
                            }
                        )
                    };

                    customItemProps.forEach((prop) => {item[prop] = canvas.getProperty(prop)});
                    return item;
                }
            }))
    }

    tileSources(): string[] {

        return this.getDefaultSequence().getCanvases()
            .flatMap((canvas) => canvas.getImages().map((image) => this.resolveTileSource(image)))
    }

    getMetadata(): DocumentMetadata[] {
        return this.manifest.getMetadata().map(
            (lvp: Manifesto.LabelValuePair): DocumentMetadata => {
                const key = lvp.getLabel();
                const label: DocumentLabel[] = lvp.label;
                const value: DocumentLabel[] = lvp.value; 

                return {
                    key,
                    label,
                    value
                } 
            }
        );
    }

    // Avoid
    getAnnotations(): DocumentAnnotation[] {

        if (!this.manifest) {
            return undefined
        }

        // const title: DocumentAnnotation = {
        //     id: null,
        //     name: "Title",
        //     label: [{ locale: "en", value: "Title" }],
        //     content: t(this.getTitle())
        // }

        return this.manifest.getMetadata().map((annotation) => ({
            id: null,
            name: annotation.getLabel(),
            label: this.mapLabels(annotation.label),
            content: annotation.getValue(),
            visible: true
        }))
    }

    getAlternateFormats(): DocumentAlternateFormat[] {

        return this.getDefaultSequence().getRenderings().map((rendering) => {
            const format = rendering.getFormat()

            return {
                contentType: (format ? format.value : null),
                label: this.mapLabels(rendering.getLabel()),
                url: rendering.id
            }
        })
    }

    getStartPageIndex(): number {

        if (this.manifest) {

            const startCanvas = this.getDefaultSequence().getStartCanvas()
            if (startCanvas) {

                const startPage = this.getPages().find((page) => page.id == startCanvas)
                if (startPage) {
                    return this.getPages().indexOf(startPage)
                }
            }
        }

        return 0
    }

    getThumbnailUri(canvas: Manifesto.ICanvas): string {

        if (!canvas) {
            return undefined
        }

        const thumbnail = canvas.getThumbnail()
        if (thumbnail) {
            return thumbnail.id
        }
        else {
            return this.getImageUri(canvas, this.thumbnailHeight)
        }
    }

    getManifest(): Manifesto.IManifest {
        return this.manifest
    }

    getImageUri(canvas: Manifesto.ICanvas, height: number): string {

        if (!canvas) {
            return undefined
        }

        let width: number = null

        const aspectRatio: number = canvas.getWidth() / canvas.getHeight()

        if (aspectRatio) {
            width = Math.floor(height * aspectRatio)
        }

        return canvas.getCanonicalImageUri(width)

        // const infoUri = this.resolveImageServiceUri(resource, true)
        // if (infoUri.indexOf('/') != -1) {

        //     let extension = null

        //     if (infoUri.lastIndexOf('/') != -1) {
        //         const fileName = infoUri.substr(infoUri.lastIndexOf('/') + 1)
        //         if (fileName) {

        //             if (fileName.lastIndexOf('.') != -1) {
        //                 extension = fileName.substr(fileName.lastIndexOf('.') + 1)
        //             }
        //         }
        //     }

        //     if (!extension) {
        //         extension = this.thumbnailDefaultExtension
        //     }

        //     return `${infoUri}/full/${height},/0/default.${extension}`
        // }
    }

    resolveImageServiceUri(resource: Manifesto.IResource, trimFileName: boolean = false): string {

        if (!resource) {
            return undefined
        }

        // const serviceLevel1 = resource.getService('http://iiif.io/api/image/2/level1.json')
        // if (serviceLevel1) {
        //     return serviceLevel1.getInfoUri()
        // }

        const service = this.resolveImageService(resource)
        return service && service.getInfoUri()


        // let serviceUri: string = (service ? service.id : resource.id)

        // // Remove the info.json path from uri
        // if (trimFileName && serviceUri.indexOf(infoFile) !== -1) {
        //     serviceUri = serviceUri.substr(0, serviceUri.lastIndexOf(infoFile))
        // }

        // // Trim last slash from uri
        // if (serviceUri.endsWith('/')) {
        //     serviceUri = serviceUri.substr(0, serviceUri.length - 1)
        // }

        // return serviceUri
    }

    resolveTileSource(image: Manifesto.IAnnotation): any {

        if (!image) {
            return undefined
        }

        if (this.disableDeepzoom) {
            return {
                type: 'image',
                url: image.getResource().id
                //url: this.resolveImageServiceUri(image.getResource(), false)
            }
        }
        else {
            return this.resolveImageServiceUri(image.getResource(), false)
        }
    }

    resolveImageService(resource: Manifesto.IResource): Manifesto.IService {

        if (resource) {

            const supportedProtocols = [
                /http:\/\/iiif\.io\/api\/image/i
            ]

            const supportedContexts = [
                /http:\/\/iiif\.io\/api\/image\/1\/context\.json/i,
                /http:\/\/iiif\.io\/api\/image\/2\/context\.json/i
            ]

            let imageService: Manifesto.IService = null

            // IIIF
            // Attempt to resolve the image service with the protocol

            const compatibleServices = resource.getServices().filter(service => {
                const profile = service.getProfile() && service.getProfile().value
                return this.matchesAtLeastOne(profile, supportedProtocols)
            })
            imageService = (compatibleServices.length > 0 && compatibleServices[0])

            // Fallback
            // Attempt to resolve the image service from the context

            if (!imageService) {
                imageService = resource.getServices().find(service => this.matchesAtLeastOne(service.context, supportedContexts))
            }

            return imageService
        }
    }

    private matchesAtLeastOne(value: string, regexCollection: RegExp[]) {

        if (!value || !regexCollection) {
            return undefined
        }

        const matches = regexCollection.filter(regex => value.match(regex))
        return (matches.length >= 1)
    }

}