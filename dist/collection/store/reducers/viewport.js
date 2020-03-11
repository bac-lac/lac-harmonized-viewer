import { TypeKeys } from "../actions/index";
const getInitialState = () => {
    return {
        title: [],
        metadata: [],
        itemIndex: 0,
        items: [],
        fullscreen: false,
        infoShown: false
    };
};
const viewport = (state = getInitialState(), action) => {
    switch (action.type) {
        case TypeKeys.VIEW_ITEM: {
            return Object.assign(Object.assign({}, state), { itemIndex: action.index });
        }
        case TypeKeys.LOAD_VIEW: {
            return Object.assign(Object.assign({}, state), { title: action.title, metadata: action.metadata, itemIndex: action.index, items: action.items });
        }
        case TypeKeys.TOGGLE_FULLSCREEN: {
            return Object.assign(Object.assign({}, state), { fullscreen: !state.fullscreen });
        }
        case TypeKeys.TOGGLE_DRAWER: {
            return Object.assign(Object.assign({}, state), { infoShown: !state.infoShown });
        }
    }
    return state;
};
export default viewport;
