const HV_PERSISTED_STATE_STORAGE_KEY = 'harmonized-viewer';
const defaultSettings = {
    language: 'en',
    theme: 'light'
};
export function loadPersistedState() {
    const value = localStorage.getItem(HV_PERSISTED_STATE_STORAGE_KEY);
    return (value ? JSON.parse(value) : defaultSettings);
}
export function savePersistedState(value) {
    localStorage.setItem(HV_PERSISTED_STATE_STORAGE_KEY, JSON.stringify(value));
}
