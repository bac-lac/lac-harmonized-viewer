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

export interface SetDocumentContentType {
    type: TypeKeys.SET_DOCUMENT_CONTENT_TYPE
    contentType: string
}
export const setDocumentContentType = (contentType: string) => (dispatch, _getState) => {
    const action: SetDocumentContentType = {
        type: TypeKeys.SET_DOCUMENT_CONTENT_TYPE,
        contentType: contentType
    }
    dispatch(action)
}

export interface SetLoading {
    type: TypeKeys.SET_LOADING
    loading: boolean
}
export const setLoading = (loading: boolean) => (dispatch, _getState) => {
    const action: SetLoading = {
        type: TypeKeys.SET_LOADING,
        loading: loading
    }
    dispatch(action)
}

export interface SetStatus {
    type: TypeKeys.SET_STATUS
    code: StatusCode
}
export const setStatus = (code: StatusCode) => (dispatch, _getState) => {
    const action: SetStatus = {
        type: TypeKeys.SET_STATUS,
        code: code
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

export interface SetDocumentUrl {
    type: TypeKeys.SET_DOCUMENT_URL
    url: string
}
export const setDocumentUrl = (url: string) => (dispatch, _getState) => {
    const action: SetDocumentUrl = {
        type: TypeKeys.SET_DOCUMENT_URL,
        url: url
    }
    dispatch(action)
}

export interface SetDocumentPages {
    type: TypeKeys.SET_DOCUMENT_PAGES
    pages: DocumentPage[]
}
export const setDocumentPages = (pages: DocumentPage[]) => (dispatch, _getState) => {
    const action: SetDocumentPages = {
        type: TypeKeys.SET_DOCUMENT_PAGES,
        pages: pages
    }
    dispatch(action)
}

export interface SetDocumentTitle {
    type: TypeKeys.SET_DOCUMENT_TITLE
    label: DocumentLabel[]
}
export const setDocumentTitle = (label: DocumentLabel[]) => (dispatch, _getState) => {
    const action: SetDocumentTitle = {
        type: TypeKeys.SET_DOCUMENT_TITLE,
        label: label
    }
    dispatch(action)
}

export interface SetDocumentAlternateFormats {
    type: TypeKeys.SET_DOCUMENT_ALTERNATE_FORMATS
    alternateFormats: DocumentAlternateFormat[]
}
export const setDocumentAlternateFormats = (alternateFormats: DocumentAlternateFormat[]) => (dispatch, _getState) => {
    const action: SetDocumentAlternateFormats = {
        type: TypeKeys.SET_DOCUMENT_ALTERNATE_FORMATS,
        alternateFormats: alternateFormats
    }
    dispatch(action)
}

export interface SetPage {
    type: TypeKeys.SET_PAGE
    page: number
}
export const setPage = (page: number) => (dispatch, _getState) => {
    const action: SetPage = {
        type: TypeKeys.SET_PAGE,
        page: page
    }
    dispatch(action)
}

export interface SetAnnotations {
    type: TypeKeys.SET_ANNOTATIONS
    annotations: DocumentAnnotation[]
}
export const setAnnotations = (annotations: DocumentAnnotation[]) => (dispatch, _getState) => {
    const action: SetAnnotations = {
        type: TypeKeys.SET_ANNOTATIONS,
        annotations: annotations
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

export interface SetViewport {
    type: TypeKeys.SET_VIEWPORT,
    viewport: Viewport
}
export const setViewport = (viewport: Viewport) => (dispatch, _getState) => {
    const action: SetViewport = {
        type: TypeKeys.SET_VIEWPORT,
        viewport: viewport
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

export interface EnterFullscreen {
    type: TypeKeys.ENTER_FULLSCREEN
}
export const enterFullscreen = (element: Element) => (dispatch, _getState) => {
    element.requestFullscreen()
    const action: EnterFullscreen = {
        type: TypeKeys.ENTER_FULLSCREEN
    }
    dispatch(action)
}

export interface ExitFullscreen {
    type: TypeKeys.EXIT_FULLSCREEN
}
export const exitFullscreen = () => (dispatch, _getState) => {
    document.exitFullscreen()
    const action: ExitFullscreen = {
        type: TypeKeys.EXIT_FULLSCREEN
    }
    dispatch(action)
}

export interface AddCustomResolver {
    type: TypeKeys.ADD_CUSTOM_RESOLVER
    id: string
}
export const addCustomResolver = (id: string) => (dispatch, _getState) => {
    const action: AddCustomResolver = {
        type: TypeKeys.ADD_CUSTOM_RESOLVER,
        id: id
    }
    dispatch(action)
}