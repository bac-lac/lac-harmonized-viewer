import { TypeKeys } from "./index";
export interface SetError {
    type: TypeKeys.SET_ERROR;
    errorCode: ErrorCode;
    severity: ErrorSeverity;
    optionalParameters: DocumentErrorParameter[];
}
export declare const setError: (errorCode: ErrorCode, ...optionalParameters: DocumentErrorParameter[]) => (dispatch: any, _getState: any) => void;
export interface SetTheme {
    type: TypeKeys.SET_THEME;
    theme: string;
}
export declare const setTheme: (theme: string) => (dispatch: any, _getState: any) => void;
export interface SetLanguage {
    type: TypeKeys.SET_LANGUAGE;
    language: string;
}
export declare const setLanguage: (language: string) => (dispatch: any, _getState: any) => void;
export interface AddLanguage {
    type: TypeKeys.ADD_LANGUAGE;
    code: string;
    name: string;
}
export declare const addLanguage: (code: string, name: string) => (dispatch: any, _getState: any) => void;
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
export interface SetConfiguration {
    type: TypeKeys.SET_CONFIGURATION;
    configuration: Configuration;
}
export declare const setConfiguration: (configuration: Configuration) => (dispatch: any, _getState: any) => void;
export interface AddOverlay {
    type: TypeKeys.ADD_OVERLAY;
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare const addOverlay: (x: number, y: number, width: number, height: number) => (dispatch: any, _getState: any) => void;
export interface ClearOverlays {
    type: TypeKeys.CLEAR_OVERLAYS;
}
export declare const clearOverlays: () => (dispatch: any, _getState: any) => void;
