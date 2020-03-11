import { AppConfig } from '../app.config';
export function resolveViewportType(contentType) {
    if (!contentType) {
        return undefined;
    }
    if (!AppConfig.contentTypes) {
        return undefined;
    }
    const mapping = AppConfig.contentTypes.find(i => i.formats && i.formats.includes(contentType));
    if (!mapping || !mapping.component) {
        return undefined;
    }
    return mapping.component.toLowerCase();
}
export function isBeforeIE11() {
    const msie = window.navigator.userAgent.indexOf('MSIE ');
    return msie > 0;
}
export function isIE11() {
    const trident = window.navigator.userAgent.indexOf('Trident/');
    return trident > 0;
}
