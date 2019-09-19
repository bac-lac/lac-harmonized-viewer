import { IEvent } from "~/common/events";

export class ManifestLoad implements IEvent {
    static type: string = 'manifest-load';
    type: string = ManifestLoad.type;

    manifest: Manifesto.Manifest;

    constructor(manifest: Manifesto.Manifest) {
        this.manifest = manifest;
    }
}