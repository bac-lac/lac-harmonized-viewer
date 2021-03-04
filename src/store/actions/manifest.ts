import { TypeKeys } from "./index"
import { IIIFResolver } from '../../resolvers/iiif-resolver/iiif-resolver';
import { loadView } from './viewport';
import "manifesto.js";
import { AppConfig } from "../../app.config";

export interface FetchingManifest {
    type: TypeKeys.FETCHING_MANIFEST
};
export const fetchManifest = (url: string, FallbackUrl: string) => async (dispatch, _getState) => {
    const fetchingAction: FetchingManifest = {
        type: TypeKeys.FETCHING_MANIFEST
    };
    dispatch(fetchingAction);

    // Check if url is valid
    // TODO

    // We use the IIIF resolver solution for now => convert to better solution eventually
    const configuration = _getState().document.configuration as Configuration
    const resolver = new IIIFResolver(configuration.language);
    resolver.disableDeepzoom = configuration && !configuration.deepzoom;

    await resolver.init(url, FallbackUrl)
            .then((iiifResolver) => {
                console.log('resolver Init');
                
                const manifest : Manifesto.IManifest = resolver.getManifest();
                dispatch(setManifest(manifest));

                console.log(manifest);
                // Load items into the viewport
                const title: DocumentLabel[] = resolver.getTitle();
                const metadata: DocumentMetadata[] = resolver.getMetadata();
                const items: DocumentPage[] = resolver.getPages(configuration.customItemProps);
                console.log(items);
                
                dispatch(loadView(title, metadata, items));
            })
            .catch((e) => {
                const errorCode: string = e.message;
                const errorType: DocumentError = AppConfig.errors.find(error => error.code === errorCode);
                // Supported error code
                if (!errorType) {
                    throw e;
                }

                dispatch(raiseManifestError(errorType));
            });
};


export interface SetManifest {
    type: TypeKeys.SET_MANIFEST
    manifest: Manifesto.IManifest
};
export const setManifest = (manifest: Manifesto.IManifest) => (dispatch, _getState) => {
    const action: SetManifest = {
        type: TypeKeys.SET_MANIFEST,
        manifest: manifest
    }
    dispatch(action);
};

export interface RaiseManifestError {
    type: TypeKeys.RAISE_MANIFEST_ERROR,
    error: DocumentError
};
export const raiseManifestError = (error: DocumentError) => (dispatch, _getState) => {
    console.log(`Harmonized Viewer: Error ${error.code} has been raised.`)
    const action: RaiseManifestError = {
        type: TypeKeys.RAISE_MANIFEST_ERROR,
        error 
    };
    dispatch(action);
};