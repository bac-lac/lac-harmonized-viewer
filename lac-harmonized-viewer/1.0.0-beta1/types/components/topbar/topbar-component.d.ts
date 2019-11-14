import { Store, Unsubscribe } from '@stencil/redux';
import { setViewport } from '../../store/actions/document';
export declare class TopbarComponent {
    el: HTMLElement;
    backgroundColor: string;
    store: Store;
    locale: MyAppState["document"]["locale"];
    title: MyAppState["document"]["document"]["label"];
    viewport: MyAppState["document"]["viewport"];
    setViewport: typeof setViewport;
    storeUnsubscribe: Unsubscribe;
    private topAppBar?;
    private menuDisplay?;
    private elemSettings?;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    handleDisplayClick(): void;
    handleDisplaySelectionChange(placement: PlacementType, ev: any): void;
    openSettings(): void;
    render(): any;
}
