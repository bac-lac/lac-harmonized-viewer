import { TypeKeys } from "./index";
;
export const viewItem = (index) => (dispatch, _getState) => {
    const items = _getState().viewport.items;
    if (index < 0 || index >= items.length) {
        console.log(`Invalid item index provided. (value=${index})`);
        // Todo - throw an error
        return;
    }
    const action = {
        type: TypeKeys.VIEW_ITEM,
        index
    };
    dispatch(action);
};
;
export const loadView = (title, metadata, items) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.LOAD_VIEW,
        title,
        metadata,
        index: 0,
        items
    };
    dispatch(action);
};
export const toggleFullscreen = (element) => (dispatch, _getState) => {
    const action = {
        type: TypeKeys.TOGGLE_FULLSCREEN
    };
    dispatch(action);
};
;
export const toggleDrawer = () => (dispatch, _getState) => {
    const action = { type: TypeKeys.TOGGLE_DRAWER };
    dispatch(action);
};
