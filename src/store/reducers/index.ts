import document from "./document";
import manifest from "./manifest";
import viewport from "./viewport";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    document,
    manifest,
    viewport
})

export default rootReducer