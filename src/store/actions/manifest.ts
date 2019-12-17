import { TypeKeys } from "./index"

export interface SetManifest {
    type: TypeKeys.SET_MANIFEST
    manifest: Manifesto.IManifest
}

export const setManifest = (manifest: Manifesto.IManifest) => (dispatch, _getState) => {

    const action: SetManifest = {
        type: TypeKeys.SET_MANIFEST,
        manifest: manifest
    }

    console.log("In setManifest")
    dispatch(action)
}