import { IEvent } from "~/common/events";

export class LanguageChange implements IEvent {
    static type: string = 'language-change';
    type: string = LanguageChange.type;

    private language: string;

    constructor(language: string) {
        this.language = language;
    }
}