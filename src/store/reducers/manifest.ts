import { ActionTypes, TypeKeys } from "../actions/index";
import "manifesto.js";

const getInitialState = (): ManifestState => {
    return null
}

const manifest = (state = getInitialState(), action: ActionTypes): ManifestState => {

    switch (action.type) {
        case TypeKeys.SET_MANIFEST: {
            return { ...getInitialState(), ...action.manifest }
        }
    }

    return state
}

export default manifest