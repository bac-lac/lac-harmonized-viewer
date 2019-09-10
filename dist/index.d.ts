/// <reference types="node" />
import { EventEmitter } from "events";
export declare class HarmonizedViewer {
    element: Element;
    events: EventEmitter;
    constructor(id: string);
}
export declare function harmonizedViewer(id: string): HarmonizedViewer;
