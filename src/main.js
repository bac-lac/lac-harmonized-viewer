
; (function ($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Default plugin settings
    var pluginName = "archivesViewer",
        defaults = {
            propertyName: "value"
        };

    var openseadragon;

    //var zoomSlider;
    var $zoomSlider;
    //var zoomSliderActive = false;

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {

            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like the example below
            //this.yourOtherFunction( "jQuery Boilerplate1112" );

            this.initSpinner();


            this.initOpenSeadragon();


            var self = this;

            $zoomSlider = $("#example_id");
            // zoomSlider = $zoomSlider.ionRangeSlider({
            //     skin: "round",
            //     min: 0,
            //     max: 100,
            //     step: 1,
            //     hide_min_max: true,
            //     hide_from_to: true,
            //     onFinish: function () {
            //         zoomSliderActive = false;
            //     }
            // }).data("ionRangeSlider");

            // $(document).on("mousedown", "#av .irs-handle", function () {
            //     console.log("slider start");
            // });
            // $(document).on("click", "#av .irs-line", function () {
            //     console.log("slider click");
            // });

            $zoomSlider.on("change", function () {
                //console.log("zoom slider change");
                //console.log(zoomSlider.is_active);
                /*
                if (zoomSlider.is_active === true || zoomSlider.is_click === true) {
                    zoomSliderActive = true;
                    var zoom = $(this).prop("value");
                    openseadragon.viewport.zoomTo(zoom);
                }
                */
            });

            openseadragon.addHandler("open", function () {
                self.hideSpinner();

            });
            openseadragon.addHandler("open-failed", function () {
                $(openseadragon.element).hide();
            });

            openseadragon.addHandler("animation", function () {
                self.refreshZoomSlider();
            });

            //subscribe to 'myEventStart'
            $(this.element).bind("myEventStart", function () {
                console.log("event start");
                openseadragon.viewport.goHome();
            });

            //subscribe to 'myEventEnd'
            $(this.element).bind("myEventEnd", function () {
                console.log("event end");
            });

            //subscribe to 'toggleSidebar'
            $(this.element).bind("toggleSidebar", function () {
                console.log("toggleSidebar");

                var $main = $(this).find(".av-main");
                var $metadata = $(this).find(".av-metadata");

                var closed = ($main.css("margin-right") === "0px");

                if (!closed) {
                    $main.css("margin-right", "0px");
                    $metadata.css("transform", "translateX(100%)");
                    $(this).find(".av-toolbar-button").last().removeClass("active");
                }
                else {
                    $main.css("margin-right", "300px");
                    $metadata.css("transform", "translateX(0)");
                    $(this).find(".av-toolbar-button").last().addClass("active");
                }
            });

            $(this.element).find(".av-toolbar-button").eq(0).on("click", function () {
                $(this).trigger("myEventStart");
            });

            $(this.element).find(".av-toolbar-button").last().on("click", function () {
                $(this).trigger("toggleSidebar");
            });

            //$(this.element).find(".av-metadata").hide();
        },

        initSpinner: function () {
            this.showSpinner();
        },

        getSpinner: function () {
            return $(this.element).find(".av-viewport .av-spinner");
        },

        showSpinner: function () {
            var $spinner = this.getSpinner();
            $spinner.css("opacity", 0).animate({ "opacity": 1 }, 800);
        },

        hideSpinner: function () {
            var $spinner = this.getSpinner();
            $spinner.css("opacity", 0).hide(); // hide the spinner immediately
        },

        initOpenSeadragon: function () {
            openseadragon = new OpenSeadragon({
                id: "openseadragon1",
                prefixUrl: "../node_modules/openseadragon/build/openseadragon/images/",
                tileSources: "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi",
                showNavigator: true,
                navigatorPosition: "BOTTOM_RIGHT",
                showNavigationControl: false,
                minZoomImageRatio: 1.0
            });
            this.resetZoom();
        },

        resetZoom: function () {
            if (openseadragon === undefined) {
                return console.error("Failed to reset zoom because Openseadragon has not been initialized yet.");
            }

            var $zoomSlider = this.getZoomSlider();
            if ($zoomSlider.length > 0) {

                var minZoom = openseadragon.viewport.getMinZoom();
                var maxZoom = openseadragon.viewport.getMaxZoom();
                var steps = this.getZoomSteps(minZoom, maxZoom);

                // Redraw the zoom slider position
                $zoomSlider.update({
                    from: minZoom,
                    min: minZoom,
                    max: maxZoom,
                    step: steps
                });

            }
        },

        initZoomSlider: function () {

        },

        getZoomSlider: function () {
            return $(this.element).find(".az-zoom-slider");
        },

        getZoomSteps: function (minZoom, maxZoom) {
            if (minZoom === undefined) {
                minZoom = 0;
            }
            if (maxZoom === undefined) {
                maxZoom = 0;
            }
            return Math.round((maxZoom - minZoom) / 100, 0);
        },

        refreshZoomSlider: function () {

            var minZoom = openseadragon.viewport.getMinZoom();
            var maxZoom = openseadragon.viewport.getMaxZoom();

            var target = openseadragon.viewport.getZoom(false);

            var diff = (maxZoom - minZoom);
            var ratio = (target !== minZoom) ? (diff > 0) ? Math.round((target - minZoom) * 100 / diff, 0) : 0 : 0;

            $("*[data-bind='zoom']").each(function (index, elem) {
                $(elem).text(ratio + "%");
            });

            //if (zoomSlider.is_active === false && zoomSlider.is_click === false && zoomSliderActive === false) {

            //console.log(openseadragon);

            // Get current and target zoom values (before and after animations)
            var current = openseadragon.viewport.getZoom(true);

            //console.log(current, target);

            // Don't update the slider when slider value is equal to target zoom value
            if (current !== target) {
                //zoomSlider.update({ from: target });
            }
            //}
        },

        errror: function () {
            var $error = $("<div class=\"error\"><span class=\"error-icon material-icons\">error_outline</span><div class=\"error-text\">An unexpected error occurred.<br />Please try again later.</div></div>");
            $(this.element).find(".archv").append($error);
        }
    });

    $.fn.archivesViewer = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
