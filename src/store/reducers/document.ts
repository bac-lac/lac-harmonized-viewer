import { ActionTypes, TypeKeys } from "../actions/index";

const getInitialState = (): DocumentState => {

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
    }
}

const document = (state = getInitialState(), action: ActionTypes): DocumentState => {

    switch (action.type) {
        case TypeKeys.SET_CONFIGURATION: {
            return { ...state, configuration: action.configuration }
        }
        case TypeKeys.SET_ERROR: {
            return { ...state, error: { code: action.errorCode, severity: action.severity, optionalParameters: action.optionalParameters } }
        }
        case TypeKeys.SET_LANGUAGE: {
            return { ...state, language: state.availableLanguages.find(i => i.code && i.code == action.language) }
        }
        case TypeKeys.SET_THEME: {
            return { ...state, theme: action.theme }
        }
        case TypeKeys.SET_OPTIONS: {
            return { ...state, options: [...state.options, { component: action.component, name: action.name, value: action.value }] }
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
    }
    return state
}

export default document