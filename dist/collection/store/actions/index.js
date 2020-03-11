export var TypeKeys;
(function (TypeKeys) {
    // Won't match anything
    TypeKeys["NULL"] = "NULL";
    // Document
    TypeKeys["ERROR"] = "ERROR";
    TypeKeys["SET_ERROR"] = "SET_ERROR";
    TypeKeys["ADD_LANGUAGE"] = "ADD_LANGUAGE";
    TypeKeys["SET_LANGUAGE"] = "SET_LANGUAGE";
    TypeKeys["ADD_THEME"] = "ADD_THEME";
    TypeKeys["SET_THEME"] = "SET_THEME";
    TypeKeys["SET_OPTIONS"] = "SET_OPTIONS";
    TypeKeys["SET_ZOOM"] = "SET_ZOOM";
    TypeKeys["SET_ZOOM_REQUEST"] = "SET_ZOOM_REQUEST";
    TypeKeys["ADD_OVERLAY"] = "ADD_OVERLAY";
    TypeKeys["CLEAR_OVERLAYS"] = "CLEAR_OVERLAYS";
    TypeKeys["SET_CONFIGURATION"] = "SET_CONFIGURATION";
    // Manifest
    TypeKeys["FETCHING_MANIFEST"] = "FETCHING_MANIFEST";
    TypeKeys["SET_MANIFEST"] = "SET_MANIFEST";
    TypeKeys["RAISE_MANIFEST_ERROR"] = "RAISE_MANIFEST_ERROR";
    // Viewport
    TypeKeys["VIEW_ITEM"] = "VIEW_ITEM";
    TypeKeys["LOAD_VIEW"] = "LOAD_VIEW";
    TypeKeys["TOGGLE_DRAWER"] = "TOGGLE_DRAWER";
    TypeKeys["TOGGLE_FULLSCREEN"] = "TOGGLE_FULLSCREEN";
})(TypeKeys || (TypeKeys = {}));
