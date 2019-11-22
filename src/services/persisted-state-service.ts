const HV_PERSISTED_STATE_STORAGE_KEY = 'harmonized-viewer'

const defaultSettings: HVPersistedState = {
    language: 'en'
}

export function loadPersistedState(): HVPersistedState {
    const value = localStorage.getItem(HV_PERSISTED_STATE_STORAGE_KEY)
    return (value ? JSON.parse(value) : defaultSettings)
}

export function savePersistedState(value: HVPersistedState): void {
    localStorage.setItem(HV_PERSISTED_STATE_STORAGE_KEY, JSON.stringify(value))
}