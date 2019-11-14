import { TypeKeys } from "../actions/index";
import { id } from "../../utils/utils";
const getInitialState = () => {
    return {
        alternateFormats: [],
        annotations: [],
        contentType: null,
        document: null,
        error: null,
        loading: false,
        locale: 'en',
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
    };
};
const document = (state = getInitialState(), action) => {
    switch (action.type) {
        case TypeKeys.SET_ERROR: {
            return Object.assign(Object.assign({}, state), { status: Object.assign(Object.assign({}, state.status), { code: 'failed', loading: false, error: { code: action.code, message: action.message } }) });
        }
        case TypeKeys.SET_LOADING: {
            return Object.assign(Object.assign({}, state), { status: Object.assign(Object.assign({}, state.status), { loading: action.loading }) });
        }
        case TypeKeys.SET_STATUS: {
            return Object.assign(Object.assign({}, state), { status: Object.assign(Object.assign({}, state.status), { loading: (action.code == 'prefetching' || action.code == 'loading'), code: action.code }) });
        }
        case TypeKeys.SET_LOCALE: {
            return Object.assign(Object.assign({}, state), { locale: action.locale });
        }
        case TypeKeys.SET_DOCUMENT_CONTENT_TYPE: {
            return Object.assign(Object.assign({}, state), { contentType: action.contentType });
        }
        case TypeKeys.SET_DOCUMENT_URL: {
            return Object.assign(Object.assign({}, state), { url: action.url });
        }
        case TypeKeys.SET_DOCUMENT_PAGES: {
            return Object.assign(Object.assign({}, state), { pages: action.pages, page: 0, pageCount: action.pages.length });
        }
        case TypeKeys.SET_DOCUMENT_TITLE: {
            return Object.assign(Object.assign({}, state), { document: Object.assign(Object.assign({}, state.document), { label: action.label }) });
        }
        case TypeKeys.SET_DOCUMENT_ALTERNATE_FORMATS: {
            return Object.assign(Object.assign({}, state), { alternateFormats: action.alternateFormats });
        }
        case TypeKeys.SET_PAGE: {
            if (action.page < 0 || action.page > (state.pageCount - 1)) {
                return state;
            }
            else {
                return Object.assign(Object.assign({}, state), { page: action.page });
            }
        }
        case TypeKeys.SET_ANNOTATIONS: {
            return Object.assign(Object.assign({}, state), { annotations: action.annotations });
        }
        case TypeKeys.SET_OPTIONS: {
            return Object.assign(Object.assign({}, state), { options: [...state.options, { component: action.component, name: action.name, value: action.value }] });
        }
        case TypeKeys.SET_ZOOM: {
            return Object.assign(Object.assign({}, state), { zoom: action.zoom });
        }
        case TypeKeys.SET_ZOOM_REQUEST: {
            return Object.assign(Object.assign({}, state), { zoomRequest: action.zoom });
        }
        case TypeKeys.ADD_LOCALE: {
            return Object.assign(Object.assign({}, state), { supportedLocales: [...state.supportedLocales, action.locale] });
        }
        case TypeKeys.ADD_OVERLAY: {
            return Object.assign(Object.assign({}, state), { overlays: [...state.overlays, { id: id(), x: action.x, y: action.y, width: action.width, height: action.height, text: action.text }] });
        }
        case TypeKeys.CLEAR_OVERLAYS: {
            return Object.assign(Object.assign({}, state), { overlays: [] });
        }
        case TypeKeys.SET_VIEWPORT: {
            return Object.assign(Object.assign({}, state), { viewport: action.viewport });
        }
    }
    return state;
};
export default document;
