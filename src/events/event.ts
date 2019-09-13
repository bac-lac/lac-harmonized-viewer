import { EventEmitter } from "events";

export interface IEvent {
    readonly name: string;
}
export type TEvent = IEvent;

export class ManifestError implements IEvent {
    name: string = 'manifest-error';
    error: Error;
    constructor(error: Error) {
        this.error = error;
    }
}

export class ManifestLoad implements IEvent {
    name: string = 'manifest-load';
    manifest: Manifesto.Manifest;
    constructor(manifest: Manifesto.Manifest) {
        this.manifest = manifest;
    }
}

export class CanvasLoad implements IEvent {
    name: string = 'canvas-load';
    sequenceIndex: number;
    canvasIndex: number;
    constructor(sequenceIndex: number, canvasIndex: number) {
        this.sequenceIndex = sequenceIndex;
        this.canvasIndex = canvasIndex;
    }
}

export class PageLoaded implements IEvent {
    name: string = 'page-loaded';
    page: number;
    constructor(page: number) {
        this.page = page;
    }
}

export class NavigationToggle implements IEvent {
    name: string = 'navigation-toggle';
}

export class GoToPage implements IEvent {
    name: string = 'goto-page';
    page: number;
    constructor(page: number) {
        this.page = page;
    }
}

export class ZoomChange implements IEvent {
    name: string = 'zoom-change';
    zoom: number;
    percentage: number;
    constructor(zoom: number, percentage: number) {
        this.zoom = zoom;
        this.percentage = percentage;
    }
}

export var eventSource: EventEmitter = new EventEmitter();