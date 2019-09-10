import { EventEmitter } from "events";
import { Component } from ".";

export class RootComponent extends Component implements IRootComponent {
    events: EventEmitter;
}

export interface IRootComponent {
    events: EventEmitter;
}