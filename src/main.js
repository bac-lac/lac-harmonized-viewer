
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
            locale: "en-GB",
            manifest: null,
            navigation: {
                enableCustomScrollbar: true
            }
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

            var self = this;

            this.bindEventControls("page");
            this.bindEventControls("previous");
            this.bindEventControls("next");
            this.bindEventControls("navigation");
            this.bindEventControls("metadata");
            this.bindEventControls("navigation-full");

            this.addHandler("navigation", function () {
                self.toggleSidebar(".hv-sidebar__navigation");
            });
            this.addHandler("navigation-full", function () {
                self.toggleSidebar(".hv-sidebar__overlay");
            });

            this.addHandler("metadata", function () {
                self.toggleSidebar(".hv-sidebar__metadata");
            });

            this.addHandler("previous", function () {
                var page = openseadragon.currentPage();
                if (page > 0) {
                    openseadragon.goToPage(page - 1);
                }
                self.scrollActiveNavigation();
            });

            this.addHandler("next", function () {
                var page = openseadragon.currentPage();
                var pageCount = openseadragon.tileSources.length;
                if (page < (pageCount - 1)) {
                    openseadragon.goToPage(page + 1);
                }
                self.scrollActiveNavigation();
            });

            this.addHandler("page", function (event) {
                self.enableToggleButtons(false);
                openseadragon.goToPage(event.page);
            });

            this.debug = (window.sessionStorage.getItem("debug") === "true") ? true : false;
            if (this.debug) {
                this.getEventControls("debug").addClass("hv-button-toggle--active");
            }
        },

        populateAnnotations: function () {
            var $sidebar = this.getSidebar(".hv-sidebar__metadata");

            var $title = $("<h4/>")
                .addClass("hv-sidebar-title")
                .text("Details")
                .appendTo($sidebar);

            var $content = $("<div/>")
                .addClass("hv-sidebar-content")
                .appendTo($sidebar);

            var $annotations = $("<dl/>")
                .addClass("hv-annotations")
                .appendTo($content);

            $.each(this.manifest.getMetadata(), function (index, item) {
                $("<dt/>").text(item.getLabel()).appendTo($annotations);
                $("<dd/>").html(item.getValue()).appendTo($annotations);
                $annotations.append($annotations);
            });

            // $sidebar.mCustomScrollbar({
            //     scrollInertia: 250
            // });
        },

        populateNavigation: function () {

            var self = this;

            var $navigation = this.getSidebar(".hv-sidebar__navigation");
            var $gallery = this.getSidebar(".hv-sidebar__gallery");

            var $navigationItems = $navigation.find(".hv-navigation__items");
            var $galleryItems = $gallery.find(".hv-navigation__items");

            var $ol = $("<ol/>");
            var sequence = this.manifest.getSequenceByIndex(0);

            $.each(sequence.getCanvases(), function (index, canvas) {

                var image = canvas.getImages()[0];
                var label = canvas.getLabel()[0];

                var thumbnail = self.getThumbnail(image, undefined, 120);

                var $li = $("<li/>")
                    .attr("data-index", index)
                    .appendTo($ol);

                var $a = $("<a/>")
                    .attr("href", "javascript:;")
                    .addClass("hv-navigation__item")
                    .attr("title", label.value)
                    .attr("data-toggle", "page")
                    .attr("data-page", index)
                    .appendTo($li);

                // Lazy loading (send request only when the element is visible)
                // Use base64 transparent pixel as placeholder
                $("<img/>")
                    .attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
                    .addClass("hv-thumbnail hv-placeholder hv-lazy")
                    .attr("data-src", thumbnail)
                    .attr("data-srcset", self.format("{0} 1x", thumbnail))
                    .appendTo($a);
            });

            $navigationItems.html($ol[0].outerHTML);
            $galleryItems.html($ol[0].outerHTML);

            $navigation.mCustomScrollbar({
                scrollInertia: 250
            });
            $gallery.mCustomScrollbar({
                scrollInertia: 250
            });

            this.initLazyLoading();

            var tooltipOptions = {
                trigger: "hover",
                placement: "bottom",
                template: '<div class="tooltip hv-tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
            };
            $navigation.find(".hv-navigation__item").tooltip(tooltipOptions);
            $gallery.find(".hv-navigation__item").tooltip(tooltipOptions);
        },

        getThumbnail: function (image, width, height) {

            var resource = image.getResource();
            var service = resource.getServices()[0];

            return this.format("{0}/full/{1},{2}/0/default.{3}", service.id,
                (width !== undefined ? width : ""), (height !== undefined ? height : ""), "jpg");
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

        getSidebar: function (selector) {
            return $(this.element).find(selector);
        },

        openSidebar: function (selector) {
            $(selector).addClass("hv-sidebar--open");
        },

        closeSidebar: function (selector) {
            $(selector).removeClass("hv-sidebar--open");
        },

        isSidebarOpen: function (selector) {
            return $(this.element).find(selector).hasClass("hv-sidebar--open");
        },

        refresh: function () {
            var offsetLeft = this.getSidebarWidth(".hv-sidebar.hv-sidebar__push.hv-sidebar__left");
            var offsetRight = this.getSidebarWidth(".hv-sidebar.hv-sidebar__push.hv-sidebar__right");

            this.getContent()
                .css("padding-left", this.format("{0}px", offsetLeft))
                .css("padding-right", this.format("{0}px", offsetRight));
        },

        getSidebarWidth: function (selector) {
            var self = this, width = 0;
            $(this.element).find(selector).each(function () {
                if (self.isSidebarOpen(this)) {
                    width += $(this).outerWidth();
                }
            });
            return width;
        },

        toggleSidebar: function (selector) {
            if (this.isSidebarOpen(selector)) {
                this.closeSidebar(selector);
            }
            else {
                this.openSidebar(selector);
            }
            this.refresh();
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
            $(this.element).on("click", ".hv-button-toggle", function () {
                $(this).toggleClass("hv-button-toggle--active");
            });
        },

        enableToggleButtons: function (enable) {
            $(this.element)
                .find(".hv-button[data-toggle]")
                .prop("disabled", (enable === false));
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

        scrollActiveNavigation: function () {
            var page = openseadragon.currentPage();

            var $navigation = this.getSidebar(".hv-sidebar__navigation");
            var $active = $navigation.find(".hv-navigation__item[data-page=" + page + "]");

            if (this.settings.navigation.enableCustomScrollbar) {
                // Use scroll method from mCustomScrollbar
                $navigation.mCustomScrollbar("scrollTo", $active);
            }
            else {
                // Use native scroll method when
                $active[0].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest"
                });
            }
        },

        updateNavigationControls: function () {
            var page = openseadragon.currentPage();

            // Enable/disable navigation buttons
            this.getEventControls("previous")
                .prop("disabled", this.isFirstPage());
            this.getEventControls("next")
                .prop("disabled", this.isLastPage());

            // Set active navigation item
            $(this.element)
                .find(".hv-sidebar__navigation ol > li .hv-navigation__item")
                .removeClass("hv-navigation__item--active");
            $(this.element)
                .find(".hv-sidebar__navigation ol > li[data-index=" + page + "] .hv-navigation__item")
                .addClass("hv-navigation__item--active");
        },

        getManifestCanvas: function () {
            return this.manifest
                .getSequenceByIndex(0)
                .getCanvasByIndex(openseadragon.currentPage());
        },

        bindEventControls: function (eventName, eventArgs) {
            var self = this;
            $(document).find(this.element).on("click", "[data-toggle=" + eventName + "]", function () {
                self.raiseEvent(eventName, $(this).data());
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

            if (openseadragon !== undefined) {
                openseadragon.destroy();
                openseadragon = null;
            }

            // Create root OpenSeadragon element inside viewport
            var $viewport = this.getViewport();
            var $openseadragon = $("<div/>").hide().width("100%").height("100%").appendTo($viewport);

            var openseadragonId = this.getUniqueId($openseadragon[0]);

            manifesto.loadManifest(this.settings.manifest).then(function (manifest) {

                self.manifest = manifesto.create(manifest);

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

                    //var label = canvas.getLabel().filter(function (i) { return (i.locale === self.settings.locale); })[0];
                    //self.setImageLabel(label.value);
                });

                openseadragon.addHandler("page", function () {

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

                self.populateAnnotations();
                self.populateNavigation();

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
            this.hideSpinner();

            var $error = $("<div />").addClass("hv-error");
            $("<span/>").addClass("hv-error-icon").addClass("hv-icon hv-icon__alert-triangle").appendTo($error);
            $("<div/>").addClass("hv-error-text").html("An unexpected error occurred.<br />Please try again later.").appendTo($error);

            if (this.debug) {
                $("<div />").addClass("hv-debug").html(err.message).appendTo($error);
            }

            var $viewport = this.getViewport();
            $error.appendTo($viewport);
        },

        initLazyLoading: function () {

            var lazyImages = [].slice.call(document.querySelectorAll("img.hv-lazy"));

            if ("IntersectionObserver" in window) {
                var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            var lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.srcset = lazyImage.dataset.srcset;
                            lazyImage.classList.remove("hz-lazy");
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });

                lazyImages.forEach(function (lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                });
            }
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
