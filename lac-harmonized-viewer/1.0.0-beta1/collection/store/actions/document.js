import { TypeKeys } from "./index";
export const setError = (code, message) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_ERROR,
        code: code,
        message: message
    };
    dispatch(action);
};
export const setDocumentContentType = (contentType) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_CONTENT_TYPE,
        contentType: contentType
    };
    dispatch(action);
};
export const setLoading = (loading) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_LOADING,
        loading: loading
    };
    dispatch(action);
};
export const setStatus = (code) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_STATUS,
        code: code
    };
    dispatch(action);
};
export const setLocale = (locale) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_LOCALE,
        locale: locale
    };
    dispatch(action);
};
export const addLocale = (locale) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.ADD_LOCALE,
        locale: locale
    };
    dispatch(action);
};
export const setDocumentUrl = (url) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_URL,
        url: url
    };
    dispatch(action);
};
export const setDocumentPages = (pages) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_PAGES,
        pages: pages
    };
    dispatch(action);
};
export const setDocumentTitle = (label) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_TITLE,
        label: label
    };
    dispatch(action);
};
export const setDocumentAlternateFormats = (alternateFormats) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_ALTERNATE_FORMATS,
        alternateFormats: alternateFormats
    };
    dispatch(action);
};
export const setPage = (page) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_PAGE,
        page: page
    };
    dispatch(action);
};
export const setAnnotations = (annotations) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_ANNOTATIONS,
        annotations: annotations
    };
    dispatch(action);
};
export const setOptions = (component, name, value) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_OPTIONS,
        component: component,
        name: name,
        value: value
    };
    dispatch(action);
};
export const setZoom = (zoom) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_ZOOM,
        zoom: zoom
    };
    dispatch(action);
};
export const setZoomRequest = (zoom) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_ZOOM_REQUEST,
        zoom: zoom
    };
    dispatch(action);
};
export const setViewport = (viewport) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_VIEWPORT,
        viewport: viewport
    };
    dispatch(action);
};
export const addOverlay = (x, y, width, height, text) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.ADD_OVERLAY,
        x: x,
        y: y,
        width: width,
        height: height,
        text: text
    };
    dispatch(action);
};
export const clearOverlays = () => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.CLEAR_OVERLAYS
    };
    dispatch(action);
};
