import { Unsubscribe, Store } from '@stencil/redux';
import { setLocale, addLocale } from '../../store/actions/document';
import '../../services/i18n-service';
export declare class SettingsComponent {
    el: HTMLElement;
    locale: MyAppState["document"]["locale"];
    supportedLocales: MyAppState["document"]["supportedLocales"];
    language: string;
    store: Store;
    addLocale: typeof addLocale;
    setLocale: typeof setLocale;
    storeUnsubscribe: Unsubscribe;
    private dialog;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    open(): Promise<void>;
    handleApplyClick(): void;
    render(): any;
}
