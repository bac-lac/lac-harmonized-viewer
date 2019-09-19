import { IEvent } from "~/common/events";

export class SidebarClose implements IEvent {
    static type: string = 'sidebar-close';
    type: string = SidebarClose.type;
}