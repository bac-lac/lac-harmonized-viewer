export interface Locale {
    code: string;
    name: string;
    default: boolean;
    content: LocaleContent;
}

export interface LocaleContent {
    labels: string[];
}