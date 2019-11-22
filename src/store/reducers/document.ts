import { ActionTypes, TypeKeys } from "../actions/index";

const getInitialState = (): DocumentState => {

    return {
        alternateFormats: [],
        annotations: [],
        contentType: null,
        document: null,
        error: null,
        loading: false,
        language: null,
        availableLanguages: [],
        fullscreen: false,
        options: [],
        overlays: [],
        page: 0,
        pageCount: 0,
        pages: [],
        customResolvers: [],
        tags: [],
        status: {
            code: 'initial',
            loading: false,
            error: null,
            visible: false
        },
        url: null,
        viewport: {
            navigationEnable: true,
            navigationPlacement: 'left',
            pagingEnable: true
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
            return { ...state, status: { ...state.status, code: 'failed', loading: false, error: { code: action.errorCode, severity: action.severity, parameters: action.optionalParams } } }
        }
        case TypeKeys.SET_LOADING: {
            return { ...state, status: { ...state.status, loading: action.loading } }
        }
        case TypeKeys.SET_STATUS: {
            return { ...state, status: { ...state.status, loading: (action.code == 'prefetching' || action.code == 'loading'), code: action.code } }
        }
        case TypeKeys.SET_LANGUAGE: {
            return { ...state, language: state.availableLanguages.find(i => i.code && i.code == action.language) }
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
            return { ...state, document: { ...state.document, label: action.label } }
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
        case TypeKeys.ADD_LANGUAGE: {
            return { ...state, availableLanguages: [...state.availableLanguages, { code: action.code, name: action.name }] }
        }
        case TypeKeys.ADD_OVERLAY: {
            return { ...state, overlays: [...state.overlays, { id: action.id, x: action.x, y: action.y, width: action.width, height: action.height }] }
        }
        case TypeKeys.CLEAR_OVERLAYS: {
            return { ...state, overlays: [] }
        }
        case TypeKeys.ENTER_FULLSCREEN: {
            return { ...state, fullscreen: true }
        }
        case TypeKeys.EXIT_FULLSCREEN: {
            return { ...state, fullscreen: false }
        }
        case TypeKeys.SET_VIEWPORT: {
            return { ...state, viewport: action.viewport }
        }
        case TypeKeys.ADD_CUSTOM_RESOLVER: {
            return { ...state, customResolvers: [...state.customResolvers, action.id] }
        }
    }
    return state
}

export default document