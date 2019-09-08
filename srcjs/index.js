HarmonizedViewer = (function () {

    'use strict';
    
	var constructor = function () {

		var publicAPIs = {};


		var somePrivateMethod = function () {
		};

		publicAPIs.doSomething = function () {
			somePrivateMethod();
        };
        
		publicAPIs.init = function (options) {
            console.log('inited');

            var topbar = new HarmonizedViewer.Navbar();
		};


		return publicAPIs;

	};


	return constructor;

})();