import { Store, Unsubscribe } from '@stencil/redux';
export declare class TabsComponent {
    el: HTMLElement;
    language: MyAppState["document"]["language"];
    store: Store;
    storeUnsubscribe: Unsubscribe;
    private tabBar;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    findTabs(): HTMLHarmonizedTabElement[];
    render(): any;
}
