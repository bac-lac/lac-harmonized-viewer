export declare class SettingsComponent {
    el: HTMLElement;
    language: string;
    private locale;
    componentWillLoad(): Promise<import("i18next").TFunction>;
    componentDidLoad(): void;
    apply(): void;
    render(): any;
}
