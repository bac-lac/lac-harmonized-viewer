import { Resolver } from "../resolver";
import { IIIFDocument } from "./iiif-document";
export declare class IIIFResolver extends Resolver {
    thumbnailDefaultFormat: string;
    thumbnailDefaultExtension: string;
    thumbnailHeight: number;
    ignoreImageService: boolean;
    private manifest;
    private manifestJson;
    init(url: string): Promise<this>;
    contentTypes(): string[];
    getTitle(): DocumentLabel[];
    getDocument(): IIIFDocument;
    getSequence(index: number): Manifesto.ISequence;
    getDefaultSequence(): Manifesto.ISequence;
    getPages(): DocumentPage[];
    tileSources(): string[];
    getAnnotations(): DocumentAnnotation[];
    getAlternateFormats(): DocumentAlternateFormat[];
    getStartPageIndex(): number;
    getThumbnailUri(resource: Manifesto.IResource): string;
    getImageUri(resource: Manifesto.IResource, height: number): string;
    resolveImageServiceUri(resource: Manifesto.IResource, trimFileName?: boolean): string;
    resolveTileSource(image: Manifesto.IAnnotation): any;
    resolveImageService(resource: Manifesto.IResource): Manifesto.IService;
    private matchesAtLeastOne;
}
