import { ComponentBase } from "./base.component";
import { events } from "../event";

export abstract class Component extends ComponentBase implements IComponent {

    on<T>(eventName: string, listener: (eventArgs?: T) => void): void {
        events.on(eventName, (args: T) => listener(args));
    }

    publish<T>(eventName: string, eventArgs?: T): boolean {
        return events.emit(eventName, eventArgs);
    }

}

export interface IComponent {
    on<T>(eventName: string, listener: (eventArgs?: T) => void): void;
    publish<T>(eventName: string, eventArgs?: T): boolean;
}