
import LanguageDetector from 'i18next-browser-languagedetector';

export class Locale {



    async load(filename: string) {

        const response = await fetch(`./${filename}.json`)
        if (response.status === 200) {
            return await response.json()
        }
    }

    set(languageTag: string, ...items: any) {

    }

    overwrite(languageTag: string, ...items: any) {

    }



}