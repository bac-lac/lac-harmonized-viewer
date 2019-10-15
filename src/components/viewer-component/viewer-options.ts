import { TopbarOptions } from "../topbar-component/topbar-options";
import { NavigationOptions } from "../navigation/navigation-options";

export class HarmonizedViewerOptions {

    topbar: TopbarOptions = {
        show: true
    }

    navigation: NavigationOptions = {
        height: 200,
        location: LocationOption.Left,
        show: true
    }

}

export enum LocationOption {
    Top = "top",
    Left = "left",
    Right = "right",
    Bottom = "bottom"
}