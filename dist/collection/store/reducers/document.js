import { TypeKeys } from "../actions/index";
const getInitialState = () => {
    return {
        configuration: null,
        error: null,
        language: null,
        availableLanguages: [],
        options: [],
        overlays: [],
        tags: [],
        theme: 'light',
        themes: ['light', 'dark']
    };
};
const document = (state = getInitialState(), action) => {
    switch (action.type) {
        case TypeKeys.SET_CONFIGURATION: {
            return Object.assign(Object.assign({}, state), { configuration: action.configuration });
        }
        case TypeKeys.SET_ERROR: {
            return Object.assign(Object.assign({}, state), { error: { code: action.errorCode, severity: action.severity, optionalParameters: action.optionalParameters } });
        }
        case TypeKeys.SET_LANGUAGE: {
            return Object.assign(Object.assign({}, state), { language: state.availableLanguages.find(i => i.code && i.code == action.language) });
        }
        case TypeKeys.SET_THEME: {
            return Object.assign(Object.assign({}, state), { theme: action.theme });
        }
        case TypeKeys.SET_OPTIONS: {
            return Object.assign(Object.assign({}, state), { options: [...state.options, { component: action.component, name: action.name, value: action.value }] });
        }
        case TypeKeys.ADD_LANGUAGE: {
            return Object.assign(Object.assign({}, state), { availableLanguages: [...state.availableLanguages, { code: action.code, name: action.name }] });
        }
        case TypeKeys.ADD_OVERLAY: {
            return Object.assign(Object.assign({}, state), { overlays: [...state.overlays, { id: action.id, x: action.x, y: action.y, width: action.width, height: action.height }] });
        }
        case TypeKeys.CLEAR_OVERLAYS: {
            return Object.assign(Object.assign({}, state), { overlays: [] });
        }
    }
    return state;
};
export default document;
