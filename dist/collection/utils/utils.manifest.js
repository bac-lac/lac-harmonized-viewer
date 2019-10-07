import { Locale } from "./utils.locale";
import { StringBuilder } from "../string-builder";
export class ManifestExtensions {
    constructor(manifest) {
        this.locale = new Locale();
        this.manifest = manifest;
    }
    label() {
        const localval = this.localize(this.manifest.getLabel());
        return new StringBuilder(localval.value).toString();
    }
    creator() {
        const val = this.manifest.getMetadata().find(x => x.getLabel() == 'Creator');
        if (val) {
            const localval = this.localize(val.value);
            return new StringBuilder(localval).toString();
        }
        else {
            return undefined;
        }
    }
    description() {
        const localval = this.localize(this.manifest.getDescription());
        return new StringBuilder(localval.value).toString();
    }
    localize(languageMap) {
        if (!languageMap) {
            return undefined;
        }
        return languageMap.find(x => x.locale &&
            (x.locale === this.locale.get() ||
                (x.locale.indexOf('-') > -1 && x.locale.substr(0, x.locale.indexOf('-')) === this.locale.get())));
    }
    format(language) {
        if (language) {
            return language.value;
        }
        else {
            return undefined;
        }
    }
}
