import { TypeKeys } from "./index";
import i18next from "i18next";
import { loadPersistedState, savePersistedState } from "../../services/persisted-state-service";
import { AppConfig } from "../../app.config";
export const setError = (errorCode, ...optionalParameters) => (dispatch, _getState) => {
    const error = AppConfig.errors.find(i => i.code && i.code == errorCode);
    if (error) {
        const action = {
            type: TypeKeys.SET_ERROR,
            errorCode: error.code,
            severity: error.severity,
            optionalParameters: optionalParameters
        };
        dispatch(action);
    }
};
export const setTheme = (theme) => (dispatch, _getState) => {
    // Update persisted state
    const persistedState = loadPersistedState();
    persistedState.theme = theme;
    savePersistedState(persistedState);
    // Dispatch store command
    const action = {
        type: TypeKeys.SET_THEME,
        theme: theme
    };
    dispatch(action);
};
export const setLanguage = (language) => (dispatch, _getState) => {
    i18next.changeLanguage(language, (err, t) => {
        if (err) {
            console.error(err);
        }
        else {
            // Update persisted state
            const persistedState = loadPersistedState();
            persistedState.language = language;
            savePersistedState(persistedState);
            // Dispatch store command
            const action = {
                type: TypeKeys.SET_LANGUAGE,
                language: language
            };
            dispatch(action);
        }
    });
};
export const addLanguage = (code, name) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.ADD_LANGUAGE,
        code: code,
        name: name
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
export const setConfiguration = (configuration) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_CONFIGURATION,
        configuration: configuration
    };
    dispatch(action);
};
export const addOverlay = (x, y, width, height) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.ADD_OVERLAY,
        id: 'abc',
        x: x,
        y: y,
        width: width,
        height: height
    };
    dispatch(action);
};
export const clearOverlays = () => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.CLEAR_OVERLAYS
    };
    dispatch(action);
};
