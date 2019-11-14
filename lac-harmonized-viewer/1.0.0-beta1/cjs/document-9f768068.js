'use strict';

(function (TypeKeys) {
    // Won't match anything
    TypeKeys["NULL"] = "NULL";
    TypeKeys["ERROR"] = "ERROR";
    TypeKeys["SET_ERROR"] = "SET_ERROR";
    TypeKeys["SET_LOADING"] = "SET_LOADING";
    TypeKeys["SET_STATUS"] = "SET_STATUS";
    TypeKeys["ADD_LOCALE"] = "ADD_LOCALE";
    TypeKeys["SET_LOCALE"] = "SET_LOCALE";
    TypeKeys["SET_DOCUMENT_CONTENT_TYPE"] = "SET_DOCUMENT_CONTENT_TYPE";
    TypeKeys["SET_DOCUMENT_URL"] = "SET_DOCUMENT_URL";
    TypeKeys["SET_DOCUMENT_PAGES"] = "SET_DOCUMENT_PAGES";
    TypeKeys["SET_DOCUMENT_TITLE"] = "SET_DOCUMENT_TITLE";
    TypeKeys["SET_DOCUMENT_ALTERNATE_FORMATS"] = "SET_DOCUMENT_ALTERNATE_FORMATS";
    TypeKeys["SET_PAGE"] = "SET_PAGE";
    TypeKeys["SET_ANNOTATIONS"] = "SET_ANNOTATIONS";
    TypeKeys["SET_OPTIONS"] = "SET_OPTIONS";
    TypeKeys["SET_ZOOM"] = "SET_ZOOM";
    TypeKeys["SET_ZOOM_REQUEST"] = "SET_ZOOM_REQUEST";
    TypeKeys["ADD_OVERLAY"] = "ADD_OVERLAY";
    TypeKeys["CLEAR_OVERLAYS"] = "CLEAR_OVERLAYS";
    TypeKeys["SET_VIEWPORT"] = "SET_VIEWPORT";
})(exports.TypeKeys || (exports.TypeKeys = {}));

const setError = (code, message) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_ERROR,
        code: code,
        message: message
    };
    dispatch(action);
};
const setDocumentContentType = (contentType) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_DOCUMENT_CONTENT_TYPE,
        contentType: contentType
    };
    dispatch(action);
};
const setLoading = (loading) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_LOADING,
        loading: loading
    };
    dispatch(action);
};
const setStatus = (code) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_STATUS,
        code: code
    };
    dispatch(action);
};
const setLocale = (locale) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_LOCALE,
        locale: locale
    };
    dispatch(action);
};
const addLocale = (locale) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.ADD_LOCALE,
        locale: locale
    };
    dispatch(action);
};
const setDocumentUrl = (url) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_DOCUMENT_URL,
        url: url
    };
    dispatch(action);
};
const setDocumentPages = (pages) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_DOCUMENT_PAGES,
        pages: pages
    };
    dispatch(action);
};
const setDocumentTitle = (label) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_DOCUMENT_TITLE,
        label: label
    };
    dispatch(action);
};
const setDocumentAlternateFormats = (alternateFormats) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_DOCUMENT_ALTERNATE_FORMATS,
        alternateFormats: alternateFormats
    };
    dispatch(action);
};
const setPage = (page) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_PAGE,
        page: page
    };
    dispatch(action);
};
const setAnnotations = (annotations) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_ANNOTATIONS,
        annotations: annotations
    };
    dispatch(action);
};
const setOptions = (component, name, value) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_OPTIONS,
        component: component,
        name: name,
        value: value
    };
    dispatch(action);
};
const setZoom = (zoom) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_ZOOM,
        zoom: zoom
    };
    dispatch(action);
};
const setZoomRequest = (zoom) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_ZOOM_REQUEST,
        zoom: zoom
    };
    dispatch(action);
};
const setViewport = (viewport) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.SET_VIEWPORT,
        viewport: viewport
    };
    dispatch(action);
};
const addOverlay = (x, y, width, height, text) => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.ADD_OVERLAY,
        x: x,
        y: y,
        width: width,
        height: height,
        text: text
    };
    dispatch(action);
};
const clearOverlays = () => (dispatch, _getState) => {
    const action = {
        type: exports.TypeKeys.CLEAR_OVERLAYS
    };
    dispatch(action);
};

exports.addLocale = addLocale;
exports.addOverlay = addOverlay;
exports.clearOverlays = clearOverlays;
exports.setAnnotations = setAnnotations;
exports.setDocumentAlternateFormats = setDocumentAlternateFormats;
exports.setDocumentContentType = setDocumentContentType;
exports.setDocumentPages = setDocumentPages;
exports.setDocumentTitle = setDocumentTitle;
exports.setDocumentUrl = setDocumentUrl;
exports.setError = setError;
exports.setLoading = setLoading;
exports.setLocale = setLocale;
exports.setOptions = setOptions;
exports.setPage = setPage;
exports.setStatus = setStatus;
exports.setViewport = setViewport;
exports.setZoom = setZoom;
exports.setZoomRequest = setZoomRequest;
