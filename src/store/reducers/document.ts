import { ActionTypes, TypeKeys } from "../actions/index";
import { DocumentState } from "../../interfaces";
import { id } from "../../utils/utils";
import { Locale } from "../../services/i18n/locale";

const getInitialState = (): DocumentState => {

    return {
        alternateFormats: [],
        annotations: [],
        contentType: null,
        document: null,
        error: null,
        loading: false,
        locale: Locale.create('en-US'),
        supportedLocales: [],
        options: [],
        overlays: [],
        page: 0,
        pageCount: 0,
        pages: [],
        tags: [],
        status: {
            code: 'initial',
            loading: false,
            error: null
        },
        url: null,
        viewport: {
            navigationPlacement: 'left'
        },
        zoom: {
            min: 0,
            max: 0,
            ratio: 0,
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
            return { ...state, status: { ...state.status, code: 'failed', loading: false, error: { code: action.code, message: action.message } } }
        }
        case TypeKeys.SET_LOADING: {
            return { ...state, status: { ...state.status, loading: action.loading } }
        }
        case TypeKeys.SET_STATUS: {

            return { ...state, status: { ...state.status, loading: (action.code == 'prefetching' || action.code == 'loading'), code: action.code } }
        }
        case TypeKeys.SET_LOCALE: {
            return { ...state, locale: action.locale }
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
            return { ...state, document: { ...state.document, title: action.title } }
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
        case TypeKeys.SET_OPTIONS: {
            return { ...state, options: [...state.options, { component: action.component, name: action.name, value: action.value }] }
        }
        case TypeKeys.SET_ZOOM: {
            return { ...state, zoom: action.zoom }
        }
        case TypeKeys.SET_ZOOM_REQUEST: {
            return { ...state, zoomRequest: action.zoom }
        }
        case TypeKeys.ADD_OVERLAY: {
            return { ...state, overlays: [...state.overlays, { id: id(), x: action.x, y: action.y, width: action.width, height: action.height, text: action.text }] }
        }
        case TypeKeys.CLEAR_OVERLAYS: {
            return { ...state, overlays: [] }
        }
        case TypeKeys.SET_VIEWPORT: {
            return { ...state, viewport: action.viewport }
        }
    }
    return state
}

export default document