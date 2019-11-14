var TypeKeys;
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
})(TypeKeys || (TypeKeys = {}));

const setError = (code, message) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_ERROR,
        code: code,
        message: message
    };
    dispatch(action);
};
const setDocumentContentType = (contentType) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_CONTENT_TYPE,
        contentType: contentType
    };
    dispatch(action);
};
const setLoading = (loading) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_LOADING,
        loading: loading
    };
    dispatch(action);
};
const setStatus = (code) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_STATUS,
        code: code
    };
    dispatch(action);
};
const setLocale = (locale) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_LOCALE,
        locale: locale
    };
    dispatch(action);
};
const addLocale = (locale) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.ADD_LOCALE,
        locale: locale
    };
    dispatch(action);
};
const setDocumentUrl = (url) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_URL,
        url: url
    };
    dispatch(action);
};
const setDocumentPages = (pages) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_PAGES,
        pages: pages
    };
    dispatch(action);
};
const setDocumentTitle = (label) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_TITLE,
        label: label
    };
    dispatch(action);
};
const setDocumentAlternateFormats = (alternateFormats) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_DOCUMENT_ALTERNATE_FORMATS,
        alternateFormats: alternateFormats
    };
    dispatch(action);
};
const setPage = (page) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_PAGE,
        page: page
    };
    dispatch(action);
};
const setAnnotations = (annotations) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_ANNOTATIONS,
        annotations: annotations
    };
    dispatch(action);
};
const setOptions = (component, name, value) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_OPTIONS,
        component: component,
        name: name,
        value: value
    };
    dispatch(action);
};
const setZoom = (zoom) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_ZOOM,
        zoom: zoom
    };
    dispatch(action);
};
const setZoomRequest = (zoom) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_ZOOM_REQUEST,
        zoom: zoom
    };
    dispatch(action);
};
const setViewport = (viewport) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_VIEWPORT,
        viewport: viewport
    };
    dispatch(action);
};
const addOverlay = (x, y, width, height, text) => (dispatch, _getState) => {
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
const clearOverlays = () => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.CLEAR_OVERLAYS
    };
    dispatch(action);
};

export { TypeKeys as T, setError as a, setStatus as b, setDocumentUrl as c, setDocumentPages as d, setDocumentTitle as e, setDocumentAlternateFormats as f, setAnnotations as g, setZoom as h, clearOverlays as i, setViewport as j, addLocale as k, addOverlay as l, setDocumentContentType as m, setLocale as n, setOptions as o, setLoading as p, setZoomRequest as q, setPage as s };
