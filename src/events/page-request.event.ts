import { IEvent } from "~/common/events";

export class PageRequest implements IEvent {
    static type: string = 'page-request';
    type: string = PageRequest.type;

    page: number;

    constructor(page: number) {
        this.page = page;
    }
}