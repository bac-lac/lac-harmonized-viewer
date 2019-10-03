export async function getLocaleComponentStrings(element: HTMLElement): Promise<any> {

    let componentName = element.tagName.toLowerCase();
    let componentLanguage = getComponentClosestLanguage(element);
    let strings;

    try {
        strings = await fetchLocaleStringsForComponent(componentLanguage);
    } catch (e) {
        console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
        strings = await fetchLocaleStringsForComponent('en');
    }

    return strings;
}

function getComponentClosestLanguage(element: HTMLElement): string {

    let closestElement = element.closest('[lang]') as HTMLElement;
    return closestElement ? closestElement.lang : 'en';
}

export function fetchLocaleStringsForComponent(locale: string): Promise<any> {

    return new Promise((resolve, reject): void => {
        fetch(`/locales/${locale}.json`)
            .then((result) => {
                if (result.ok) resolve(result.json());
                else reject();
            }, () => reject());
    });
}
