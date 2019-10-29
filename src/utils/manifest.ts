import { I18nService } from "../services/i18n-service";
import { StringBuilder } from "../string-builder";

export class ManifestExtensions {

    locale: I18nService
    manifest: Manifesto.IManifest

    constructor(manifest: Manifesto.IManifest) {
        this.locale = new I18nService()
        this.manifest = manifest
    }

    label() {
        const localval = this.localize(this.manifest.getLabel())
        return new StringBuilder(localval.value).toString()
    }

    creator() {
        const val = this.manifest.getMetadata().find(x => x.getLabel() == 'Creator')
        if (val) {
            const localval = this.localize(val.value)
            return new StringBuilder(localval).toString()
        }
        else {
            return undefined
        }
    }

    description() {
        const localval = this.localize(this.manifest.getDescription())
        return new StringBuilder(localval.value).toString()
    }

    private localize(languageMap: Manifesto.LanguageMap): Manifesto.Language {

        if (!languageMap) {
            return undefined
        }
        return languageMap.find((language) =>
            language.locale &&
            (language.locale === this.locale.get() || (language.locale.indexOf('-') > -1 && language.locale.substr(0, language.locale.indexOf('-')) === this.locale.get())))
    }

    private format(language: Manifesto.Language) {
        if (language) {
            return language.value
        }
        else {
            return undefined
        }
    }

}