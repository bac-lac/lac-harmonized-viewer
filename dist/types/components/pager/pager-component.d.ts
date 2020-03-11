import { Unsubscribe, Store } from '@stencil/redux';
export declare class PagerComponent {
    el: HTMLElement;
    storeUnsubscribe: Unsubscribe;
    currentItemIndex: number;
    itemCount: number;
    marker: number;
    store: Store;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    componentDidRender(): void;
    render(): any;
}
