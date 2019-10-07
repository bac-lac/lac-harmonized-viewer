export function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}
export function root(element) {
    if (!element) {
        return undefined;
    }
    if (element.parentElement) {
        return root(element.parentElement);
    }
    else {
        return element;
    }
}
export function load(key) {
    var value = window.localStorage.getItem(key);
    if (value) {
        return value;
    }
    else {
        return undefined;
    }
}
export function save(key, value) {
    window.localStorage.setItem(key, value);
}
