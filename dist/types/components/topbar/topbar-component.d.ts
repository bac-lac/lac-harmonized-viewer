import { EventEmitter } from '../../stencil.core';
import { Store, Unsubscribe } from '@stencil/redux';
import { toggleFullscreen, toggleDrawer } from '../../store/actions/viewport';
export declare class TopbarComponent {
    el: HTMLElement;
    store: Store;
    title: MyAppState["viewport"]["title"];
    fullscreen: MyAppState["viewport"]["fullscreen"];
    infoShown: MyAppState["viewport"]["infoShown"];
    currentItemIndex: MyAppState['viewport']['itemIndex'];
    items: MyAppState['viewport']['items'];
    theme: MyAppState["document"]["theme"];
    toggleFullscreen: typeof toggleFullscreen;
    toggleDrawer: typeof toggleDrawer;
    storeUnsubscribe: Unsubscribe;
    fullscreenToggle: EventEmitter;
    updatedEvent: EventEmitter;
    private topAppBar?;
    private menuDisplay?;
    private menuLanguage?;
    private snackBar?;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    handleDisplayClick(): void;
    render(): any;
}
