import { Locale } from "../services/locale";
import { StringBuilder } from "../string-builder";

export class ManifestExtensions {

    locale: Locale;
    manifest: Manifesto.IManifest;

    constructor(manifest: Manifesto.IManifest) {
        this.locale = new Locale();
        this.manifest = manifest;
    }

    label(): string {
        const localval = this.localize(this.manifest.getLabel());
        return new StringBuilder(localval.value).toString();
    }

    creator(): string {
        const val = this.manifest.getMetadata().find(x => x.getLabel() == 'Creator');
        if (val) {
            const localval = this.localize(val.value);
            return new StringBuilder(localval).toString();
        }
        else {
            return undefined;
        }
    }

    description(): string {
        const localval = this.localize(this.manifest.getDescription());
        return new StringBuilder(localval.value).toString();
    }

    private localize(languageMap: Manifesto.LanguageMap): Manifesto.Language {
        if (!languageMap) {
            return undefined;
        }
        return languageMap.find(x =>
            x.locale &&
            (x.locale === this.locale.get() ||
                (x.locale.indexOf('-') > -1 && x.locale.substr(0, x.locale.indexOf('-')) === this.locale.get())));
    }

    private format(language: Manifesto.Language): string {
        if (language) {
            return language.value;
        }
        else {
            return undefined;
        }
    }

}