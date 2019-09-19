import { IEvent } from "~/common/events";

export class PageNext implements IEvent {
    static type: string = 'page-next';
    type: string = PageNext.type;
}