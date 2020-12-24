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


export function isPDFChildExist(): boolean {
    let isExist = false;
    const hv = document.querySelector('harmonized-viewer')
    const vp = hv.shadowRoot.children;
    for (var x = 0; x < vp.length; x++) {
        if (vp[x].className != '') {
            var vp1 = vp[x].children
            for (var x1 = 0; x1 < vp1.length; x1++) {
                if (vp1[x1].tagName == 'HARMONIZED-NAVIGATION-CHILD') {
                    console.log(vp1[x1].className);
                    if (vp1[x1].className.includes('show')) {
                        isExist =  true;
                    }
                    break;
                }
            }
        }
    }
    return isExist;
}

export function getPdfImageElement(element: HTMLCollection, hasPdfPages: boolean): HTMLElement {
    var imageElement: HTMLElement;
    console.log('getpdfImmageElement');
    console.log(element);
    for (var x = 0; x < element.length; x++) {
        console.log(element[x].tagName);
        if (element[x].tagName == 'HARMONIZED-IMAGE-LIST') {
            const imagesEl = element[x].children
            for (var y = 0; y < imagesEl.length; y++) {
                const el2 = imagesEl[y].children
                const imageListEl = el2[0].children
                for (var z = 0; z < imageListEl.length; z++) {
                    if (imageListEl[z].tagName == 'IMG') {
                        console.log(imageListEl[z]);
                        const imgSrc = imageListEl[z].getAttribute('src');
                        console.log(imgSrc);
                        if (imgSrc.includes('placeholder-pdf')) {
                            imageElement = imageListEl[z] as HTMLElement;
                            break;
                        }
                    }
                }
            }
        }
        return imageElement;
    }
}