import { ActionTypes, TypeKeys } from "../actions/index";

const getInitialState = (): DocumentState => {
    return {
        contentType: null,
        url: null
    };
};

const document = (state = getInitialState(), action: ActionTypes): DocumentState => {
    switch (action.type) {
        case TypeKeys.SET_DOCUMENT_URL: {
            return { ...state, contentType: action.contentType, url: action.url };
        }
    }
    return state;
};

export default document;