import * as i18n from "./locales/index"

export const AppConfig: AppConfig = {

    languages: [
        i18n.locales.en,
        i18n.locales.fr
    ],

    contentTypes: [
        { formats: ['application/json', 'application/ld+json', 'text/plain', 'image/jpeg'], component: 'image' },
        { formats: ['application/pdf'], component: 'pdf' },
        { formats: ['audio/mp4', 'video/mp4', 'application/vnd.ms-sstr+xml'], component: 'video' },
        { formats: ['audio/mpeg', 'audio/wav', 'audio/ogg'], component: 'audio' }
    ],

    errors: [
        { code: 'manifest-not-found', severity: 'fatal' },
        { code: 'manifest-incorrect-format', severity: 'fatal' },
        { code: 'request-failed',  severity: 'fatal' },
        { code: 'request-failed-notfound', severity: 'fatal' },
        { code: 'contenttype-unsupported',  severity: 'fatal' }
    ]
}