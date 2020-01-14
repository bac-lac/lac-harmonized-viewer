import { TypeKeys } from "./index"
import { IIIFResolver } from '../../resolvers/iiif-resolver/iiif-resolver';
import { loadView } from './viewport';
import "manifesto.js";

export interface FetchingManifest {
    type: TypeKeys.FETCHING_MANIFEST
};

export const fetchManifest = (url: string) => async (dispatch, _getState) => {
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

    await resolver.init(url)
            .then((iiifResolver) => {
                const manifest : Manifesto.IManifest = resolver.getManifest();
                dispatch(setManifest(manifest));

                // Load items into the viewport
                const resolverTitleLabels: DocumentLabel[] = resolver.getTitle();
                let title: string = null;
                // Some manifests don't support multiple locales and return strings
                if (typeof resolverTitleLabels === 'string') {
                    title = resolverTitleLabels;
                }
                else if (resolverTitleLabels instanceof Array &&
                         resolverTitleLabels.find(label => label.locale === configuration.language)) {
                    title = resolverTitleLabels.find(label => label.locale === configuration.language).value;
                }
                // Remove eventually
                const annotations: DocumentAnnotation[] = resolver.getAnnotations();
                const items: DocumentPage[] = resolver.getPages(configuration.customItemProps);
                dispatch(loadView(title, annotations, items));
            })

            .catch((e) => {
                console.log(e);
            });
};


export interface SetManifest {
    type: TypeKeys.SET_MANIFEST
    manifest: Manifesto.IManifest
}

export const setManifest = (manifest: Manifesto.IManifest) => (dispatch, _getState) => {

    const action: SetManifest = {
        type: TypeKeys.SET_MANIFEST,
        manifest: manifest
    }

    dispatch(action)
}