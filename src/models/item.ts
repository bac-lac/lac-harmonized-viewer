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

    getMetadataByKey(key: string, language: string): string {
        if (!key) {
            return;
        } else {
            const result = this.metadata.find(metadata => metadata.key === key);
            if (!result || !result.value) {
                return;
            }

            const languageFindResult = result.value.find(kvp => kvp.locale === language);
            return languageFindResult ? languageFindResult.value : undefined;
        }
    }
}