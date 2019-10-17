
export function format(first: string, middle: string, last: string): string {
    return (
        (first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : '')
    );
}

export function getInstance(element: HTMLElement): HTMLElement {
    if (!element) {
        return undefined;
    }
    if (element.parentElement) {
        return getInstance(element.parentElement);
    }
    else {
        return element;
    }
}

export function load(key: string): any {
    var value = window.localStorage.getItem(key);
    if (value) {
        return value;
    }
    else {
        return undefined;
    }
}

export function save(key: string, value: string): void {
    window.localStorage.setItem(key, value);
}

export function id(length: number = 8, alphabet: string = "0123456789abcdefghijklmnopqrstuvwxyz"): string {
    let id = "";
    for (var i = 0; i < length; i++) {
        let charIndex = Math.round(Math.random() * alphabet.length);
        id += alphabet[charIndex];
    }
    return id;
}