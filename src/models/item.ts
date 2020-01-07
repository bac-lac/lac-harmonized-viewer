// Class wrapper to add functionality to the DocumentPage object
export class Item implements DocumentPage {
    id: string;
    contentType: string;
    label: DocumentLabel[];
    image: string;
    thumbnail: string;
    tileSources: string[];
    metadata: DocumentMetadata[];

    constructor(item: DocumentPage) {
       Object.assign(this, item);
    }

    getMetadataByKey(key: string, language: string = null): string {
        if (!key) {
            return;
        } else {
            const result = this.metadata.find(metadata=> metadata.label === key);
            if (!result || !result.value) {
                return;
            }

            // Return first item of array if language not provided
            if (!language) {
                const noLangResult = result.value.find(kvp => kvp !== undefined);
                return noLangResult ? noLangResult.value : undefined;
            }

            const withLangResult = result.value.find(kvp => kvp.locale === language);
            return withLangResult ? withLangResult.value : undefined;  
        }
    }
}

/*return {
    id: canvas.id,
    contentType: format && format.value,
    label: this.mapLabels(canvas.getLabel()),
    image: resource.id,
    //image: this.getImageUri(resource, 1000),
    thumbnail: this.getThumbnailUri(canvas),
    tileSources: this.resolveTileSource(image),
    metadata: canvas.getMetadata().map(
        (lvp: Manifesto.LabelValuePair): DocumentMetadata => {
            return {
                label: lvp.getLabel(),
                value: this.mapLabels(lvp.value)
            } 
        }
    )
}*/