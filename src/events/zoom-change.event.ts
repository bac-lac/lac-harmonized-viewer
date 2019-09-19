import { IEvent } from "~/common/events";

export class ZoomChange implements IEvent {
    static type: string = 'zoom-change';
    type: string = ZoomChange.type;

    zoom: number;
    percentage: number;

    constructor(zoom: number, percentage: number) {
        this.zoom = zoom;
        this.percentage = percentage;
    }
}