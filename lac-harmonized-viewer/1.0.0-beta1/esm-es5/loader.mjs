import { a as patchEsm, b as bootstrapLazy } from './core-b1fe98b5.js';
var defineCustomElements = function (win, options) {
    return patchEsm().then(function () {
        bootstrapLazy([["harmonized-zoom-slider", [[0, "harmonized-zoom-slider", { "loading": [32], "zoom": [32] }]]], ["hv-toolbar", [[0, "hv-toolbar", { "loading": [32], "page": [32], "pageCount": [32], "alternateFormats": [32] }]]], ["hv-statusbar", [[0, "hv-statusbar"]]], ["harmonized-drawer_15", [[1, "harmonized-viewer", { "language": [1], "navigationEnable": [4, "navigation-enable"], "navigationHeight": [2, "navigation-height"], "navigationLocation": [1, "navigation-location"], "annotationsEnable": [4, "annotations-enable"], "backgroundColor": [1, "background-color"], "documentUrl": [1, "url"], "locale": [32], "page": [32], "url": [32], "status": [32], "viewport": [32], "getPage": [64], "addOverlay": [64] }, [[4, "click", "handleDocumentClick"], [0, "languageChanged", "handleLanguageChange"]]], [0, "harmonized-viewport", { "navigationEnable": [4, "navigation-enable"], "navigationPlacement": [1, "navigation-placement"], "annotationsEnable": [4, "annotations-enable"], "contentType": [32], "status": [32], "page": [32], "pageCount": [32], "url": [32] }], [0, "harmonized-topbar", { "backgroundColor": [1, "background-color"], "locale": [32], "title": [32], "viewport": [32] }], [4, "harmonized-message", { "text": [1], "type": [1] }], [0, "harmonized-navigation", { "cols": [2], "rows": [2], "placement": [1], "loading": [32], "locale": [32], "page": [32], "pages": [32], "loadedImageCount": [32] }, [[8, "keydown", "handleKeyDown"], [9, "resize", "handleResize"]]], [0, "harmonized-openseadragon", { "document": [32], "error": [32], "url": [32], "options": [32], "overlays": [32], "page": [32], "pages": [32], "zoomRequest": [32], "openseadragon": [64], "getOverlays": [64] }, [[0, "overlayClick", "handleOverlayClick"]]], [4, "harmonized-drawer", { "placement": [1], "toolbar": [4], "visible": [4], "open": [64] }], [0, "harmonized-pager", { "loading": [32], "page": [32], "pageCount": [32], "status": [32], "marker": [32] }], [0, "harmonized-pdf", { "loading": [32], "url": [32] }], [0, "harmonized-spinner"], [0, "hv-annotations", { "annotations": [32] }], [0, "hv-settings", { "locale": [32], "supportedLocales": [32], "language": [32], "open": [64] }], [0, "harmonized-image", { "src": [1], "srcset": [1], "preload": [4], "page": [514], "caption": [1], "showCaption": [4, "show-caption"], "showTooltip": [4, "show-tooltip"], "loading": [32], "loaded": [32], "failed": [32], "currentPage": [32] }], [0, "harmonized-image-list", { "children": [32] }, [[2, "imageAdded", "handleImageAdded"]]], [4, "harmonized-overlay", { "x": [2], "y": [2], "width": [2], "height": [2], "mouseTracker": [8, "mouse-tracker"] }]]]], options);
    });
};
export { defineCustomElements };
