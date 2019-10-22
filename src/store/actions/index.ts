import { SetDocumentUrl } from "./document";

export interface NullAction {
    type: TypeKeys.NULL;
}

// Keep this type updated with each known action
export type ActionTypes = NullAction | SetDocumentUrl;

export enum TypeKeys {
    // Won't match anything
    NULL = "NULL",
    ERROR = "ERROR",
    SET_DOCUMENT_URL = "SET_DOCUMENT_URL"
}