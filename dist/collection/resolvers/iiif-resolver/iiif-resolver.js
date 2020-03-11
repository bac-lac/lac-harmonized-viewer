import { Resolver } from "../resolver";
import axios from 'axios';
import 'manifesto.js';
// Library getProperty function had a bug for falsy values (intentional? as in, no boolean values expected?)
Manifesto.Canvas.prototype.getProperty = function (name) {
    let prop = null;
    if (this.__jsonld) {
        prop = this.__jsonld[name];
        // if (!prop) {    FIXED - would go into if-block with falsy values
        if (typeof prop === 'undefined') {
            // property may have a prepended '@'
            prop = this.__jsonld['@' + name];
        }
    }
    return prop;
};
export class IIIFResolver extends Resolver {
    constructor(language = 'en') {
        super();
        this.thumbnailDefaultFormat = 'image/jpeg';
        this.thumbnailDefaultExtension = 'jpg';
        this.thumbnailHeight = 150;
        this.disableDeepzoom = false;
        this.language = language;
    }
    async init(url) {
        if (!url) {
            return undefined;
        }
        await axios.get(url, { validateStatus: status => status === 200 })
            .then((response) => {
            this.manifestJson = response.data;
            if (this.manifestJson) {
                // Add a parse check here eventually
                this.manifest = manifesto.create(this.manifestJson);
            }
        })
            .catch((e) => {
            throw new Error('manifest-not-found');
        });
        return this;
    }
    contentTypes() {
        return [
            'application/json',
            'application/ld+json'
        ];
    }
    getTitle() {
        if (!this.manifest) {
            return undefined;
        }
        return this.mapLabels(this.manifest.getLabel());
    }
    getDocument() {
        return {
            label: this.getTitle(),
            tileSources: this.tileSources()
        };
    }
    getSequence(index) {
        if (this.manifest) {
            return this.manifest.getSequenceByIndex(index);
        }
    }
    getDefaultSequence() {
        return this.getSequence(0);
    }
    getPages(customItemProps = [], metadataDictionary = []) {
        return this.getDefaultSequence().getCanvases()
            .flatMap((canvas) => canvas.getImages().map((image) => {
            const resource = image.getResource();
            if (resource) {
                const format = resource.getFormat();
                const item = {
                    id: canvas.id,
                    contentType: format && format.value,
                    label: this.mapLabels(canvas.getLabel()),
                    image: resource.id,
                    thumbnail: this.getThumbnailUri(canvas),
                    tileSources: this.resolveTileSource(image),
                    metadata: canvas.getMetadata().map((lvp) => {
                        const key = lvp.getLabel();
                        const label = lvp.label;
                        const value = lvp.value;
                        return {
                            key,
                            label,
                            value
                        };
                    })
                };
                customItemProps.forEach((prop) => { item[prop] = canvas.getProperty(prop); });
                return item;
            }
        }));
    }
    tileSources() {
        return this.getDefaultSequence().getCanvases()
            .flatMap((canvas) => canvas.getImages().map((image) => this.resolveTileSource(image)));
    }
    getMetadata() {
        return this.manifest.getMetadata().map((lvp) => {
            const key = lvp.getLabel();
            const label = lvp.label;
            const value = lvp.value;
            return {
                key,
                label,
                value
            };
        });
    }
    // Avoid
    getAnnotations() {
        if (!this.manifest) {
            return undefined;
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
        }));
    }
    getAlternateFormats() {
        return this.getDefaultSequence().getRenderings().map((rendering) => {
            const format = rendering.getFormat();
            return {
                contentType: (format ? format.value : null),
                label: this.mapLabels(rendering.getLabel()),
                url: rendering.id
            };
        });
    }
    getStartPageIndex() {
        if (this.manifest) {
            const startCanvas = this.getDefaultSequence().getStartCanvas();
            if (startCanvas) {
                const startPage = this.getPages().find((page) => page.id == startCanvas);
                if (startPage) {
                    return this.getPages().indexOf(startPage);
                }
            }
        }
        return 0;
    }
    getThumbnailUri(canvas) {
        if (!canvas) {
            return undefined;
        }
        const thumbnail = canvas.getThumbnail();
        if (thumbnail) {
            return thumbnail.id;
        }
        else {
            return this.getImageUri(canvas, this.thumbnailHeight);
        }
    }
    getManifest() {
        return this.manifest;
    }
    getImageUri(canvas, height) {
        if (!canvas) {
            return undefined;
        }
        let width = null;
        const aspectRatio = canvas.getWidth() / canvas.getHeight();
        if (aspectRatio) {
            width = Math.floor(height * aspectRatio);
        }
        return canvas.getCanonicalImageUri(width);
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
    resolveImageServiceUri(resource, trimFileName = false) {
        if (!resource) {
            return undefined;
        }
        // const serviceLevel1 = resource.getService('http://iiif.io/api/image/2/level1.json')
        // if (serviceLevel1) {
        //     return serviceLevel1.getInfoUri()
        // }
        const service = this.resolveImageService(resource);
        return service && service.getInfoUri();
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
    resolveTileSource(image) {
        if (!image) {
            return undefined;
        }
        if (this.disableDeepzoom) {
            return {
                type: 'image',
                url: image.getResource().id
                //url: this.resolveImageServiceUri(image.getResource(), false)
            };
        }
        else {
            return this.resolveImageServiceUri(image.getResource(), false);
        }
    }
    resolveImageService(resource) {
        if (resource) {
            const supportedProtocols = [
                /http:\/\/iiif\.io\/api\/image/i
            ];
            const supportedContexts = [
                /http:\/\/iiif\.io\/api\/image\/1\/context\.json/i,
                /http:\/\/iiif\.io\/api\/image\/2\/context\.json/i
            ];
            let imageService = null;
            // IIIF
            // Attempt to resolve the image service with the protocol
            const compatibleServices = resource.getServices().filter(service => {
                const profile = service.getProfile() && service.getProfile().value;
                return this.matchesAtLeastOne(profile, supportedProtocols);
            });
            imageService = (compatibleServices.length > 0 && compatibleServices[0]);
            // Fallback
            // Attempt to resolve the image service from the context
            if (!imageService) {
                imageService = resource.getServices().find(service => this.matchesAtLeastOne(service.context, supportedContexts));
            }
            return imageService;
        }
    }
    matchesAtLeastOne(value, regexCollection) {
        if (!value || !regexCollection) {
            return undefined;
        }
        const matches = regexCollection.filter(regex => value.match(regex));
        return (matches.length >= 1);
    }
}
