import "../../utils/icon-library";
import { Unsubscribe, Store } from '@stencil/redux';
export declare class PdfComponent {
    el: HTMLElement;
    storeUnsubscribe: Unsubscribe;
    loading: MyAppState["document"]["loading"];
    url: MyAppState["document"]["url"];
    store: Store;
    componentWillLoad(): void;
    componentDidUnload(): void;
    render(): any;
}
