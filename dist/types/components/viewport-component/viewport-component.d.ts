import { EventEmitter } from '../../stencil.core';
import { Unsubscribe, Store } from '@stencil/redux';
import { toggleDrawer } from '../../store/actions/viewport';
export declare class ViewportComponent {
    el: HTMLElement;
    store: Store;
    toggleDrawer: typeof toggleDrawer;
    storeUnsubscribe: Unsubscribe;
    suppressGallery: boolean;
    numberOfItems: number;
    currentItem: DocumentPage;
    updatedEvent: EventEmitter;
    componentWillLoad(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    render(): any;
}
