import { ActionTypes, TypeKeys } from "../actions/index";

const getInitialState = (): ManifestState => {
    return {
        fetching: false,
        fetched: false,
        error: null,
        manifest: null
    };
}

const manifest = (state = getInitialState(), action: ActionTypes): ManifestState => {

    switch (action.type) {
        case TypeKeys.FETCHING_MANIFEST: {
            return { ...state, fetching: true, error: null };
        }
        case TypeKeys.SET_MANIFEST: {
            return { ...state, fetching: false, fetched: true, manifest: action.manifest };
        }
        case TypeKeys.RAISE_MANIFEST_ERROR: {
            return { ...state, fetching: false, fetched: false, error: action.error, manifest: null}
        }
    }

    return state;
}

export default manifest