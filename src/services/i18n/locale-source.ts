import { Locale } from "./locale";
import { Label } from "./label";

export interface LocaleSource {
    locale: Locale
    name: string
    namespace?: string
    labels: Label[]
}