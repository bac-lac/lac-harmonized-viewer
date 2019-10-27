import { TypeKeys } from "./index"
import { DocumentPage, DocumentAnnotation, DocumentAlternateFormat, DocumentZoom } from "../../interfaces"

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
    title: string
}
export const setDocumentTitle = (title: string) => (dispatch, _getState) => {
    const action: SetDocumentTitle = {
        type: TypeKeys.SET_DOCUMENT_TITLE,
        title: title
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