// Class wrapper to add functionality to the DocumentPage object
export class Item {
    constructor(item) {
        Object.assign(this, item);
    }
    getMetadataByKey(key, language) {
        if (!key) {
            return;
        }
        else {
            const result = this.metadata.find(metadata => metadata.key === key);
            if (!result || !result.value) {
                return;
            }
            const languageFindResult = result.value.find(kvp => kvp.locale === language);
            return languageFindResult ? languageFindResult.value : undefined;
        }
    }
}
