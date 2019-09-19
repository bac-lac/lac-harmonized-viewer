import { IEvent } from "~/common/events";

export class SidebarOpen implements IEvent {
    static type: string = 'sidebar-open';
    type: string = SidebarOpen.type;
}