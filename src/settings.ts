import { ViewerSettings } from "./interfaces";

const settingsStorageKey = 'harmonized-viewer'

const defaultSettings: ViewerSettings = {
    locale: 'en',
    annotations: []
}

export function loadSettings(): ViewerSettings {
    const value = localStorage.getItem(settingsStorageKey)
    return (value ? JSON.parse(value) : defaultSettings)
}

export function saveSettings(settings: ViewerSettings): void {
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings))
}

export function saveLocale(locale: string): void {
    if (!locale) {
        return undefined
    }
    this.saveSetting('locale', locale)
}

export function saveSetting(name: string, value: any): void {
    const settings = loadSettings()
    settings[name] = value
    saveSettings(settings)
}

export function saveAnnotationVisibility(annotationId: string, visible: boolean) {

    if (!annotationId) {
        return undefined
    }

    const settings = loadSettings()
    const annotationState = settings.annotations
        .find(annotation => annotation.id === annotationId && annotationId)
    annotationState.visible = visible

    return annotationState
}