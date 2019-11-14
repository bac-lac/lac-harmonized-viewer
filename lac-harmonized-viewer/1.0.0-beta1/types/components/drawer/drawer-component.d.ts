export declare class DrawerComponent {
    el: HTMLElement;
    placement: string;
    toolbar: boolean;
    visible: boolean;
    private drawer;
    componentDidLoad(): void;
    componentDidUnload(): void;
    open(): Promise<void>;
    render(): any;
}
