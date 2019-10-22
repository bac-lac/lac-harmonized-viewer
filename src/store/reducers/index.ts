import document from "./document";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    document: document
});

export default rootReducer;