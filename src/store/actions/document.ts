import { TypeKeys } from "./index";

export interface SetDocumentUrl {
    type: TypeKeys.SET_DOCUMENT_URL;
    stateUrl: string;
}

export const setDocumentUrl = (url: string) => (dispatch, _getState) => {
    const action: SetDocumentUrl = {
        type: TypeKeys.SET_DOCUMENT_URL,
        stateUrl: url
    };
    dispatch(action);
};