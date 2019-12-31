import { SetLoading, SetDocumentContentType, SetDocumentUrl, SetDocumentPages, SetDocumentTitle, SetDocumentAlternateFormats, SetPage, SetAnnotations, AddAnnotation, SetOptions, SetZoom, SetZoomRequest, SetError, SetStatus, AddOverlay, ClearOverlays, SetConfiguration, SetLanguage, SetTheme, AddLanguage, EnterFullscreen, ExitFullscreen, ToggleDrawer, AddCustomResolver } from "./document";
import { SetManifest } from "./manifest";

export interface NullAction {
    type: TypeKeys.NULL
}

// Keep this type updated with each known action
export type ActionTypes = NullAction | SetError | SetLoading | SetStatus | AddLanguage | SetLanguage | SetTheme | SetDocumentContentType | SetDocumentUrl | SetDocumentPages | SetDocumentTitle | SetDocumentAlternateFormats | SetPage | SetAnnotations | AddAnnotation | SetOptions | SetZoom | SetZoomRequest | AddOverlay | ClearOverlays | SetConfiguration | EnterFullscreen | ExitFullscreen | ToggleDrawer | AddCustomResolver | SetManifest

export enum TypeKeys {
    // Won't match anything
    NULL = "NULL",
    ERROR = "ERROR",
    SET_ERROR = "SET_ERROR",
    SET_LOADING = "SET_LOADING",
    SET_STATUS = "SET_STATUS",
    ADD_LANGUAGE = "ADD_LANGUAGE",
    SET_LANGUAGE = "SET_LANGUAGE",
    ADD_THEME = "ADD_THEME",
    SET_THEME = "SET_THEME",
    SET_DOCUMENT_CONTENT_TYPE = "SET_DOCUMENT_CONTENT_TYPE",
    SET_DOCUMENT_URL = "SET_DOCUMENT_URL",
    SET_DOCUMENT_PAGES = "SET_DOCUMENT_PAGES",
    SET_DOCUMENT_TITLE = "SET_DOCUMENT_TITLE",
    SET_DOCUMENT_ALTERNATE_FORMATS = "SET_DOCUMENT_ALTERNATE_FORMATS",
    SET_PAGE = "SET_PAGE",
    SET_ANNOTATIONS = "SET_ANNOTATIONS",
    ADD_ANNOTATION = "ADD_ANNOTATION",
    SET_OPTIONS = "SET_OPTIONS",
    SET_ZOOM = "SET_ZOOM",
    SET_ZOOM_REQUEST = "SET_ZOOM_REQUEST",
    ADD_OVERLAY = "ADD_OVERLAY",
    CLEAR_OVERLAYS = "CLEAR_OVERLAYS",
    SET_CONFIGURATION = "SET_CONFIGURATION",
    ENTER_FULLSCREEN = "ENTER_FULLSCREEN",
    EXIT_FULLSCREEN = "EXIT_FULLSCREEN",
    TOGGLE_DRAWER = "TOGGLE_DRAWER",
    ADD_CUSTOM_RESOLVER = "ADD_CUSTOM_RESOLVER",
    SET_MANIFEST = "SET_MANIFEST"
}