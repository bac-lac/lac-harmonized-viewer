import { TypeKeys } from "./index";
import "manifesto.js";
export interface FetchingManifest {
    type: TypeKeys.FETCHING_MANIFEST;
}
export declare const fetchManifest: (url: string) => (dispatch: any, _getState: any) => Promise<void>;
export interface SetManifest {
    type: TypeKeys.SET_MANIFEST;
    manifest: Manifesto.IManifest;
}
export declare const setManifest: (manifest: Manifesto.IManifest) => (dispatch: any, _getState: any) => void;
export interface RaiseManifestError {
    type: TypeKeys.RAISE_MANIFEST_ERROR;
    error: DocumentError;
}
export declare const raiseManifestError: (error: DocumentError) => (dispatch: any, _getState: any) => void;
