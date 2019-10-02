import { Locale } from "./locale";
import getUserLocale from 'get-user-locale';

const i18next = require('i18next').default;
const i18nextBrowserLanguageDetector = require('i18next-browser-languagedetector');

const en = require("../locales/en.locale.json");
const fr = require("../locales/fr.locale.json");

export class LocaleService {

    current: string;

    protected locales: Locale[] = [];

    constructor() {

        this.add(en);
        this.add(fr);
    }

    async configure() {

        await i18next
            //.use(i18nextBrowserLanguageDetector)
            .init({
                fallbackLng: 'en',
                debug: true,
                ns: ['HV'],
                defaultNS: 'HV'
            });

        await i18next.addResourceBundle('en', 'HV', {
            language: 'Language',
            settings: 'Settings'
        }, true, true);

        await i18next.addResourceBundle('fr', 'HV', {
            language: 'Langue',
            settings: 'Paramètres'
        }, true, true);

        i18next.on('languageChanged', (language: string) => {
            //this.instance.publish('language-change', new LanguageChange(language));
        });

        this.set('en', (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key');
        });
    }

    add(locale: Locale): void {

        if (!locale) {
            return undefined;
        }

        if (this.exists(locale.code)) {
            throw new Error(`Locale '${locale.code.toLowerCase()}' has already been registered.`);
        }
        else {
            this.locales.push(locale);
        }
    }

    load(): void {

        const configured = ConfigurationService.load('HarmonizedViewer.Locale');
        if (configured) {
            this.set(configured);
        }

        if (!this.current) {
            const detected = this.detect();
            if (detected) {
                this.set(detected);
            }
        }

        if (!this.current) {
            const defaultLocale = this.default();
            if (defaultLocale) {
                this.set(defaultLocale.code);
            }
        }
    }

    protected detect(): string {

        // GetUserLocale will attempt to detect the user's locale from the browser
        // and returns a locale string such as 'en-US'

        let locale = getUserLocale() as string;
        if (locale) {
            return locale;
        }
        else {
            return undefined;
        }
    }

    default(): Locale {
        return this.list().find(x => x.default);
    }

    list(): Locale[] {
        return this.locales;
    }

    get(code: string): Locale {
        if (!code) {
            return undefined;
        }
        return this.locales.find(x => x.code.toLowerCase() == code.toLowerCase());
    }

    set(language: string, callback?: (err: any, t: any) => void): void {
        if (!language) {
            return undefined;
        }
        i18next.changeLanguage(language, callback);
    }

    exists(code: string): boolean {
        if (!code) {
            return undefined;
        }
        return (this.locales.filter(x => x.code.toLowerCase() == code.toLowerCase()).length > 0);
    }

    t(key: string): string {
        if (!key) {
            return undefined;
        }
        return i18next.t(key);
    }

}