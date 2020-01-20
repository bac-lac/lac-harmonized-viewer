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

export function id(length: number = 8, alphabet: string = "0123456789abcdefghijklmnopqrstuvwxyz"): string {
    let id = "";
    for (var i = 0; i < length; i++) {
        let charIndex = Math.round(Math.random() * alphabet.length);
        id += alphabet[charIndex];
    }
    return id;
}

export function parseContentType(value: string): string {
    const matches = value.match(/([a-z0-9+-]+)\/([a-z0-9+-]+)/g)
    if (!matches || matches.length == 0) {
        return null
    }
    else {
        return matches[0]
    }
}

export function animate(element: Element, animation: string, callback?: () => void) {

    if (!element || !animation) {
        return undefined
    }

    element.classList.add('animated', animation)

    const handleAnimationEnd = () => {

        element.classList.remove('animated', animation)
        element.removeEventListener('animationend', handleAnimationEnd)

        if (callback) callback()
    }

    element.addEventListener('animationend', handleAnimationEnd)
}

// To support IE11
export function addEventListenerToRunOnce(target: Element, eventName: string, callback: Function) {
    target.addEventListener(eventName, function onetime() {
        target.removeEventListener(eventName, onetime);
        callback();
    });
}