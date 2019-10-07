import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-60b8aeac.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["hv-settings",[[0,"hv-settings",{"language":[32]}]]],["harmonized-viewer",[[1,"harmonized-viewer",{"topbar":[16],"navigation":[16],"viewport":[16],"manifest":[16]},[[0,"manifestLoaded","manifestLoadedHandler"],[0,"pageLoaded","pageLoadedHandler"],[0,"goto","gotoHandler"]]]]],["hv-toolbar",[[0,"hv-toolbar"]]],["hv-topbar",[[0,"hv-topbar",{"title":[1],"publisher":[1],"thumbnail":[1]}]]],["hv-navigation",[[0,"hv-navigation",{"page":[2],"manifest":[16]},[[0,"goto","gotoHandler"]]]]],["hv-statusbar",[[0,"hv-statusbar"]]],["hv-viewport",[[0,"hv-viewport",{"page":[2],"totalPages":[2,"total-pages"],"manifest":[1],"openseadragon":[8]}]]]], options);
});
