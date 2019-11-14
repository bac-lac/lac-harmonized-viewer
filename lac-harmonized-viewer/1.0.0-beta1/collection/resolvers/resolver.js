import axios from 'axios';
import { Md5 } from 'ts-md5/dist/md5';
import { loadSettings } from '../settings';
import { IIIFResolver } from './iiif-resolver/iiif-resolver';
export class Resolver {
    title() { return this.getTitle(); }
    document() { return this.getDocument(); }
    pages() {
        if (!this._pages) {
            this._pages = this.getPages();
        }
        return this._pages;
    }
    annotations() {
        return this.getAnnotations().map((annotation) => (Object.assign(Object.assign({}, annotation), { id: this.getAnnotationId(annotation), visible: this.isAnnotationVisible(annotation) })));
    }
    alternateFormats() { return this.getAlternateFormats(); }
    startPageIndex() { return this.getStartPageIndex(); }
    getAnnotationId(annotation) {
        if (!annotation) {
            return undefined;
        }
        return new Md5().appendStr(annotation.name || '').end().toString();
    }
    isAnnotationVisible(annotation) {
        if (!annotation) {
            return undefined;
        }
        const annotationState = loadSettings().annotations
            .find(item => item.id == this.getAnnotationId(annotation));
        return (annotationState ? annotationState.visible : annotation.visible);
    }
    async httpGet(url) {
        return await axios.get(url);
    }
    mapLabels(languageMap) {
        if (!languageMap) {
            return undefined;
        }
        const labels = [];
        languageMap.forEach(i => labels.push({ locale: i.locale, value: i.value }));
        return labels;
    }
    static create() {
        return new IIIFResolver();
    }
}
