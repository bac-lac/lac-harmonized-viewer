import { IEvent } from "~/common/events";

export class PagePrevious implements IEvent {
    static type: string = 'page-previous';
    type: string = PagePrevious.type;
}