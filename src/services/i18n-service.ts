import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

export const languages: string[] = ['en', 'fr']

i18next
    .use(i18nextXHRBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'en',
        debug: true,
        ns: ['common'],
        defaultNS: 'common',
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json'
        }
    }, (err, t) => {
        console.log('update lang')
    })

// import { EventEmitter } from 'events';
// import { saveLocale, loadSettings } from '../settings';

// i18next
//     .use(LanguageDetector)
//     .init({
//         lng: 'en',
//         fallbackLng: 'en',
//         ns: ['1.0'],
//         defaultNS: '1.0',
//         debug: false
//     }, (err, t) => {

//     })

// const en = import('../locales/en')
//     .then((value) => {

//     })

// const languages: string[] = ['en', 'fr']

// export class Locale {

//     languageChanged: EventEmitter = new EventEmitter()

//     async fetch(language: string, resourcesUri: string = null) {

//         const resourcesUrl = document.querySelector('[data-resources-url]') || this.resourcesUri
//         const response = await fetch(`${resourcesUrl}locales/${Lang}.js`);
//     }




//     init() {

//         const selectedLanguage = Locale.get()

//         //const log = JSON.stringify({ en: { name: 'stored en' }, fr: { name: 'stored fr' } })
//         //this.storage.set('i18next_res_en-10', log)





//         // i18next.addResourceBundle('en', '1.0', {
//         //     'name': 'English',
//         //     'settings': 'Settings',
//         //     'apply': 'Apply'
//         // }, true, true)

//         i18next.addResourceBundle('fr', '1.0', {
//             'name': 'Français',
//             'settings': 'Paramètres',
//             'apply': 'Appliquer'
//         }, true, true)

//         i18next.on('languageChanged', (language: string) => {
//             this.languageChanged.emit('languageChanged', language)
//         })
//     }

//     static change(callback: (lng: string) => void) {
//         i18next.on('languageChanged', callback)
//     }

//     static all() {
//         return languages || []
//     }

//     static set(language: string) {

//         if (!language) {
//             return undefined
//         }

//         i18next.changeLanguage(language)

//         saveLocale(language)
//     }

//     static get() {
//         return loadSettings().locale
//     }

//     static resolve(language: string, available: string[]) {

//         const exactMatch = available
//             .find(x => x.toLowerCase() == language.toLowerCase())

//         if (exactMatch) {
//             return exactMatch
//         }

//         const splitterIndex = language.indexOf('-')
//         if (splitterIndex > -1) {

//             const partialMatch = available
//                 .find(x => x.toLowerCase() == language.substr(0, splitterIndex).toLowerCase())

//             if (partialMatch) {
//                 return partialMatch
//             }
//         }

//         return undefined
//     }

//     load(filename: string): Promise<any> {

//         return new Promise((resolve, reject): void => {

//             fetch(filename)
//                 .then((result) => {
//                     if (result.ok) {
//                         resolve(result.json())
//                     }
//                     else {
//                         reject()
//                     }
//                 }, () => reject())
//         })
//     }

//     static label(key: string, locale?: string) {

//         if (!key) {
//             return undefined
//         }

//         if (locale) {
//             return i18next.getFixedT(locale)(key)
//         }
//         else {
//             return i18next.t(key)
//         }
//     }
// }

// export function t(key: string, locale?: string) {
//     return Locale.label(key, locale)
// }

// export interface I18nService {
//     id: string
//     displayName: string
//     labels: string[]
// }