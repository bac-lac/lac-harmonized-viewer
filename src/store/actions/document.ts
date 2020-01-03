import { TypeKeys } from "./index"
import i18next from "i18next"
import { loadPersistedState, savePersistedState } from "../../services/persisted-state-service"
import { AppConfig } from "../../app.config"

export interface SetError {
    type: TypeKeys.SET_ERROR
    errorCode: ErrorCode
    severity: ErrorSeverity,
    optionalParameters: DocumentErrorParameter[]
}
export const setError = (errorCode: ErrorCode, ...optionalParameters: DocumentErrorParameter[]) => (dispatch, _getState) => {

    const error = AppConfig.errors.find(i => i.code && i.code == errorCode)
    if (error) {
        const action: SetError = {
            type: TypeKeys.SET_ERROR,
            errorCode: error.code,
            severity: error.severity,
            optionalParameters: optionalParameters
        }
        dispatch(action)
    }
}

export interface SetTheme {
    type: TypeKeys.SET_THEME
    theme: string
}
export const setTheme = (theme: string) => (dispatch, _getState) => {

    // Update persisted state
    const persistedState = loadPersistedState()
    persistedState.theme = theme
    savePersistedState(persistedState)

    // Dispatch store command
    const action: SetTheme = {
        type: TypeKeys.SET_THEME,
        theme: theme
    }
    dispatch(action)
}

export interface SetLanguage {
    type: TypeKeys.SET_LANGUAGE
    language: string
}
export const setLanguage = (language: string) => (dispatch, _getState) => {

    i18next.changeLanguage(language, (err, t) => {
        if (err) {
            console.error(err)
        }
        else {

            // Update persisted state
            const persistedState = loadPersistedState()
            persistedState.language = language
            savePersistedState(persistedState)

            // Dispatch store command
            const action: SetLanguage = {
                type: TypeKeys.SET_LANGUAGE,
                language: language
            }
            dispatch(action)
        }
    })
}

export interface AddLanguage {
    type: TypeKeys.ADD_LANGUAGE
    code: string
    name: string
}
export const addLanguage = (code: string, name: string) => (dispatch, _getState) => {
    const action: AddLanguage = {
        type: TypeKeys.ADD_LANGUAGE,
        code: code,
        name: name
    }
    dispatch(action)
}


export interface SetOptions {
    type: TypeKeys.SET_OPTIONS
    component: string
    name: string
    value: any
}
export const setOptions = (component: string, name: string, value: any) => (dispatch, _getState) => {
    const action: SetOptions = {
        type: TypeKeys.SET_OPTIONS,
        component: component,
        name: name,
        value: value
    }
    dispatch(action)
}

export interface SetZoom {
    type: TypeKeys.SET_ZOOM
    zoom: DocumentZoom
}
export const setZoom = (zoom: DocumentZoom) => (dispatch, _getState) => {
    const action: SetZoom = {
        type: TypeKeys.SET_ZOOM,
        zoom: zoom
    }
    dispatch(action)
}

export interface SetZoomRequest {
    type: TypeKeys.SET_ZOOM_REQUEST
    zoom: DocumentZoom
}
export const setZoomRequest = (zoom: DocumentZoom) => (dispatch, _getState) => {
    const action: SetZoomRequest = {
        type: TypeKeys.SET_ZOOM_REQUEST,
        zoom: zoom
    }
    dispatch(action)
}

export interface SetConfiguration {
    type: TypeKeys.SET_CONFIGURATION,
    configuration: Configuration
}
export const setConfiguration = (configuration: Configuration) => (dispatch, _getState) => {
    const action: SetConfiguration = {
        type: TypeKeys.SET_CONFIGURATION,
        configuration: configuration
    }
    dispatch(action)
}

export interface AddOverlay {
    type: TypeKeys.ADD_OVERLAY
    id: string,
    x: number,
    y: number,
    width: number,
    height: number
}
export const addOverlay = (x: number, y: number, width: number, height: number) => (dispatch, _getState) => {
    const action: AddOverlay = {
        type: TypeKeys.ADD_OVERLAY,
        id: 'abc',
        x: x,
        y: y,
        width: width,
        height: height
    }
    dispatch(action)
}

export interface ClearOverlays {
    type: TypeKeys.CLEAR_OVERLAYS
}
export const clearOverlays = () => (dispatch, _getState) => {
    const action: ClearOverlays = {
        type: TypeKeys.CLEAR_OVERLAYS
    }
    dispatch(action)
}