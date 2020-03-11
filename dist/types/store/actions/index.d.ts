import { SetOptions, SetZoom, SetZoomRequest, SetError, AddOverlay, ClearOverlays, SetConfiguration, SetLanguage, SetTheme, AddLanguage } from './document';
import { FetchingManifest, SetManifest, RaiseManifestError } from './manifest';
import { ViewItem, LoadView, ToggleFullscreen, ToggleDrawer } from './viewport';
export interface NullAction {
    type: TypeKeys.NULL;
}
export declare type ActionTypes = NullAction | SetError | AddLanguage | SetLanguage | SetTheme | SetOptions | SetZoom | SetZoomRequest | AddOverlay | ClearOverlays | SetConfiguration | FetchingManifest | SetManifest | RaiseManifestError | ViewItem | LoadView | ToggleFullscreen | ToggleDrawer;
export declare enum TypeKeys {
    NULL = "NULL",
    ERROR = "ERROR",
    SET_ERROR = "SET_ERROR",
    ADD_LANGUAGE = "ADD_LANGUAGE",
    SET_LANGUAGE = "SET_LANGUAGE",
    ADD_THEME = "ADD_THEME",
    SET_THEME = "SET_THEME",
    SET_OPTIONS = "SET_OPTIONS",
    SET_ZOOM = "SET_ZOOM",
    SET_ZOOM_REQUEST = "SET_ZOOM_REQUEST",
    ADD_OVERLAY = "ADD_OVERLAY",
    CLEAR_OVERLAYS = "CLEAR_OVERLAYS",
    SET_CONFIGURATION = "SET_CONFIGURATION",
    FETCHING_MANIFEST = "FETCHING_MANIFEST",
    SET_MANIFEST = "SET_MANIFEST",
    RAISE_MANIFEST_ERROR = "RAISE_MANIFEST_ERROR",
    VIEW_ITEM = "VIEW_ITEM",
    LOAD_VIEW = "LOAD_VIEW",
    TOGGLE_DRAWER = "TOGGLE_DRAWER",
    TOGGLE_FULLSCREEN = "TOGGLE_FULLSCREEN"
}
