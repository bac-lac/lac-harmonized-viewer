import { IEvent } from "~/common/events";

export class FormatChange implements IEvent {
    static type: string = 'format-change';
    type: string = FormatChange.type;

    contentType: string;

    constructor(contentType: string) {
        this.contentType = contentType;
    }
}