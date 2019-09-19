import { IEvent } from "~/common/events";

export class PageLoad implements IEvent {
    static type: string = 'page-load';
    type: string = PageLoad.type;

    page: number;

    constructor(page: number) {
        this.page = page;
    }
}