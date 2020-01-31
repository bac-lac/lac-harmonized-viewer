// Found => string value
// Not found => undefined
export function getLanguageKvpValue(localizedKvpArray: DocumentLabel[], lang: string, fallbackLang: string = 'en'): string {
    const result = localizedKvpArray.find(kvp => kvp.locale === lang);
    if (result) {
        return result.value;
    }
    
    // Check for code alternatives
    // Ex: lang = "en",  metadata locales: "en-GB"
    const languageCode = lang.length > 2 ? lang.substring(0,2) : lang;
    const alternativeResult = localizedKvpArray.find(kvp => kvp.locale.startsWith(languageCode));
    if (alternativeResult) {
        return alternativeResult.value;
    }

    const defaultResult = localizedKvpArray.find(kvp => kvp.locale === fallbackLang);
    return defaultResult ? defaultResult.value : undefined;
}