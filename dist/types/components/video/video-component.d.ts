import { EventEmitter } from '../../stencil.core';
import { Unsubscribe, Store } from '@stencil/redux';
export declare class VideoComponent {
    el: HTMLElement;
    store: Store;
    url: string;
    contentType: string;
    storeUnsubscribe: Unsubscribe;
    customVideoPlayer: boolean;
    customVideoPlayerRender: EventEmitter;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    componentDidUpdate(): void;
    render(): any;
}
