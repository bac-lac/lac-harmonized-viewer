import { Label, LabelMap } from "./label"
import { Locale } from "./locale"
import { LocaleSource } from "./locale-source"

export class i18n {

    static localeSources: LocaleSource[] = []

    static async load(locale: Locale) {

        if (!locale) {
            return undefined
        }

        const response = await fetch(`./locales/${locale.toString()}.json`)

        if (response.status === 200) {

            const localeSource = await response.json()
            i18n.localeSources = [...i18n.localeSources, localeSource]
        }
    }

    static labels(locale: Locale): Label[] {

        if (!locale) {
            return undefined
        }

        const localeSource = this.resolveLocaleSource(locale)
        if (localeSource) return localeSource.labels
    }

    static resolveLocaleSource(locale: Locale): LocaleSource {

        if (!locale) {
            return undefined
        }

        let resolved = null

        resolved = i18n.localeSources.find(i => i.locale && locale.same(i.locale))
        if (resolved) return resolved

        resolved = i18n.localeSources.find(i => i.locale && locale.sameLanguage(i.locale))
        if (resolved) return resolved

        return null
    }

    setLabel() {

    }
}

// export function t(key: string | LabelMap[], locale: Locale): string {

//     if (!key || !locale) {
//         return undefined
//     }

//     if (typeof key === "string") {
//         const label = i18n.labels(locale).find(i => i.key && i.key === key)
//         return (label ? label.value : key)
//     }
//     else {
//         let resolved: LabelMap = null

//         resolved = key.find(i => i.locale && locale.same(i.locale))
//         if (resolved) return resolved.value

//         resolved = key.find(i => i.locale && locale.sameLanguage(i.locale))
//         if (resolved) return resolved.value

//         return null
//     }
// }