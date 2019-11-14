export function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}
export function getInstance(element) {
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
export function id(length = 8, alphabet = "0123456789abcdefghijklmnopqrstuvwxyz") {
    let id = "";
    for (var i = 0; i < length; i++) {
        let charIndex = Math.round(Math.random() * alphabet.length);
        id += alphabet[charIndex];
    }
    return id;
}
export function parseContentType(value) {
    const matches = value.match(/([a-z0-9]+)\/([a-z0-9]+)/g);
    if (!matches || matches.length == 0) {
        return null;
    }
    else {
        return matches[0];
    }
}
export function animate(element, animation, callback) {
    if (!element || !animation) {
        return undefined;
    }
    element.classList.add('animated', animation);
    const handleAnimationEnd = () => {
        element.classList.remove('animated', animation);
        element.removeEventListener('animationend', handleAnimationEnd);
        console.log('anim end');
        if (callback)
            callback();
    };
    element.addEventListener('animationend', handleAnimationEnd);
}
