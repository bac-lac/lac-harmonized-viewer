import { SidebarOptions } from "./sidebar.options";
import { ViewportOptions } from "./viewport.options";

export enum DisplayMode {
    OnePage = 1,
    TwoPages = 2
};

export interface HarmonizedViewerOptions {

    manifest: string;

    displayMode: DisplayMode;

    navigation: SidebarOptions;
    annotations: SidebarOptions;
    viewport: ViewportOptions;

}