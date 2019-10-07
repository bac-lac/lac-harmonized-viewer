import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import i18next from "i18next";
import { EventEmitter } from "events";
import { load, save } from './utils';
export class Locale {
    constructor() {
        this.languageChanged = new EventEmitter();
        this.languages = ['en', 'fr'];
    }
    async init() {
        var setting = load('language');
        var service = await i18n
            .use(XHR)
            .init({
            lng: (setting ? setting : 'en'),
            fallbackLng: this.languages,
            debug: false,
            backend: {
                loadPath: '{{lng}}.json'
            }
        });
        i18next.on('languageChanged', (language) => {
            this.languageChanged.emit('languageChanged', language);
        });
        return service;
    }
    all() {
        return this.languages || [];
    }
    change(language) {
        if (!language) {
            return undefined;
        }
        i18next.changeLanguage(language);
        save('language', language);
    }
    get() {
        return i18next.language;
    }
    static resolve(language, available) {
        const exactMatch = available
            .find(x => x.toLowerCase() == language.toLowerCase());
        if (exactMatch) {
            return exactMatch;
        }
        const splitterIndex = language.indexOf('-');
        if (splitterIndex > -1) {
            const partialMatch = available
                .find(x => x.toLowerCase() == language.substr(0, splitterIndex).toLowerCase());
            if (partialMatch) {
                return partialMatch;
            }
        }
        return undefined;
    }
    map(languageMap) {
        if (!languageMap) {
            return undefined;
        }
        const language = this.get();
        return languageMap.find(x => x.locale &&
            (x.locale === language ||
                (x.locale.indexOf('-') > -1 && x.locale.substr(0, x.locale.indexOf('-')) === language)));
    }
    // async addJson(filename: string): Promise<Locale> {
    //     if (!filename) {
    //         return undefined;
    //     }
    //     if (path.extname(filename) != 'json') {
    //         filename = filename + '.json';
    //     }
    //     filename = path.join(this.basePath, filename);
    //     const locale = await this.load(filename);
    //     if (this.has(locale.id)) {
    //         console.error(`Locale ${locale.id} already exists.`);
    //     } else {
    //         this.locales[locale.id] = locale;
    //         return locale;
    //     }
    // }
    load(filename) {
        return new Promise((resolve, reject) => {
            fetch(filename)
                .then((result) => {
                if (result.ok) {
                    resolve(result.json());
                }
                else {
                    reject();
                }
            }, () => reject());
        });
    }
    // change(id: string) {
    //     if (!id) {
    //         return undefined;
    //     }
    //     const locale = this.get(id);
    //     if (locale) {
    //         this.selected = locale.id;
    //         this.languageChanged.emit('languageChanged');
    //     }
    // }
    // has(id: string): boolean {
    //     if (!id) {
    //         return undefined;
    //     }
    //     return (id in this.locales);
    // }
    // get(id: string): Locale {
    //     if (!id) {
    //         return undefined;
    //     }
    //     if (id in this.locales) {
    //         return this.locales[id];
    //     }
    //     else {
    //         console.error(`Locale "${id}" not found.`);
    //         return undefined;
    //     }
    // }
    label(key, locale) {
        if (!key) {
            return undefined;
        }
        if (locale) {
            return i18next.getFixedT(locale)(key);
        }
        else {
            return i18n.t(key);
        }
    }
}
