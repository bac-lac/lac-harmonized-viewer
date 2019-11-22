import * as i18n from "./locales/index"

export const AppConfig: AppConfig = {

    languages: [
        i18n.locales.en,
        i18n.locales.fr
    ],

    contentTypes: [
        { contentType: 'image/jpeg', component: 'openseadragon' },
        { contentType: 'application/pdf', component: 'embed' },
        { contentType: 'video/mp4', component: 'video' }
    ],

    errors: [
        { code: 'e-document-notfound', severity: 'fatal' },
        { code: 'e-contenttype-unmapped', severity: 'fatal' }
    ]
}