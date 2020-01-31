import { ActionTypes, TypeKeys } from "../actions/index";

const getInitialState = (): ViewportState => {

    return {
        title: [],
        metadata: [],
        itemIndex: 0,
        items: [],
        fullscreen: false,
        infoShown: false
    }
}

const viewport = (state = getInitialState(), action: ActionTypes): ViewportState => {

    switch (action.type) {
        case TypeKeys.VIEW_ITEM: {
            return { ...state, itemIndex: action.index };
        }
        case TypeKeys.LOAD_VIEW: {
            return { ...state, title: action.title, metadata: action.metadata, itemIndex: action.index, items: action.items };
        }
        case TypeKeys.TOGGLE_FULLSCREEN: {
            return { ...state, fullscreen: !state.fullscreen }
        }
        case TypeKeys.TOGGLE_DRAWER: {
            return { ...state, infoShown: !state.infoShown };
        }
    }
    return state
}

export default viewport