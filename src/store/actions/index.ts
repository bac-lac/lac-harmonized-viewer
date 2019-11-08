import { SetLoading, SetDocumentContentType, SetDocumentUrl, SetDocumentPages, SetDocumentTitle, SetDocumentAlternateFormats, SetPage, SetAnnotations, SetOptions, SetZoom, SetZoomRequest, SetError, SetStatus, AddTag } from "./document";

export interface NullAction {
    type: TypeKeys.NULL
}

// Keep this type updated with each known action
export type ActionTypes = NullAction | SetError | SetLoading | SetStatus | SetDocumentContentType | SetDocumentUrl | SetDocumentPages | SetDocumentTitle | SetDocumentAlternateFormats | SetPage | SetAnnotations | SetOptions | SetZoom | SetZoomRequest | AddTag

export enum TypeKeys {
    // Won't match anything
    NULL = "NULL",
    ERROR = "ERROR",
    SET_ERROR = "SET_ERROR",
    SET_LOADING = "SET_LOADING",
    SET_STATUS = "SET_STATUS",
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
    ADD_TAG = "ADD_TAG"
}