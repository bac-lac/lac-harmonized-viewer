// import { StringBuilder } from "../string-builder";
// export class ManifestExtensions {
//     manifest: Manifesto.IManifest
//     constructor(manifest: Manifesto.IManifest) {
//         this.manifest = manifest
//     }
//     label() {
//         const localval = this.localize(this.manifest.getLabel())
//         return new StringBuilder(localval.value).toString()
//     }
//     creator() {
//         const val = this.manifest.getMetadata().find(x => x.getLabel() == 'Creator')
//         if (val) {
//             const localval = this.localize(val.value)
//             return new StringBuilder(localval).toString()
//         }
//         else {
//             return undefined
//         }
//     }
//     description() {
//         const localval = this.localize(this.manifest.getDescription())
//         return new StringBuilder(localval.value).toString()
//     }
//     private localize(languageMap: Manifesto.LanguageMap): Manifesto.Language {
//         if (!languageMap) {
//             return undefined
//         }
//         const language = Locale.get()
//         return languageMap.find((item) =>
//             item.locale &&
//             (item.locale === language || (item.locale.indexOf('-') > -1 && item.locale.substr(0, item.locale.indexOf('-')) === language)))
//     }
//     private format(language: Manifesto.Language) {
//         if (language) {
//             return language.value
//         }
//         else {
//             return undefined
//         }
//     }
// }
