import { TypeKeys } from "./index"
import { IIIFResolver } from '../../resolvers/iiif-resolver/iiif-resolver';
import { Resolver } from '../../resolvers/resolver';
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
    const resolver = new IIIFResolver();
    const configuration = _getState().document.configuration as Configuration
    resolver.disableDeepzoom = configuration && !configuration.deepzoom;

    await resolver.init(url)
            .then((iiifResolver) => {
                const manifest : Manifesto.IManifest = resolver.getManifest();

                // Load items into the viewport
                const resolverTitleLabels: DocumentLabel[] = resolver.getTitle();
                let title: string;
                // Some manifests don't support multiple locales and return strings
                if (typeof resolverTitleLabels === 'string') {
                    title = resolverTitleLabels;
                } else {
                    if (resolverTitleLabels instanceof Array && resolverTitleLabels.find(label => label.locale === 'en')) {
                        // Change to state determined locale
                        title = resolverTitleLabels.find(label => label.locale === 'en').value;
                    } else {
                        title = null;
                    }
                }
                const annotations: DocumentAnnotation[] = resolver.getAnnotations();
                const items: DocumentPage[] = resolver.getPages();
                dispatch(loadView(title, annotations, items));
            })

            .catch((e) => {
                console.log(e);
            });
    
    /*this.setManifest(this.resolver.getManifest())

    this.setDocumentContentType(this.resolver.getManifest().getSequenceByIndex(0).getCanvasByIndex(this.page).getImages()[0].getResource().getFormat().value)
    
    const url2 = this.resolver.getManifest().getSequences()[0].getCanvasByIndex(this.page).getImages()[0].getResource().id
    
    this.setDocumentUrl(url2)

    this.setDocumentTitle(this.resolver.getTitle())

    const iiifResolver = this.resolver as IIIFResolver

    this.setDocumentPages(iiifResolver.getPages())

    // Annotations
    this.setAnnotations(this.resolver.annotations())

    // Alternate formats
    this.setDocumentAlternateFormats(this.resolver.alternateFormats())*/
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