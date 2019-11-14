import "../../utils/icon-library";
import { Unsubscribe, Store } from '@stencil/redux';
import { setZoomRequest } from '../../store/actions/document';
export declare class ZoomSliderComponent {
    el: HTMLElement;
    setZoomRequest: typeof setZoomRequest;
    storeUnsubscribe: Unsubscribe;
    loading: MyAppState["document"]["loading"];
    zoom: MyAppState["document"]["zoom"];
    store: Store;
    private slider;
    private active;
    componentWillLoad(): void;
    initialize(): any;
    componentDidRender(): void;
    componentDidUnload(): void;
    getZoomRatio(): number;
    render(): any;
}
