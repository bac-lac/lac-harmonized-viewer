export class Localization {

    private locales: Locale[] = [];

    all(): Locale[] {
        return this.locales;
    }

    add(locale: Locale) {
        var exists = locale.id in this.locales;
        if (exists) {
            console.error(`A locale with the same id ${locale.id} already exists.`);
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