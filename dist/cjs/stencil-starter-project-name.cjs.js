'use strict';

const core = require('./core-409f6374.js');

core.patchBrowser().then(options => {
  return core.bootstrapLazy([["hv-toolbar.cjs",[[0,"hv-toolbar"]]],["harmonized-viewer_6.cjs",[[1,"harmonized-viewer",{"topbar":[16],"navigation":[16],"viewport":[16],"manifest":[16]},[[0,"manifestLoaded","manifestLoadedHandler"],[0,"pageLoaded","pageLoadedHandler"],[0,"goto","gotoHandler"]]],[0,"hv-topbar",{"title":[1],"publisher":[1],"thumbnail":[1]}],[0,"hv-navigation",{"page":[2],"manifest":[16]},[[0,"goto","gotoHandler"]]],[0,"hv-statusbar"],[0,"hv-viewport",{"page":[2],"totalPages":[2,"total-pages"],"manifest":[1],"openseadragon":[8]}],[0,"hv-settings",{"language":[32]}]]]], options);
});
