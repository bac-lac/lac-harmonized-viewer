import { ActionTypes, TypeKeys } from "../actions/index";

const getInitialState = (): DocumentState => {
    return {
        stateUrl: null
    };
};

const document = (state = getInitialState(), action: ActionTypes): DocumentState => {
    switch (action.type) {
        case TypeKeys.SET_DOCUMENT_URL: {
            return { ...state, stateUrl: action.stateUrl };
        }
    }
    return state;
};

export default document;