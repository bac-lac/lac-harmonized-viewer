import { Resolver } from "../resolver";
export class IIIFResolver extends Resolver {
    constructor() {
        super(...arguments);
        this.thumbnailDefaultFormat = 'image/jpeg';
        this.thumbnailDefaultExtension = 'jpg';
        this.thumbnailHeight = 150;
        this.ignoreImageService = false;
    }
    async init(url) {
        if (!url) {
            return undefined;
        }
        const response = await this.httpGet(url);
        this.manifestJson = response.data;
        if (this.manifestJson) {
            this.manifest = manifesto.create(this.manifestJson);
        }
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
    getPages() {
        return this.getDefaultSequence().getCanvases()
            .flatMap((canvas) => canvas.getImages().map((image) => {
            const resource = image.getResource();
            if (resource) {
                return {
                    id: canvas.id,
                    label: this.mapLabels(canvas.getLabel()),
                    image: this.getImageUri(resource, 1000),
                    thumbnail: this.getThumbnailUri(resource)
                };
            }
        }));
    }
    tileSources() {
        return this.getDefaultSequence().getCanvases()
            .flatMap((canvas) => canvas.getImages().map((image) => this.resolveTileSource(image)));
    }
    getAnnotations() {
        if (!this.manifest) {
            return undefined;
        }
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
    getThumbnailUri(resource) {
        if (!resource) {
            return undefined;
        }
        const thumbnail = resource.getThumbnail();
        if (thumbnail) {
            return thumbnail.id;
        }
        else {
            return this.getImageUri(resource, this.thumbnailHeight);
        }
    }
    getImageUri(resource, height) {
        if (!resource) {
            return undefined;
        }
        const infoUri = this.resolveImageServiceUri(resource, true);
        if (infoUri.indexOf('/') != -1) {
            let extension = null;
            if (infoUri.lastIndexOf('/') != -1) {
                const fileName = infoUri.substr(infoUri.lastIndexOf('/') + 1);
                if (fileName) {
                    if (fileName.lastIndexOf('.') != -1) {
                        extension = fileName.substr(fileName.lastIndexOf('.') + 1);
                    }
                }
            }
            if (!extension) {
                extension = this.thumbnailDefaultExtension;
            }
            return `${infoUri}/full/${height},/0/default.${extension}`;
        }
    }
    resolveImageServiceUri(resource, trimFileName = false) {
        if (!resource) {
            return undefined;
        }
        const infoFile = 'info.json';
        const service = this.resolveImageService(resource);
        let serviceUri = (service ? service.getInfoUri() : resource.id);
        // Remove the info.json path from uri
        if (trimFileName && serviceUri.indexOf(infoFile) !== -1) {
            serviceUri = serviceUri.substr(0, serviceUri.lastIndexOf(infoFile));
        }
        // Trim last slash from uri
        if (serviceUri.endsWith('/')) {
            serviceUri = serviceUri.substr(0, serviceUri.length - 1);
        }
        return serviceUri;
    }
    resolveTileSource(image) {
        if (!image) {
            return undefined;
        }
        if (this.ignoreImageService) {
            return {
                type: 'image',
                url: image.getResource().id
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
