export class LocalStorage {

    set(key: string, value: string) {

        if (!key) {
            return undefined
        }

        window.localStorage.setItem(key, value)
    }

    get(key: string) {

        if (!key) {
            return undefined
        }

        return window.localStorage.getItem(key)
    }
}