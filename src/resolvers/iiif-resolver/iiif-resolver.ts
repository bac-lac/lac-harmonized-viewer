import { DocumentPage, DocumentAnnotation, DocumentAlternateFormat } from "../../interfaces"
import { Resolver } from "../resolver"
import { IIIFDocument } from "./iiif-document"
import { Locale } from "../../services/locale-service"

export class IIIFResolver extends Resolver {

    thumbnailDefaultFormat: string = 'image/jpeg'
    thumbnailDefaultExtension: string = 'jpg'
    thumbnailHeight: number = 100

    private manifest: Manifesto.IManifest
    private manifestJson: string

    async init(url: string) {

        if (!url) {
            return undefined
        }

        const response = await this.httpGet(url)

        this.manifestJson = response.data as string
        if (this.manifestJson) {
            this.manifest = manifesto.create(this.manifestJson) as Manifesto.IManifest
        }

        return this
    }

    contentType() {
        return 'application/json'
    }

    getTitle(): string {
        if (this.manifest) {
            const label = this.resolveLanguage(this.manifest.getLabel())
            return label ? label.value : null
        }
    }

    getDocument(): IIIFDocument {
        return {
            title: this.getTitle(),
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

    getPages(): DocumentPage[] {

        return this.getDefaultSequence().getCanvases()
            .flatMap((canvas) => canvas.getImages().map((image) => {

                const resource = image.getResource()
                if (resource) {

                    const label = this.resolveLanguage(canvas.getLabel())

                    return {
                        id: canvas.id,
                        label: (label ? label.value : null),
                        image: this.getImageUri(resource, 1000),
                        thumbnail: this.getImageUri(resource, this.thumbnailHeight)
                    }
                }
            }))
    }

    getTableOfContents() {
        console.log(this.manifest.getAllRanges())
    }

    tileSources(): string[] {
        return this.getDefaultSequence().getCanvases()
            .flatMap((canvas) => canvas.getImages().map((image) => this.resolveImageServiceUri(image.getResource(), false)))
    }

    getAnnotations(): DocumentAnnotation[] {

        if (this.manifest) {

            return this.manifest.getMetadata().map((annotation) => {

                const label = this.resolveLanguage(annotation.label)
                return {
                    id: null,
                    name: annotation.getLabel(),
                    label: (label ? label.value : null),
                    content: annotation.getValue(),
                    visible: true
                }
            })
        }
    }

    getAlternateFormats(): DocumentAlternateFormat[] {

        return this.getDefaultSequence().getRenderings().map((rendering) => {

            const label = this.resolveLanguage(rendering.getLabel())
            const format = rendering.getFormat()

            return {
                contentType: (format ? format.value : null),
                label: (label ? label.value : null),
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

    getImageUri(resource: Manifesto.IResource, height: number) {

        if (!resource) {
            return undefined
        }

        const infoUri = this.resolveImageServiceUri(resource, true)
        if (infoUri.indexOf('/') != -1) {

            let extension = null

            if (infoUri.lastIndexOf('/') != -1) {
                const fileName = infoUri.substr(infoUri.lastIndexOf('/') + 1)
                if (fileName) {

                    if (fileName.lastIndexOf('.') != -1) {
                        extension = fileName.substr(fileName.lastIndexOf('.') + 1)
                    }
                }
            }

            if (!extension) {
                extension = this.thumbnailDefaultExtension
            }

            return `${infoUri}/full/${height},/0/default.${extension}`
        }
    }

    resolveImageServiceUri(resource: Manifesto.IResource, trimFileName: boolean = false): string {

        if (!resource) {
            return undefined
        }

        let serviceUri: string = null

        const infoFile = 'info.json'

        const service = this.resolveImageService(resource)
        if (service) {

            serviceUri = service.getInfoUri()

            // Remove the info.json path from uri
            if (serviceUri.indexOf(infoFile) != -1) {
                serviceUri = serviceUri.substr(0, serviceUri.lastIndexOf(infoFile))
            }
        }
        else {
            serviceUri = resource.id
        }

        // Trim last slash from uri
        if (serviceUri.endsWith('/')) {
            serviceUri = serviceUri.substr(0, serviceUri.length - 1)
        }

        return serviceUri
    }

    map(languageMap: Manifesto.LanguageMap): Manifesto.Language {

        if (!languageMap) {
            return undefined
        }
        const language = Locale.get()
        return languageMap.find((x) =>
            x.locale && (x.locale === language || (x.locale.indexOf('-') != -1 && x.locale.substr(0, x.locale.indexOf('-')) === language)))
    }

    private resolveLanguage(languageMap: Manifesto.LanguageMap): Manifesto.Language {
        if (!languageMap) {
            return undefined
        }
        return languageMap.find((x) =>
            x.locale && (x.locale === this.locale || (x.locale.indexOf('-') != -1 && x.locale.substr(0, x.locale.indexOf('-')) === this.locale)))
    }

    private resolveImageService(resource: Manifesto.IResource): Manifesto.IService {

        if (resource) {

            const complianceIds: string[] = [
                "http://iiif.io/api/image/2/level0.json",
                "http://iiif.io/api/image/2/level1.json",
                "http://iiif.io/api/image/2/level2.json"
            ]

            return resource.getServices()
                .find(service => service.getProfile() && complianceIds.includes(service.getProfile().value))
        }
    }

}