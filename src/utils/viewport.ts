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