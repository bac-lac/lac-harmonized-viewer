import { TypeKeys } from "../actions/index";
const getInitialState = () => {
    return {
        fetching: false,
        fetched: false,
        error: null,
        manifest: null
    };
};
const manifest = (state = getInitialState(), action) => {
    switch (action.type) {
        case TypeKeys.FETCHING_MANIFEST: {
            return Object.assign(Object.assign({}, state), { fetching: true, error: null });
        }
        case TypeKeys.SET_MANIFEST: {
            return Object.assign(Object.assign({}, state), { fetching: false, fetched: true, manifest: action.manifest });
        }
        case TypeKeys.RAISE_MANIFEST_ERROR: {
            return Object.assign(Object.assign({}, state), { fetching: false, fetched: false, error: action.error, manifest: null });
        }
    }
    return state;
};
export default manifest;
