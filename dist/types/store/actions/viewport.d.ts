import { TypeKeys } from "./index";
export interface ViewItem {
    type: TypeKeys.VIEW_ITEM;
    index: number;
}
export declare const viewItem: (index: number) => (dispatch: any, _getState: any) => void;
export interface LoadView {
    type: TypeKeys.LOAD_VIEW;
    title: DocumentLabel[];
    metadata: DocumentMetadata[];
    index: number;
    items: DocumentPage[];
}
export declare const loadView: (title: DocumentLabel[], metadata: DocumentMetadata[], items: DocumentPage[]) => (dispatch: any, _getState: any) => void;
export interface ToggleFullscreen {
    type: TypeKeys.TOGGLE_FULLSCREEN;
}
export declare const toggleFullscreen: (element?: Element) => (dispatch: any, _getState: any) => void;
export interface ToggleDrawer {
    type: TypeKeys.TOGGLE_DRAWER;
}
export declare const toggleDrawer: () => (dispatch: any, _getState: any) => void;
