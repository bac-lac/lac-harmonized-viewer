import { SetLoading, SetDocumentContentType, SetDocumentUrl, SetDocumentPages, SetDocumentTitle, SetDocumentAlternateFormats, SetPage, SetAnnotations, SetOptions, SetZoom, SetZoomRequest, SetError, SetStatus, AddOverlay, ClearOverlays, SetViewport, SetLocale, AddLocale } from "./document";
export interface NullAction {
    type: TypeKeys.NULL;
}
export declare type ActionTypes = NullAction | SetError | SetLoading | SetStatus | AddLocale | SetLocale | SetDocumentContentType | SetDocumentUrl | SetDocumentPages | SetDocumentTitle | SetDocumentAlternateFormats | SetPage | SetAnnotations | SetOptions | SetZoom | SetZoomRequest | AddOverlay | ClearOverlays | SetViewport;
export declare enum TypeKeys {
    NULL = "NULL",
    ERROR = "ERROR",
    SET_ERROR = "SET_ERROR",
    SET_LOADING = "SET_LOADING",
    SET_STATUS = "SET_STATUS",
    ADD_LOCALE = "ADD_LOCALE",
    SET_LOCALE = "SET_LOCALE",
    SET_DOCUMENT_CONTENT_TYPE = "SET_DOCUMENT_CONTENT_TYPE",
    SET_DOCUMENT_URL = "SET_DOCUMENT_URL",
    SET_DOCUMENT_PAGES = "SET_DOCUMENT_PAGES",
    SET_DOCUMENT_TITLE = "SET_DOCUMENT_TITLE",
    SET_DOCUMENT_ALTERNATE_FORMATS = "SET_DOCUMENT_ALTERNATE_FORMATS",
    SET_PAGE = "SET_PAGE",
    SET_ANNOTATIONS = "SET_ANNOTATIONS",
    SET_OPTIONS = "SET_OPTIONS",
    SET_ZOOM = "SET_ZOOM",
    SET_ZOOM_REQUEST = "SET_ZOOM_REQUEST",
    ADD_OVERLAY = "ADD_OVERLAY",
    CLEAR_OVERLAYS = "CLEAR_OVERLAYS",
    SET_VIEWPORT = "SET_VIEWPORT"
}
