export interface IEvent {
    type: string;
}

export type TEvent = IEvent;

export class NavigationToggle implements IEvent {
    static type: string = 'navigation-toggle';
    type: string = NavigationToggle.type;
}