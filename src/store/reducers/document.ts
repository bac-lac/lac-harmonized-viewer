import { ActionTypes, TypeKeys } from "../actions/index";
import { DocumentState } from "../../interfaces";

const getInitialState = (): DocumentState => {
    return {
        error: null,
        alternateFormats: [],
        annotations: [],
        contentType: null,
        loading: false,
        page: 0,
        pageCount: 0,
        pages: [],
        title: null,
        url: null,
        zoom: {
            min: 0,
            max: 0,
            value: 0
        },
        zoomRequest: {
            min: 0,
            max: 0,
            value: 0
        }
    }
}

const document = (state = getInitialState(), action: ActionTypes): DocumentState => {

    switch (action.type) {
        case TypeKeys.SET_ERROR: {
            return { ...state, error: action.error }
        }
        case TypeKeys.SET_LOADING: {
            return { ...state, loading: action.loading }
        }
        case TypeKeys.SET_DOCUMENT_CONTENT_TYPE: {
            return { ...state, contentType: action.contentType }
        }
        case TypeKeys.SET_DOCUMENT_URL: {
            return { ...state, url: action.url }
        }
        case TypeKeys.SET_DOCUMENT_PAGES: {
            return { ...state, pages: action.pages, page: 0, pageCount: action.pages.length }
        }
        case TypeKeys.SET_DOCUMENT_TITLE: {
            return { ...state, title: action.title }
        }
        case TypeKeys.SET_DOCUMENT_ALTERNATE_FORMATS: {
            return { ...state, alternateFormats: action.alternateFormats }
        }
        case TypeKeys.SET_PAGE: {
            if (action.page < 0 || action.page > (state.pageCount - 1)) {
                return state
            }
            else {
                return { ...state, page: action.page }
            }
        }
        case TypeKeys.SET_ANNOTATIONS: {
            return { ...state, annotations: action.annotations }
        }
        case TypeKeys.SET_ZOOM: {
            return { ...state, zoom: action.zoom }
        }
        case TypeKeys.SET_ZOOM_REQUEST: {
            return { ...state, zoomRequest: action.zoom }
        }
    }
    return state
}

export default document