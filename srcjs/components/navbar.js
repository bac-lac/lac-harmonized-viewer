HarmonizedViewer.Navbar = (function () {

    'use strict';

    var constructor = function () {

        var publicAPIs = {};

        publicAPIs.init = function (options) {
            console.log('navbar');
        };


        var somePrivateMethod = function () {
        };

        publicAPIs.init();


        return publicAPIs;
    };


    return constructor;

})();