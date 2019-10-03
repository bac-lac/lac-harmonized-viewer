import { EventEmitter } from "events";

export class Localization {

    languageChanged: EventEmitter;

    private locales: Locale[] = [];

    init(localeId: string): Promise<any> {
        return new Promise((resolve, reject): void => {
            fetch(`/locales/${localeId}.json`)
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

    all(): Locale[] {
        return this.locales;
    }

    add(locale: Locale) {
        var exists = locale.id in this.locales;
        if (exists) {
            console.error(`Locale ${locale.id} already exists.`);
        } else {
            this.locales[locale.id] = locale;
        }
    }
}

export interface Locale {
    id: string;
    displayName: string;
    labels: string[];
}