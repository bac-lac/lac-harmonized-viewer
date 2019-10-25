import { TypeKeys } from "./index";

export interface SetDocumentUrl {
    type: TypeKeys.SET_DOCUMENT_URL;
    contentType: DocumentContentType;
    url: string;
}

export const setDocumentUrl = (url: string, contentType: DocumentContentType) => (dispatch, _getState) => {
    const action: SetDocumentUrl = {
        type: TypeKeys.SET_DOCUMENT_URL,
        contentType: contentType,
        url: url
    };
    dispatch(action);
};