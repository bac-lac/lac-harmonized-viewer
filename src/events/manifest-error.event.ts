import { IEvent } from "~/common/events";

export class ManifestError implements IEvent {
    static type: string = 'manifest-error';
    type: string = ManifestError.type;

    error: Error;
    constructor(error: Error) {
        this.error = error;
    }
}