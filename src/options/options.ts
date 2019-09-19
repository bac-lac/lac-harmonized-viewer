import { SidebarOptions } from "./sidebar.options";
import { ViewportOptions } from "./viewport.options";

export interface HarmonizedViewerOptions {

    manifest: string;
    
    navigation: SidebarOptions;
    annotations: SidebarOptions;
    viewport: ViewportOptions;

}