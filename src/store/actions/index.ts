import { SetOptions, SetZoom, SetZoomRequest, SetError, AddOverlay, ClearOverlays, SetConfiguration, SetLanguage, SetTheme, AddLanguage } from './document';
import { FetchingManifest, SetManifest } from './manifest';
import { ViewItem, LoadView, ToggleFullscreen, ToggleDrawer } from './viewport';

export interface NullAction {
    type: TypeKeys.NULL
}

// Keep this type updated with each known action
export type ActionTypes = NullAction |
                SetError | AddLanguage | SetLanguage | SetTheme | SetOptions | SetZoom | SetZoomRequest | AddOverlay | ClearOverlays | SetConfiguration  |
                FetchingManifest | SetManifest |
                ViewItem | LoadView | ToggleFullscreen | ToggleDrawer;

export enum TypeKeys {
    // Won't match anything
    NULL = "NULL",

    // Document
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

    // Manifest
    FETCHING_MANIFEST = "FETCHING_MANIFEST",
    SET_MANIFEST = "SET_MANIFEST",
    
    // Viewport
    VIEW_ITEM = "VIEW_ITEM",
    LOAD_VIEW = "LOAD_VIEW",
    TOGGLE_DRAWER = "TOGGLE_DRAWER",
    TOGGLE_FULLSCREEN = "TOGGLE_FULLSCREEN",
}