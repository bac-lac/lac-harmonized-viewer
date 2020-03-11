export declare abstract class Resolver {
    private _pages;
    abstract init(url: string): Promise<this>;
    title(): DocumentLabel[];
    abstract getTitle(): DocumentLabel[];
    document(): DocumentBase;
    abstract getDocument(): DocumentBase;
    abstract getManifest(): Manifesto.IManifest;
    pages(): DocumentPage[];
    protected abstract getPages(): DocumentPage[];
    annotations(): DocumentAnnotation[];
    protected abstract getAnnotations(): DocumentAnnotation[];
    alternateFormats(): DocumentAlternateFormat[];
    abstract getAlternateFormats(): DocumentAlternateFormat[];
    startPageIndex(): number;
    abstract getStartPageIndex(): number;
    getAnnotationId(annotation: DocumentAnnotation): string;
    isAnnotationVisible(annotation: DocumentAnnotation): boolean;
    protected mapLabels(languageMap: Manifesto.LanguageMap): DocumentLabel[];
}
