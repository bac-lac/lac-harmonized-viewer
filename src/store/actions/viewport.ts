import { TypeKeys } from "./index"

export interface ViewItem {
    type: TypeKeys.VIEW_ITEM,
    index: number
};
export const viewItem = (index: number) => (dispatch, _getState) => {
    const items: DocumentPage[] = _getState().viewport.items;
    if (index < 0 || index >= items.length) {
        console.log(`Invalid item index provided. (value=${index})`);
        // Todo - throw an error
        return;
    }

    const action: ViewItem = {
        type: TypeKeys.VIEW_ITEM,
        index
    };
    dispatch(action);
};

export interface LoadView {
    type: TypeKeys.LOAD_VIEW,
    title: DocumentLabel[],
    metadata: DocumentMetadata[],
    index: number,
    items: DocumentPage[]
};
export const loadView = (title: DocumentLabel[], metadata: DocumentMetadata[], items: DocumentPage[]) => (dispatch, _getState) => {
    const action: LoadView = {
        type: TypeKeys.LOAD_VIEW,
        title,
        metadata,
        index: 0,
        items
    };
    dispatch(action);
};

export interface ToggleFullscreen {
    type: TypeKeys.TOGGLE_FULLSCREEN
}
export const toggleFullscreen = (element?: Element) => (dispatch, _getState) => {
    const action: ToggleFullscreen = {
        type: TypeKeys.TOGGLE_FULLSCREEN
    }
    dispatch(action)
}

export interface ToggleDrawer {
    type: TypeKeys.TOGGLE_DRAWER
};
export const toggleDrawer = () => (dispatch, _getState) => {
    const action: ToggleDrawer = { type: TypeKeys.TOGGLE_DRAWER };
    dispatch(action);
}