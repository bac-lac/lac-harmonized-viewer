//import i18n from 'i18next';
//import XHR from 'i18next-xhr-backend';
import i18next from 'i18next';
import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { LocalStorage } from '../services/storage-service';
import { EventEmitter } from 'events';

i18next
    .init({
        lng: 'en',
        fallbackLng: 'en',
        ns: ['1.0'],
        defaultNS: '1.0',
        debug: true
    }, (err, t) => {

    })

const en = import('../locales/en')
    .then((value) => {
        console.log(value)
    })

export class I18nService {

    languageChanged: EventEmitter = new EventEmitter()

    storage: LocalStorage = new LocalStorage()

    languages: string[] = ['en', 'fr']

    constructor() {
        this.initialize()
    }

    initialize() {

        const selectedLanguage = this.get()

        //const log = JSON.stringify({ en: { name: 'stored en' }, fr: { name: 'stored fr' } })
        //this.storage.set('i18next_res_en-10', log)





        // i18next.addResourceBundle('en', '1.0', {
        //     'name': 'English',
        //     'settings': 'Settings',
        //     'apply': 'Apply'
        // }, true, true)

        i18next.addResourceBundle('fr', '1.0', {
            'name': 'Français',
            'settings': 'Paramètres',
            'apply': 'Appliquer'
        }, true, true)

        i18next.on('languageChanged', (language: string) => {
            this.languageChanged.emit('languageChanged', language)
        })
    }

    onChange(callback: (lng: string) => void) {
        i18next.on('languageChanged', callback)
    }

    all() {
        return this.languages || []
    }

    change(language: string) {

        if (!language) {
            return undefined
        }

        i18next.changeLanguage(language)
        this.storage.set('language', language)
    }

    get() {
        return this.storage.get('language') || 'en'
    }

    static resolve(language: string, available: string[]) {

        const exactMatch = available
            .find(x => x.toLowerCase() == language.toLowerCase())

        if (exactMatch) {
            return exactMatch
        }

        const splitterIndex = language.indexOf('-')
        if (splitterIndex > -1) {

            const partialMatch = available
                .find(x => x.toLowerCase() == language.substr(0, splitterIndex).toLowerCase())

            if (partialMatch) {
                return partialMatch
            }
        }

        return undefined
    }

    map(languageMap: Manifesto.LanguageMap): Manifesto.Language {

        if (!languageMap) {
            return undefined
        }

        const language = this.get()

        return languageMap.find((x) =>
            x.locale &&
            (x.locale === language || (x.locale.indexOf('-') > -1 && x.locale.substr(0, x.locale.indexOf('-')) === language)))
    }

    load(filename: string): Promise<any> {

        return new Promise((resolve, reject): void => {

            fetch(filename)
                .then((result) => {
                    if (result.ok) {
                        resolve(result.json())
                    }
                    else {
                        reject()
                    }
                }, () => reject())
        })
    }

    label(key: string, locale?: string) {

        if (!key) {
            return undefined
        }

        if (locale) {
            return i18next.getFixedT(locale)(key)
        }
        else {
            return i18next.t(key)
        }
    }
}

export interface I18nService {
    id: string
    displayName: string
    labels: string[]
}