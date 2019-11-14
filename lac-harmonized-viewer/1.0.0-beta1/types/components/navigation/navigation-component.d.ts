import 'manifesto.js';
import { Unsubscribe, Store } from '@stencil/redux';
import { setPage } from '../../store/actions/document';
export declare class NavigationComponent {
    el: HTMLElement;
    cols: number;
    rows: number;
    placement: PlacementType;
    handleRowsChange(): void;
    setPage: typeof setPage;
    storeUnsubscribe: Unsubscribe;
    loading: MyAppState["document"]["loading"];
    locale: MyAppState["document"]["locale"];
    page: MyAppState["document"]["page"];
    pages: MyAppState["document"]["pages"];
    store: Store;
    loadedImageCount: number;
    componentWillLoad(): void;
    componentDidUnload(): void;
    componentDidLoad(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    handleThumbnailClick(page: number): void;
    handleThumbnailLoad(ev: Event): void;
    handleResize(): void;
    resize(): any;
    getListTopOffset(): number;
    getComputedStyle(element: Element, name: string): number;
    render(): any;
}
