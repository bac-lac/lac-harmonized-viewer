import { Locale } from "./locale";

export interface Label {
    key: string
    value: string
}

export interface LabelMap {
    locale: Locale
    value: string
}