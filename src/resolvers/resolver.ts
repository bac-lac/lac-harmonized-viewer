import { Md5 } from 'ts-md5/dist/md5'
import { loadPersistedState } from '../services/persisted-state-service'

export abstract class Resolver {

    private _pages: DocumentPage[]

    abstract init(url: string, FallbackUrl: string): Promise<this>

    title() { return this.getTitle() }
    abstract getTitle(): DocumentLabel[]

    document(): DocumentBase { return this.getDocument() }
    abstract getDocument(): DocumentBase

    abstract getManifest(): Manifesto.IManifest

    pages(): DocumentPage[] {
        if (!this._pages) {
            this._pages = this.getPages()
        }
        return this._pages
    }
    protected abstract getPages(): DocumentPage[]

    annotations(): DocumentAnnotation[] {

        return this.getAnnotations().map((annotation) => ({
            ...annotation,
            id: this.getAnnotationId(annotation),
            visible: this.isAnnotationVisible(annotation)
        }))
    }
    protected abstract getAnnotations(): DocumentAnnotation[]

    alternateFormats(): DocumentAlternateFormat[] { return this.getAlternateFormats() }
    abstract getAlternateFormats(): DocumentAlternateFormat[]

    startPageIndex() { return this.getStartPageIndex() }
    abstract getStartPageIndex(): number

    getAnnotationId(annotation: DocumentAnnotation): string {

        if (!annotation) {
            return undefined
        }
        return new Md5().appendStr(annotation.name || "").end().toString()
    }

    isAnnotationVisible(annotation: DocumentAnnotation): boolean {

        if (!annotation) {
            return undefined
        }

        return true
    }

    protected mapLabels(languageMap: Manifesto.LanguageMap): DocumentLabel[] {

        if (!languageMap) {
            return undefined
        }

        const labels: DocumentLabel[] = []
        languageMap.forEach(i => labels.push({ locale: i.locale, value: i.value }))

        return labels
    }
}