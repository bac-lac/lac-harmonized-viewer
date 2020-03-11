import { Unsubscribe, Store } from '@stencil/redux';
export declare class AnnotationsComponent {
    el: HTMLElement;
    store: Store;
    storeUnsubscribe: Unsubscribe;
    language: string;
    title: MyAppState['viewport']['title'];
    metadata: MyAppState['viewport']['metadata'];
    currentItem: DocumentPage;
    componentWillLoad(): void;
    componentDidUnload(): void;
    render(): any;
    private renderAnnotation;
}
