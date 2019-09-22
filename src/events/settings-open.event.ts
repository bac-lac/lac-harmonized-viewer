import { IEvent } from "~/common/events";

export class SettingsOpen implements IEvent {
    static type: string = 'settings-open';
    type: string = SettingsOpen.type;
}