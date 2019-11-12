
import LanguageDetector from 'i18next-browser-languagedetector';

export class Locale {

    language: string
    country: string

    setLanguage(value: string): string {

        if (value && value.length === 2) {
            return this.language = value.toLowerCase()
        }
        else throw new CustomError('invalid_language_code')
    }

    setCountry(value: string): string {

        if (value && value.length === 2) {
            return this.country = value.toUpperCase()
        }
        else throw new CustomError('invalid_country_code')
    }

    same(locale: Locale): boolean {
        if (!locale) {
            return false
        }
        return (this.language === locale.language && this.country === locale.country)
    }

    sameLanguage(locale: Locale): boolean {
        if (!locale) {
            return false
        }
        return (this.language === locale.language)
    }

    toString() {
        return `${this.language}-${this.country}`
    }

    static create(value: string): Locale {

        if (!value) {
            return undefined
        }

        // en-US (iso-3166 & iso-639)
        const match = value.match(/^([a-z]{2})-([a-z]{2})$/i)
        const matchLanguage = value.match(/^([a-z]{2})$/i)

        console.log(match, value)

        if (match && match.length) {

            const locale = new Locale()
            locale.setLanguage(match[1])
            locale.setCountry(match[2])
            return locale
        }
        else if (matchLanguage && matchLanguage.length) {

            const locale = new Locale()
            locale.setLanguage(matchLanguage[1])
            locale.setCountry(matchLanguage[2])
            return locale
        }
        else throw new CustomError('invalid_locale')
    }
}