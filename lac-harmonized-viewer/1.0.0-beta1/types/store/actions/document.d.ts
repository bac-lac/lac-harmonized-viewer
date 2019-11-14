import { TypeKeys } from "./index";
export interface SetError {
    type: TypeKeys.SET_ERROR;
    code: string;
    message: string;
}
export declare const setError: (code: string, message: string) => (dispatch: any, _getState: any) => void;
export interface SetDocumentContentType {
    type: TypeKeys.SET_DOCUMENT_CONTENT_TYPE;
    contentType: string;
}
export declare const setDocumentContentType: (contentType: string) => (dispatch: any, _getState: any) => void;
export interface SetLoading {
    type: TypeKeys.SET_LOADING;
    loading: boolean;
}
export declare const setLoading: (loading: boolean) => (dispatch: any, _getState: any) => void;
export interface SetStatus {
    type: TypeKeys.SET_STATUS;
    code: StatusCode;
}
export declare const setStatus: (code: StatusCode) => (dispatch: any, _getState: any) => void;
export interface SetLocale {
    type: TypeKeys.SET_LOCALE;
    locale: string;
}
export declare const setLocale: (locale: string) => (dispatch: any, _getState: any) => void;
export interface AddLocale {
    type: TypeKeys.ADD_LOCALE;
    locale: string;
}
export declare const addLocale: (locale: string) => (dispatch: any, _getState: any) => void;
export interface SetDocumentUrl {
    type: TypeKeys.SET_DOCUMENT_URL;
    url: string;
}
export declare const setDocumentUrl: (url: string) => (dispatch: any, _getState: any) => void;
export interface SetDocumentPages {
    type: TypeKeys.SET_DOCUMENT_PAGES;
    pages: DocumentPage[];
}
export declare const setDocumentPages: (pages: DocumentPage[]) => (dispatch: any, _getState: any) => void;
export interface SetDocumentTitle {
    type: TypeKeys.SET_DOCUMENT_TITLE;
    label: DocumentLabel[];
}
export declare const setDocumentTitle: (label: DocumentLabel[]) => (dispatch: any, _getState: any) => void;
export interface SetDocumentAlternateFormats {
    type: TypeKeys.SET_DOCUMENT_ALTERNATE_FORMATS;
    alternateFormats: DocumentAlternateFormat[];
}
export declare const setDocumentAlternateFormats: (alternateFormats: DocumentAlternateFormat[]) => (dispatch: any, _getState: any) => void;
export interface SetPage {
    type: TypeKeys.SET_PAGE;
    page: number;
}
export declare const setPage: (page: number) => (dispatch: any, _getState: any) => void;
export interface SetAnnotations {
    type: TypeKeys.SET_ANNOTATIONS;
    annotations: DocumentAnnotation[];
}
export declare const setAnnotations: (annotations: DocumentAnnotation[]) => (dispatch: any, _getState: any) => void;
export interface SetOptions {
    type: TypeKeys.SET_OPTIONS;
    component: string;
    name: string;
    value: any;
}
export declare const setOptions: (component: string, name: string, value: any) => (dispatch: any, _getState: any) => void;
export interface SetZoom {
    type: TypeKeys.SET_ZOOM;
    zoom: DocumentZoom;
}
export declare const setZoom: (zoom: DocumentZoom) => (dispatch: any, _getState: any) => void;
export interface SetZoomRequest {
    type: TypeKeys.SET_ZOOM_REQUEST;
    zoom: DocumentZoom;
}
export declare const setZoomRequest: (zoom: DocumentZoom) => (dispatch: any, _getState: any) => void;
export interface SetViewport {
    type: TypeKeys.SET_VIEWPORT;
    viewport: Viewport;
}
export declare const setViewport: (viewport: Viewport) => (dispatch: any, _getState: any) => void;
export interface AddOverlay {
    type: TypeKeys.ADD_OVERLAY;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
}
export declare const addOverlay: (x: number, y: number, width: number, height: number, text: string) => (dispatch: any, _getState: any) => void;
export interface ClearOverlays {
    type: TypeKeys.CLEAR_OVERLAYS;
}
export declare const clearOverlays: () => (dispatch: any, _getState: any) => void;
