export class ConfigurationService {

    static save(key: string, value: string) {
        if(!key || !value) {
            return undefined;
        }
        window.localStorage.setItem(key, value);
    }

    static load(key: string): string {
        if(!key) {
            return undefined;
        }
        return window.localStorage.getItem(key);
    }

}