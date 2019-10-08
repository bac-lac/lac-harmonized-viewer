/// <reference types="node" />
import i18n from "i18next";
import { EventEmitter } from "events";
export declare class Locale {
    languageChanged: EventEmitter;
    private languages;
    init(): Promise<i18n.TFunction>;
    all(): string[];
    change(language: string): any;
    get(): string;
    static resolve(language: string, available: string[]): string;
    map(languageMap: Manifesto.LanguageMap): Manifesto.Language;
    load(filename: string): Promise<any>;
    label(key: string, locale?: string): string;
}
export interface Locale {
    id: string;
    displayName: string;
    labels: string[];
}
