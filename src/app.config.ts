import * as i18n from "./locales/index"

export const AppConfig: AppConfig = {

    languages: [
        i18n.locales.en,
        i18n.locales.fr
    ],

    contentTypes: [
        { formats: ['application/json', 'application/ld+json', 'text/plain', 'image/jpeg'], component: 'openseadragon' },
        { formats: ['application/pdf'], component: 'embed' },
        { formats: ['video/mp4', 'application/vnd.ms-sstr+xml'], component: 'video' }
    ],

    errors: [
        { code: 'request-failed', severity: 'fatal' },
        { code: 'request-failed-notfound', severity: 'fatal' },
        { code: 'contenttype-unsupported', severity: 'fatal' }
    ]
}