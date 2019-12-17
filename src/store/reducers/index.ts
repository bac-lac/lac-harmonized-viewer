import document from "./document";
import manifest from "./manifest";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    document, manifest
})

export default rootReducer