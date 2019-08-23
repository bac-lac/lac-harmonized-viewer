
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

    var manifest;
    var openseadragon;
    var pageSlider;

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
            this.bindEventControls("gallery");

            this.addHandler("navigation", function () {
                self.toggleSidebar(".hv-sidebar__navigation");
            });
            this.addHandler("gallery", function () {
                self.toggleSidebar(".hv-overlay__gallery");
            });

            this.addHandler("metadata", function () {
                self.toggleSidebar(".hv-sidebar__metadata");
            });

            this.addHandler("previous", function () {
                var page = openseadragon.currentPage();
                if (page > 0) {
                    self.getViewport().addClass("hv-viewport--loading");
                    openseadragon.goToPage(page - 1);
                }
            });

            this.addHandler("next", function () {
                var page = openseadragon.currentPage();
                var pageCount = openseadragon.tileSources.length;
                if (page < (pageCount - 1)) {
                    self.getViewport().addClass("hv-viewport--loading");
                    openseadragon.goToPage(page + 1);
                }
            });

            this.addHandler("page", function () {
                self.disableToolbar(".hv-toolbar__secondary");
                self.disableNavigationButtons();

                var $active = $(this.element).find(".hv-navigation__item--active");

                self.scrollTo($active);

                //pageSlider.update({ from: (page + 1) });
                //openseadragon.goToPage(event.page);
            });

            this.addHandler("loaded", function () {

                self.getViewport().removeClass("hv-viewport--loading");

                self.hideSpinner();
                $(openseadragon.element).show();

                self.enableToolbar(".hv-toolbar__secondary");
                self.enableNavigationButtons();
                self.updateNavigationControls();
            });
        },

        populateAnnotations: function () {
            var $sidebar = this.getSidebar(".hv-sidebar__metadata");

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
            var $gallery = this.getSidebar(".hv-overlay__gallery");

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
                    .addClass("hv-thumbnail hv-lazy")
                    .attr("data-src", thumbnail)
                    .attr("data-srcset", self.format("{0} 1x", thumbnail))
                    .appendTo($a);
            });

            $navigationItems.html($ol[0].outerHTML);
            $galleryItems.html($ol[0].outerHTML);

            $navigation.mCustomScrollbar({
                skin: "inset-3-dark",
                scrollInertia: 250,
                keyboard: {
                    enable: false
                },
                advanced: {
                    autoScrollOnFocus: ".hv-navigation__item"
                }
            });
            $gallery.mCustomScrollbar({
                skin: "inset-3-dark",
                scrollInertia: 250,
                keyboard: {
                    enable: false
                },
                advanced: {
                    autoScrollOnFocus: ".hv-navigation__item"
                }
            });

            this.initLazyLoading();

            var tooltipOptions = {
                trigger: "hover focus",
                placement: "bottom",
                template: '<div class="tooltip hv-tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
            };
            $navigation.find(".hv-navigation__item").tooltip(tooltipOptions);
            $gallery.find(".hv-navigation__item").tooltip(tooltipOptions);

            $navigation.keydown(function (e) {
                switch (e.which) {
                    case 37: // left            
                    case 38: // up
                        $navigation.find(".hv-navigation__item:focus")
                            .parent().prev().children(".hv-navigation__item").eq(0).focus();
                        break;

                    case 39: // right
                    case 40: // down
                        $navigation.find(".hv-navigation__item:focus")
                            .parent().next().children(".hv-navigation__item").eq(0).focus();
                        break;

                    default: return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            });
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
            var $sidebar = this.getSidebar(selector)
                .removeClass("hv-sidebar--closing hv-sidebar--closed hv-sidebar--opened")
                .addClass("hv-sidebar--opening");

            var animation = $sidebar.hasClass("hv-sidebar__right") ? "slideInRight" :
                $sidebar.hasClass("hv-sidebar__top") ? "slideInUp" :
                    $sidebar.hasClass("hv-sidebar__bottom") ? "slideInDown" : "slideInLeft";

            this.animate($sidebar, animation, function () {
                $sidebar.addClass("hv-sidebar--opened");
            });
            this.resizeViewport();
        },

        closeSidebar: function (selector) {
            var $sidebar = this.getSidebar(selector)
                .removeClass("hv-sidebar--opening hv-sidebar--opened hv-sidebar--closed")
                .addClass("hv-sidebar--closing");

            var animation = $sidebar.hasClass("hv-sidebar__right") ? "slideOutRight" :
                $sidebar.hasClass("hv-sidebar__top") ? "slideOutUp" :
                    $sidebar.hasClass("hv-sidebar__bottom") ? "slideOutDown" : "slideOutLeft";

            this.animate($sidebar, animation, function () {
                $sidebar.addClass("hv-sidebar--closed");
            });
            this.resizeViewport();
        },

        isSidebarOpened: function (selector) {
            var $sidebar = this.getSidebar(selector);
            return $sidebar.hasClass("hv-sidebar--opened") || $sidebar.hasClass("hv-sidebar--opening");
        },

        resizeViewport: function () {

            var offsetLeft = this.caculateSidebarWidth(".hv-sidebar.hv-sidebar__push.hv-sidebar__left");
            var offsetRight = this.caculateSidebarWidth(".hv-sidebar.hv-sidebar__push.hv-sidebar__right");

            this.getContent()
                .css("padding-left", this.format("{0}px", offsetLeft))
                .css("padding-right", this.format("{0}px", offsetRight));
        },

        caculateSidebarWidth: function (selector) {
            var self = this, width = 0;
            $(this.element).find(selector).each(function () {
                if (self.isSidebarOpened(this)) {
                    width += $(this).outerWidth();
                }
            });
            return width;
        },

        toggleSidebar: function (selector) {
            if (this.isSidebarOpened(selector)) {
                this.closeSidebar(selector);
            }
            else {
                this.openSidebar(selector);
            }
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
                $spinner = $("<div/>").addClass("hv-spinner animated fadeIn delay-1s").attr("role", "status").appendTo($viewport);
                var $spinnerInner = $("<div/>").addClass("spinner-border").appendTo($spinner);
                $("<span/>").addClass("sr-only").text("Loading...").appendTo($spinnerInner);
            }
            return $spinner;
        },

        showSpinner: function () {
            this.getSpinner().show();
        },

        hideSpinner: function () {
            this.getSpinner().hide();
        },

        initToolbar: function () {
            $(this.element).on("click", ".hv-button-toggle", function () {
                $(this).toggleClass("hv-button-toggle--active");
            });
        },

        enableToolbar: function (selector, enable) {
            if (typeof enable === "undefined")
                enable = true;
            $(this.element)
                .find(selector)
                .find(".hv-button")
                .prop("disabled", !enable);
        },

        disableToolbar: function (selector) {
            this.enableToolbar(selector, false);
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

        scrollTo: function (element) {
            var $navigation = this.getSidebar(".hv-sidebar__navigation");
            //var $active = $navigation.find(".hv-navigation__item[data-page=" + page + "]");

            if (this.settings.navigation.enableCustomScrollbar) {
                // Use scroll method from mCustomScrollbar
                $navigation.mCustomScrollbar("scrollTo", $(element));
            }
            else {
                // Use native scroll method when
                $(element)[0].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest"
                });
            }
        },

        enableNavigationButtons: function (enable) {
            if (typeof enable === "undefined")
                enable = true;
            this.getViewport().find(".hv-viewport__prev, .hv-viewport__next")
                .prop("disabled", !enable);
        },

        disableNavigationButtons: function () {
            this.enableNavigationButtons(false);
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

        getManifestCanvas: function (pageIndex) {
            return this.manifest
                .getSequenceByIndex(0)
                .getCanvasByIndex(pageIndex);
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
            console.log(this.format("Event raised: {0}", eventName));

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

            manifesto.loadManifest(this.settings.manifest)
                .then(function (manifest) {

                    self.manifest = manifesto.create(manifest);

                    var sequence = self.manifest.getSequences()[0];

                    var sources = sequence.getCanvases().map(function (canvas) {
                        var images = canvas.getImages();
                        return images[0].getResource().getServices()[0].id + "/info.json";
                    });
                    console.log(sources);
                    // $.each(self.manifest.getSequences(), function (sequenceIndex, sequence) {
                    //     var canvases = sequence.getCanvases();
                    //     $.each(canvases, function (canvasIndex, canvas) {
                    //         var images = canvas.getImages();
                    //         var id = images[0].getResource().getServices()[0].id;
                    //         sources.push({
                    //             id: id + "/info.json",
                    //             sequenceIndex: sequenceIndex,
                    //             canvasIndex: canvasIndex
                    //         });
                    //     });
                    // });

                    openseadragon = new OpenSeadragon({
                        id: openseadragonId,
                        prefixUrl: "../node_modules/openseadragon/build/openseadragon/images/",
                        tileSources: sources,//.slice(0, 2),
                        sequenceMode: true,
                        //collectionMode: true,
                        //collectionLayout: "vertical",
                        //collectionTileMargin: 15,
                        showNavigator: true,
                        navigatorPosition: "BOTTOM_RIGHT",
                        showNavigationControl: false,
                        showSequenceControl: false,
                        minZoomImageRatio: 1.0,
                        preserveViewport: true,
                        animationTime: 0.25,
                        springStiffness: 10.0
                    });

                    openseadragon.addHandler("open", function (args) {

                        self.setManifestLabel(self.manifest.getDefaultLabel());

                        //var label = canvas.getLabel().filter(function (i) { return (i.locale === self.settings.locale); })[0];
                        //self.setImageLabel(label.value);

                        self.raiseEvent("loaded", args);
                    });

                    openseadragon.addHandler("page", function (args) {
                        self.raiseEvent("page", args);
                    });

                    openseadragon.addHandler("tile-loaded", function (args) {
                        self.raiseEvent("tile-loaded", args);
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

                    self.initPageSlider();

                    self.populateAnnotations();
                    self.populateNavigation();

                }, function (err) {
                    console.error(err);
                    self.hideSpinner();
                    self.showError(err);
                });
        },

        initPageSlider: function () {
            var pageCount = this.manifest
                .getSequenceByIndex(0)
                .getCanvases()
                .length;

            var pageSlider = $(this.element).find(".hv-pageslider")[0];

            noUiSlider.create(pageSlider, {
                start: [1],
                step: 1,
                range: {
                    min: [1],
                    max: [pageCount]
                },
                behaviour: "hover-snap"
            });

            var self = this;

            $(pageSlider).hover(function () {
            },
                function () {
                    $(".hv-tooltip").remove();
                });

            $(pageSlider).mousemove(function (e) {
                var offsetTop = $(this).offset().top;
                //$(this).parents("body").find(".hv-tooltip").css({ top: offsetTop - tooltipSize.height, left: e.pageX - (tooltipSize.width / 2) });
                var offsetBottom = $(this).offset().top + $(this).outerHeight(true);
                var bottom = $(window).height() - offsetTop;// - $(this).outerHeight(true);
                console.log(bottom);
                $(this).parents("body").find(".hv-tooltip").css({ bottom: bottom, left: e.pageX - ($(".hv-tooltip").outerWidth() / 2) });
            });

            pageSlider.noUiSlider.on("hover", function (value) {
                var pageIndex = parseInt(value) - 1;
                self.updateSliderPreview(pageIndex);
            });
            pageSlider.noUiSlider.on("slide", function (values, handle) {
                var pageIndex = parseInt(values[handle]) - 1;
                self.updateSliderPreview(pageIndex);
            });

            pageSlider.noUiSlider.on("end", function (values, handle) {
                console.log(values[handle]);
            });
        },

        updateSliderPreview: function (pageIndex) {

            //console.log(pageIndex);
            var canvas = this.getManifestCanvas(pageIndex);
            var image = canvas.getImages(0)[0];
            //console.log(image);

            var thumbnail = this.getThumbnail(image, undefined, 120);

            //console.log(thumbnail);

            if ($(".hv-tooltip").length === 0) {
                var $tooltip = $("<div/>").addClass("hv-tooltip animated bounceIn2 faster").attr("role", "tooltip").appendTo("body");
                var $tooltipArrow = $("<div/>").addClass("arrow").appendTo($tooltip);
                var $tooltipInner = $("<div/>").addClass("tooltip-inner").appendTo($tooltip);
                $("<img/>").addClass("hv-thumbnail").appendTo($tooltipInner);
            }

            $(".hv-tooltip").find("img").one("load", function () {
                $(".hv-tooltip").find(".arrow").css({ left: $(this).width() / 2 });
            }).attr("src", thumbnail);

            //$(this.element).find(".hv-pageslider").tooltip("show");
        },

        enableDualPageDisplay: function () {
            openseadragon.addTiledImage({
                tileSource: 'my-image.dzi',
                x: 5,
                y: 0,
                width: 10
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

        animate: function (node, animationName, callback) {
            var $element = $(this.element).find(node);
            $element.addClass("animated").addClass(animationName);

            function handleAnimationEnd() {
                $element.removeClass("animated").removeClass(animationName);
                $element[0].removeEventListener("animationend", handleAnimationEnd);

                if (typeof callback === "function") callback();
            }

            $element[0].addEventListener("animationend", handleAnimationEnd);
        },

        initLazyLoading: function () {

            var lazyImages = [].slice.call(document.querySelectorAll(".hv-lazy"));

            $(lazyImages).addClass("hv-lazy--pending");

            if ("IntersectionObserver" in window) {
                var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            var lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.srcset = lazyImage.dataset.srcset;
                            lazyImage.classList.remove("hv-lazy--pending");
                            lazyImage.classList.add("hv-lazy--loaded");
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
