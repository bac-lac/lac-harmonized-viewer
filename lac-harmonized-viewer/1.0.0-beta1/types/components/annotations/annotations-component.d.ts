import { Unsubscribe, Store } from '@stencil/redux';
export declare class AnnotationsComponent {
    el: HTMLElement;
    storeUnsubscribe: Unsubscribe;
    annotations: MyAppState["document"]["annotations"];
    store: Store;
    componentWillLoad(): void;
    componentDidUnload(): void;
    handleClick(ev: MouseEvent): void;
    render(): any;
    renderAnnotationClass(annotation: DocumentAnnotation): string;
}
