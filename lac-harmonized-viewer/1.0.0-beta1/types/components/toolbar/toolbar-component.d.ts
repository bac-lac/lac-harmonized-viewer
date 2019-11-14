import { Unsubscribe, Store } from '@stencil/redux';
import { setPage } from '../../store/actions/document';
export declare class HVToolbar {
    el: HTMLElement;
    setPage: typeof setPage;
    storeUnsubscribe: Unsubscribe;
    loading: MyAppState["document"]["loading"];
    page: MyAppState["document"]["page"];
    pageCount: MyAppState["document"]["pageCount"];
    alternateFormats: MyAppState["document"]["alternateFormats"];
    store: Store;
    componentWillLoad(): void;
    componentDidUnload(): void;
    isFirst(): boolean;
    isLast(): boolean;
    handleHomeClick(): void;
    handlePreviousClick(): void;
    handleNextClick(): void;
    handleFullscreenClick(): void;
    handleAlternateFormatClick(): void;
    handleDropdownClick(ev: MouseEvent): void;
    render(): any;
}
