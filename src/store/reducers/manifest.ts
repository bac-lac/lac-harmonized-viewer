import { ActionTypes, TypeKeys } from "../actions/index";

const getInitialState = (): ManifestState => {
    return {
        fetching: false,
        fetched: false,
        manifest: null
    };
}

const manifest = (state = getInitialState(), action: ActionTypes): ManifestState => {

    switch (action.type) {
        case TypeKeys.FETCHING_MANIFEST: {
            return { ...state, fetching: true };
        }
        case TypeKeys.SET_MANIFEST: {
            return { ...state, fetching: false, fetched: true, manifest: action.manifest };
        }
    }

    return state;
}

export default manifest