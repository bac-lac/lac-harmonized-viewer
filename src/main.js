
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
    var pluginName = "harmonizedViewer",
        defaults = {
            locale: "en-GB"
        };

    var debug;

    var manifest;
    var openseadragon;

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

            this.events = {};

            this.initSpinner();
            this.initToolbar();
            this.initOpenSeadragon();

            //this.bindEventControls();

            var self = this;

            this.addHandler("debug", function () {
                self.debug = !self.debug;
                window.sessionStorage.setItem("debug", self.debug);
            });

            this.addHandler("gallery", function () {
                self.toggleDrawer(self.getGallery());
            });

            this.addHandler("annotations", function () {
                self.toggleDrawer(self.getAnnotations());
            });

            this.addHandler("previous", function () {
                var page = openseadragon.currentPage();
                if (page > 0) {
                    openseadragon.goToPage(page - 1);
                }
            });

            this.addHandler("next", function () {
                var page = openseadragon.currentPage();
                var pageCount = openseadragon.tileSources.length;
                if (page < (pageCount - 1)) {
                    openseadragon.goToPage(page + 1);
                }
            });

            this.debug = (window.sessionStorage.getItem("debug") === "true") ? true : false;
            if (this.debug) {
                this.getEventControls("debug").addClass("hv-button-toggle--active");
            }
        },

        populateAnnotations: function () {
            var $annotations = $("<dl/>")
                .addClass("hv-annotations")
                .appendTo(this.getAnnotations());
            $.each(this.manifest.getMetadata(), function (index, item) {
                $("<dt/>").text(item.getLabel()).appendTo($annotations);
                $("<dd/>").html(item.getValue()).appendTo($annotations);
                $annotations.append($annotations);
            });
        },

        setManifestLabel: function (label) {
            $(this.element).find(".hv-manifest-label").html(label);
        },

        getContent: function () {
            return $(this.element).find(".hv-content");
        },

        getViewport: function () {
            return $(this.element).find(".hv-viewport");
        },

        getGallery: function () {
            return $(this.element).find(".hv-drawer__gallery");
        },

        getAnnotations: function () {
            return $(this.element).find(".hv-drawer__annotations");
        },

        openDrawer: function (element) {
            $(element).addClass("hv-drawer--visible");
        },

        closeDrawer: function (element) {
            $(element).removeClass("hv-drawer--visible");
        },

        toggleDrawer: function (element) {
            if (this.isDrawerVisible(element)) {
                this.closeDrawer(element);
            }
            else {
                this.openDrawer(element);
            }
        },

        isDrawerVisible: function (element) {
            return $(element).hasClass("hv-drawer--visible");
        },

        enableButton: function (button) {
            $(this.element).find(button).prop("disabled", false);
        },

        disableButton: function (button) {
            $(this.element).find(button).prop("disabled", true);
        },

        initSpinner: function () {
            this.showSpinner();
        },

        getSpinner: function () {
            var $viewport = this.getViewport();
            var $spinner = $viewport.find(".hv-spinner");
            if ($spinner.length === 0) {
                $spinner = $("<div/>").addClass("hv-spinner").appendTo($viewport);
            }
            return $spinner;
        },

        showSpinner: function () {
            var $spinner = this.getSpinner();
            $spinner.css("opacity", 0).animate({ "opacity": 1 }, 800);
        },

        hideSpinner: function () {
            var $spinner = this.getSpinner();
            $spinner.css("opacity", 0).hide(); // hide the spinner immediately
        },

        initToolbar: function () {
            $(this.element).on("click", ".hv-toolbar .hv-button-toggle", function () {
                $(this).toggleClass("hv-button-toggle--active");
            });
        },

        enableToggleButtons: function (enable) {
            $(this.element).find(".hv-button[data-toggle]").prop("disabled", (enable === false));
        },

        isFirstPage: function () {
            var page = openseadragon.currentPage();
            return (page === 0);
        },

        isLastPage: function () {
            var page = openseadragon.currentPage();
            var pageCount = openseadragon.tileSources.length;
            return (page >= (pageCount - 1));
        },

        updateNavigationControls: function () {
            this.getEventControls("previous")
                .prop("disabled", this.isFirstPage());
            this.getEventControls("next")
                .prop("disabled", this.isLastPage());
        },

        getManifestCanvas: function () {
            return this.manifest
                .getSequenceByIndex(0)
                .getCanvasByIndex(openseadragon.currentPage());
        },

        bindEventControls: function (eventName) {
            var self = this;
            var $controls = this.getEventControls(eventName);
            $controls.each(function (index, control) {
                var selector = self.format("#{0}", self.getUniqueId(control));
                $(document).on("click", selector, function () {
                    self.raiseEvent(eventName);
                });
            });
        },

        getEventControls: function (eventName) {
            return $(this.element).find("[data-toggle=" + eventName + "]");
        },

        raiseEvent: function (eventName, eventArgs) {
            if (this.debug) {
                console.log(this.format("Event raised: {0}", eventName));
            }
            var handler = this.getHandler(eventName);
            if (handler) {
                if (!eventArgs) {
                    eventArgs = {};
                }
                handler(this, eventArgs);
            }
        },

        addHandler: function (eventName, handler, userData) {
            var events = this.events[eventName];
            if (!events) {
                this.events[eventName] = events = [];
            }
            if (handler && typeof handler === "function") {
                events[events.length] = { handler: handler, userData: userData || null };
                this.bindEventControls(eventName);
            }
        },

        getHandler: function (eventName) {
            var events = this.events[eventName];
            if (!events || !events.length) {
                return null;
            }
            events = events.length === 1 ?
                [events[0]] :
                Array.apply(null, events);
            return function (source, args) {
                var i,
                    length = events.length;
                for (i = 0; i < length; i++) {
                    if (events[i]) {
                        args.eventSource = source;
                        args.userData = events[i].userData;
                        events[i].handler(args);
                    }
                }
            };
        },

        initOpenSeadragon: function () {
            var self = this;

            this.enableToggleButtons(false);

            if (openseadragon !== undefined) {
                openseadragon.destroy();
                openseadragon = null;
            }

            // Create root OpenSeadragon element inside viewport
            var $viewport = this.getViewport();
            var $openseadragon = $("<div/>").hide().width("100%").height("100%").appendTo($viewport);

            var openseadragonId = this.getUniqueId($openseadragon[0]);

            var tileSource = "https://d.lib.ncsu.edu/collections/catalog/nubian-message-1992-11-30/manifest";
            //var tileSource = "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi";

            manifesto.loadManifest(tileSource).then(function (manifest) {

                self.manifest = manifesto.create(manifest);
                self.populateAnnotations();

                var sources = new Array();
                $.each(self.manifest.getSequences(), function (sequenceIndex, sequence) {
                    var canvases = sequence.getCanvases();
                    $.each(canvases, function (canvasIndex, canvas) {
                        var images = canvas.getImages();
                        var id = images[0].getResource().getServices()[0].id;
                        sources.push({
                            id: id,
                            sequenceIndex: sequenceIndex,
                            canvasIndex: canvasIndex
                        });
                    });
                });

                openseadragon = new OpenSeadragon({
                    id: openseadragonId,
                    prefixUrl: "../node_modules/openseadragon/build/openseadragon/images/",
                    tileSources: sources.map(function (i) { return i.id }),
                    sequenceMode: true,
                    showNavigator: true,
                    navigatorPosition: "BOTTOM_RIGHT",
                    showNavigationControl: false,
                    showSequenceControl: false,
                    minZoomImageRatio: 1.0,
                    preserveViewport: true,
                    animationTime: 0.25,
                    springStiffness: 10.0
                });

                openseadragon.addHandler("open", function () {
                    self.hideSpinner();
                    $(openseadragon.element).show();

                    self.enableToggleButtons(true);
                    self.updateNavigationControls();

                    $(self.element).find(".hv-logo").css("background-image", self.format("url('{0}')", self.manifest.getLogo()));

                    self.setManifestLabel(self.manifest.getDefaultLabel());

                    var canvas = self.getManifestCanvas();
                    var label = canvas.getLabel().filter(function (i) { return (i.locale === self.settings.locale); })[0];

                    //self.setImageLabel(label.value);
                });

                openseadragon.addHandler("page", function (event) {
                    self.updateNavigationControls();
                });

                openseadragon.addHandler("open-failed", function (err) {
                    $(openseadragon.element).hide();
                    self.showError(err);
                });

                openseadragon.addHandler("animation", function () {

                    var minZoom = openseadragon.viewport.getMinZoom();
                    var maxZoom = openseadragon.viewport.getMaxZoom();

                    var current = openseadragon.viewport.getZoom(false);
                    var currentPercentage = Math.round((current - minZoom) * 100 / (maxZoom - minZoom), 0);

                    $(self.element).find(".hv-zoom").text(self.format("{0}%", currentPercentage));
                    //self.refreshZoomSlider();
                });
            }, function (err) {
                console.error(err);
                self.hideSpinner();
                self.showError(err);
            });
        },

        getUniqueId: function (element) {
            var id = $(element).attr("id");
            if (id) {
                return id;
            }

            var length = 6;
            var allowedChars = "0123456789abcdef".split("");
            if (!length) {
                length = Math.floor(Math.random() * allowedChars.length);
            }

            var uniqueId = "";
            for (var i = 0; i < length; i++) {
                uniqueId += allowedChars[Math.floor(Math.random() * allowedChars.length)];
            }

            // Check if this ID is already taken by an element before 
            var selector = this.format("#{0}", uniqueId);
            if ($(selector).length == 0) {
                $(element).attr("id", uniqueId);
                return uniqueId;
            }
            else {
                return this.getUniqueId(element);
            }
        },

        format: function (value) {
            for (var i = 0; i < (arguments.length - 1); i++) {
                var regexp = new RegExp("\\{" + i + "\\}", "gi");
                value = value.replace(regexp, arguments[(i + 1)]);
            }
            return value;
        },

        showError: function (err) {
            console.log('error');
            this.hideSpinner();

            var $error = $("<div />").addClass("hv-error");
            $("<i />").addClass("hv-error-icon").addClass("material-icons").text("error_outline").appendTo($error);
            $("<div />").addClass("hv-error-text").html("An unexpected error occurred.<br />Please try again later.").appendTo($error);

            if (this.debug) {
                $("<div />").addClass("hv-debug").html(err.message).appendTo($error);
            }

            var $viewport = this.getViewport();
            $error.appendTo($viewport);
        }
    });

    $.fn.harmonizedViewer = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
