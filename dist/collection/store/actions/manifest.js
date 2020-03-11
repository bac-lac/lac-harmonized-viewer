import { TypeKeys } from "./index";
import { IIIFResolver } from '../../resolvers/iiif-resolver/iiif-resolver';
import { loadView } from './viewport';
import "manifesto.js";
import { AppConfig } from "../../app.config";
;
export const fetchManifest = (url) => async (dispatch, _getState) => {
    const fetchingAction = {
        type: TypeKeys.FETCHING_MANIFEST
    };
    dispatch(fetchingAction);
    // Check if url is valid
    // TODO
    // We use the IIIF resolver solution for now => convert to better solution eventually
    const configuration = _getState().document.configuration;
    const resolver = new IIIFResolver(configuration.language);
    resolver.disableDeepzoom = configuration && !configuration.deepzoom;
    await resolver.init(url)
        .then((iiifResolver) => {
        const manifest = resolver.getManifest();
        dispatch(setManifest(manifest));
        // Load items into the viewport
        const title = resolver.getTitle();
        const metadata = resolver.getMetadata();
        const items = resolver.getPages(configuration.customItemProps);
        dispatch(loadView(title, metadata, items));
    })
        .catch((e) => {
        const errorCode = e.message;
        const errorType = AppConfig.errors.find(error => error.code === errorCode);
        // Supported error code
        if (!errorType) {
            throw e;
        }
        dispatch(raiseManifestError(errorType));
    });
};
;
export const setManifest = (manifest) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.SET_MANIFEST,
        manifest: manifest
    };
    dispatch(action);
};
;
export const raiseManifestError = (error) => (dispatch, _getState) => {
    console.log(`Harmonized Viewer: Error ${error.code} has been raised.`);
    const action = {
        type: TypeKeys.RAISE_MANIFEST_ERROR,
        error
    };
    dispatch(action);
};
