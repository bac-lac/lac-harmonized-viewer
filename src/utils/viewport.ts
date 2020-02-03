import { AppConfig } from '../app.config';

export function resolveViewportType(contentType: string): ViewportType {
    if (!contentType) {
        return undefined
    }

    if (!AppConfig.contentTypes) {
        return undefined
    }

    const mapping = AppConfig.contentTypes.find(
        i => i.formats && i.formats.includes(contentType)
    );

    if (!mapping || !mapping.component) {
        return undefined;
    }

    return mapping.component.toLowerCase() as ViewportType;
}

export function isBeforeIE11(): boolean {
    const msie: number = window.navigator.userAgent.indexOf('MSIE ');
    return msie > 0
}

export function isIE11(): boolean {
    const trident: number =  window.navigator.userAgent.indexOf('Trident/');
    return trident > 0;
}