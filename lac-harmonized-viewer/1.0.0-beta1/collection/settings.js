const settingsStorageKey = 'harmonized-viewer';
const defaultSettings = {
    locale: 'en',
    annotations: []
};
export function loadSettings() {
    const value = localStorage.getItem(settingsStorageKey);
    return (value ? JSON.parse(value) : defaultSettings);
}
export function saveSettings(settings) {
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
}
export function saveLocale(locale) {
    if (!locale) {
        return undefined;
    }
    this.saveSetting('locale', locale);
}
export function saveSetting(name, value) {
    const settings = loadSettings();
    settings[name] = value;
    saveSettings(settings);
}
export function saveAnnotationVisibility(annotationId, visible) {
    if (!annotationId) {
        return undefined;
    }
    const settings = loadSettings();
    const annotationState = settings.annotations
        .find(annotation => annotation.id === annotationId && annotationId);
    annotationState.visible = visible;
    return annotationState;
}
