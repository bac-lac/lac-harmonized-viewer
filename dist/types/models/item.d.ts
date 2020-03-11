export declare class Item implements DocumentPage {
    id: string;
    contentType: string;
    label: DocumentLabel[];
    image: string;
    thumbnail: string;
    tileSources: string[];
    metadata: DocumentMetadata[];
    constructor(item: DocumentPage);
    getMetadataByKey(key: string, language: string): string;
}
