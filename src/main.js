var handlebars = require("handlebars");
var openseadragon = require("openseadragon");
var manifesto = require("manifesto.js");
var getUserLocale = require("get-user-locale");

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

        this.displayMode = 1;

        this.manifest = null;

        this.currentPage = 0;
        this.pages = [];

        this.carousel = null;

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

            this.configureLocales();

            alert(this.localeString("display_mode_single_page"));

            this.initToolbar();
            this.loadManifest();

            var self = this;

            this.bindEventControls("page");
            this.bindEventControls("previous");
            this.bindEventControls("next");
            this.bindEventControls("navigation");
            this.bindEventControls("metadata");
            this.bindEventControls("gallery");
            this.bindEventControls("display");

            this.addHandler("navigation", function () {
                self.toggleSidebar(".hv-sidebar__navigation");
            });
            this.addHandler("gallery", function () {
                self.toggleSidebar(".hv-overlay__gallery");
            });

            this.addHandler("metadata", function () {
                self.toggleSidebar(".hv-sidebar__metadata");
            });

            this.addHandler("display", function (event) {
                var value = parseInt(event.displayMode);
                self.displayMode = (value === 1 || value === 2) ? value : 1;
                self.initOpenSeadragon();
            });

            this.addHandler("previous", function () {
                self.goTo(self.currentPage - self.displayMode);
            });

            this.addHandler("next", function () {
                self.goTo(self.currentPage + self.displayMode);
            });

            this.addHandler("page", function () {


                self.enableNavigationPrevious(self.isFirstPage());
                self.enableNavigationNext(self.isLastPage());

                //var swiper = $(self.element).find(".hv-navigation__carousel")[0].swiper;
                //swiper.slideTo(self.currentPage);

                //console.log(event);
                //self.disableToolbar(".hv-toolbar__secondary");
                //self.disableNavigationButtons();

                //console.log(page);
                //openseadragon.goToPage(self.currentPage);

                var $active = $(self.element).find(".hv-navigation__item--active");

                self.scrollTo($active);
            });

            this.addHandler("loaded", function () {

                //$(self.element).find(".hv-topbar").find(".placeholder").removeClass("placeholder").find(".item.hidden").removeClass("hidden");

                self.getViewport().removeClass("loading");

                $(openseadragon.element).show();

                self.showToolbars();
                self.enableToolbar(".hv-toolbar__secondary");
                //self.updateNavigationControls();
            });
        },

        configureLocales: function () {

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

            var items = [];

            var canvases = this.manifest.getSequenceByIndex(0).getCanvases();
            canvases.forEach(function (canvas) {
                var image = canvas.getImages()[0];
                var label = canvas.getLabel()[0];
                var thumbnail = self.getThumbnail(image, undefined, 120);
                items.push({
                    title: label.value,
                    imageUrl: thumbnail
                });
            });

            var $ol = $("<ol/>");
            items.forEach(function (item, index) {

                var $li = $("<li/>")
                    .attr("data-index", index)
                    .appendTo($ol);

                var $a = $("<a/>")
                    .attr("href", "javascript:;")
                    .addClass("hv-navigation__item")
                    .attr("title", item.title)
                    .attr("data-toggle", "page")
                    .attr("data-page", index)
                    .appendTo($li);

                // Lazy loading (send request only when the element is visible)
                // Use base64 transparent pixel as placeholder
                self.createThumbnail(item.imageUrl).appendTo($a);
            });

            $navigationItems.html($ol[0].outerHTML);
            $galleryItems.html($ol[0].outerHTML);

            $navigation.mCustomScrollbar({
                skin: "dark-think",
                scrollInertia: 0,
                keyboard: {
                    enable: false
                },
                advanced: {
                    autoScrollOnFocus: ".hv-navigation__item"
                }
            });
            $gallery.mCustomScrollbar({
                skin: "dark-think",
                scrollInertia: 0,
                keyboard: {
                    enable: false
                },
                advanced: {
                    autoScrollOnFocus: ".hv-navigation__item"
                }
            });

            var $carousel = $(this.element).find(".hv-navigation__carousel .swiper-wrapper");
            items.forEach(function (item) {
                var $li = $("<li/>").addClass("swiper-slide").css({ width: "90px", height: "90px" }).appendTo($carousel);
                self.createThumbnail(item.imageUrl).appendTo($li);
            });

            this.carousel = new Swiper(".hv-navigation__carousel", {
                slidesPerView: "auto",
                centeredSlides: true,
                slidesPerColumnFill: "row",
                spaceBetween: 3
            })

            this.initLazyLoading();

            var tooltipOptions = {
                trigger: "hover focus",
                placement: "bottom",
                template: "<div class=\"tooltip hv-tooltip\" role=\"tooltip\"><div class=\"tooltip-inner\"></div></div>"
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

        goTo: function (page) {
            if (page < 0) {
                console.error("Page index must be equal to or greater than zero.");
                return;
            }
            if (page > this.pages.length - 1) {
                console.error("Page index must be less than the total number of pages.");
                return;
            }
            this.currentPage = page;
            this.initOpenSeadragon();
            this.raiseEvent("page", { page: page });
        },

        isFirstPage: function () {
            return (this.currentPage < this.displayMode);
        },

        isLastPage: function () {
            return this.currentPage >= (this.pages.length - 1) - (this.displayMode - 1);
        },

        getThumbnail: function (image, width, height) {

            var resource = image.getResource();
            var service = resource.getServices()[0];

            return this.format("{0}/full/{1},{2}/0/default.{3}", service.id,
                (width !== undefined ? width : ""), (height !== undefined ? height : ""), "jpg");
        },

        bindProperty: function (name, value) {
            $(this.element)
                .find("[data-bind]")
                .filter(function () {
                    return $(this).attr("data-bind").toLowerCase().indexOf(name.toLowerCase()) > -1;
                })
                .text(value)
                .removeClass("hv-skeleton");
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

            //this.animate($sidebar, animation, function () {
            $sidebar.addClass("hv-sidebar--opened");
            //});
            this.resizeViewport();
        },

        closeSidebar: function (selector) {
            var $sidebar = this.getSidebar(selector)
                .removeClass("hv-sidebar--opening hv-sidebar--opened hv-sidebar--closed")
                .addClass("hv-sidebar--closing");

            var animation = $sidebar.hasClass("hv-sidebar__right") ? "slideOutRight" :
                $sidebar.hasClass("hv-sidebar__top") ? "slideOutUp" :
                    $sidebar.hasClass("hv-sidebar__bottom") ? "slideOutDown" : "slideOutLeft";

            //this.animate($sidebar, animation, function () {
            $sidebar.addClass("hv-sidebar--closed");
            //});
            this.resizeViewport();
        },

        isSidebarOpened: function (selector) {
            var $sidebar = this.getSidebar(selector);
            return $sidebar.hasClass("hv-sidebar--opened") || $sidebar.hasClass("hv-sidebar--opening");
        },

        resizeViewport: function () {

            var offsetLeft = this.caculateSidebarWidth(".hv-sidebar.hv-sidebar__push.hv-sidebar__left");
            var offsetRight = this.caculateSidebarWidth(".hv-sidebar.hv-sidebar__push.hv-sidebar__right");

            this.getContent().find(".hv-content__container")
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

        enableButton: function (selector, enable) {
            if (typeof enable === "undefined")
                enable = true;
            $(this.element).find(selector).prop("disabled", !enable);
        },

        disableButton: function (selector, enable) {
            return this.enableButton(selector, false);
        },

        showToolbars: function () {
            var $toolbar = $(this.element).find(".hv-toolbar__secondary.invisible").removeClass("invisible");
            //this.animate($toolbar, "slideInDown");
        },

        initToolbar: function () {
            // $(this.element).find(".hv-button[title]").tooltip({
            //     container: "body"
            // });
            $(this.element).on("click", ".hv-button-toggle", function () {
                $(this).toggleClass("hv-button-toggle--active");
            });

            $(this.element)
                .append(Handlebars.partials["modal-settings"]()).find(".modal").modal({
                    autofocus: false,
                    detachable: true,
                    blurring: true
                });

            $(this.element).find(".hv-modal_settings .ui.dropdown").dropdown();

            $(this.element).on("click", ".hv-menu_settings", function () {
                $(".hv-modal_settings").modal("show");
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

        // isFirstPage: function () {
        //     var page = openseadragon.currentPage();
        //     return (page === 0);
        // },

        // isLastPage: function () {
        //     var page = openseadragon.currentPage();
        //     var pageCount = openseadragon.tileSources.length;
        //     return (page >= (pageCount - 1));
        // },

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

        enableNavigation: function (enable) {
            this.enableNavigationPrevious(enable);
            this.enableNavigationNext(enable);
        },

        disableNavigation: function () {
            return this.enableNavigation(false);
        },

        enableNavigationPrevious: function (enable) {
            var $button = this.getViewport().find(".hv-viewport__prev");
            return this.enableButton($button, enable);
        },

        disableNavigationPrevious: function () {
            return enableNavigationPrevious(false);
        },

        enableNavigationNext: function (enable) {
            var $button = this.getViewport().find(".hv-viewport__next");
            return this.enableButton($button, enable);
        },

        disableNavigationNext: function () {
            return enableNavigationNext(false);
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
            //console.log(this.format("Event raised: {0}", eventName), eventArgs);

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

        createThumbnail: function (url) {
            return $("<img/>")
                .attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
                .addClass("hv-thumbnail hv-lazy")
                .attr("data-src", url)
                .attr("data-srcset", this.format("{0} 1x", url));
        },

        initOpenSeadragon: function () {
            var self = this;

            if (openseadragon !== undefined) {
                openseadragon.destroy();
                openseadragon = null;
            }

            // Create OpenSeadragon element inside viewport
            var $viewport = this.getViewport();
            $viewport.find(".hv-openseadragon").remove();
            var $openseadragon = $("<div/>").addClass("hv-openseadragon")
                .hide().width("100%").height("100%").appendTo($viewport);

            var openseadragonId = this.getUniqueId($openseadragon[0]);

            var tileSources = self.pages.slice(self.currentPage, self.currentPage + self.displayMode);

            openseadragon = new OpenSeadragon({
                id: openseadragonId,
                prefixUrl: "../node_modules/openseadragon/build/openseadragon/images/",
                tileSources: tileSources,
                sequenceMode: false,
                collectionMode: true,
                collectionRows: 1,
                collectionColumns: 1,
                collectionLayout: "horizontal",
                collectionTileMargin: 30,
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
                self.raiseEvent("loaded", args);
            });

            openseadragon.addHandler("page", function (args) {

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
        },

        loadManifest: function () {
            var self = this;

            manifesto
                .loadManifest(this.settings.manifest)
                .then(function (manifest) {

                    self.manifest = manifesto.create(manifest);

                    var sequence = self.manifest.getSequences()[0];
                    var sources = sequence.getCanvases().map(function (canvas) {
                        var images = canvas.getImages();
                        return images[0].getResource().getServices()[0].id + "/info.json";
                    });

                    sources.forEach(function (source) {
                        self.pages.push(source);
                    });

                    self.bindProperty("manifest-label", self.manifest.getDefaultLabel());
                    self.bindProperty("total-pages", self.pages.length);

                    self.initOpenSeadragon();
                    //self.initPageSlider();

                    //self.populateAnnotations();
                    //self.populateNavigation();

                }, function (err) {
                    console.error(err);
                    self.showError(err);
                })
                .catch(function (ex) {
                    console.error(ex);
                    self.showError(ex.message);
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
                self.setSliderTooltipPosition(pageSlider, {
                    x: e.pageX,
                    y: e.pageY
                });
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
                //console.log(values[handle]);
            });
        },

        setSliderTooltipPosition: function (pageSlider, mousePosition) {
            var $tooltip = $(".hv-tooltip");

            var offsetTop = $(pageSlider).offset().top;
            var bottom = $(window).height() - offsetTop;

            $tooltip.css({
                bottom: bottom,
                left: mousePosition.x - ($tooltip.outerWidth() / 2)
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

        getLocale: function () {
            alert(getUserLocale.getUserLocales());
            return window.localStorage.getItem("locale") ||
                window.navigator.language ||
                window.navigator.userLanguage;
        },

        resolveLocale: function (locale) {
            if (typeof harmonizedviewer_locales === "undefined") {
                return null;
            }
            if (typeof locale === "undefined") {
                locale = this.getLocale();
            }

            var selectedLocales = harmonizedviewer_locales
                .filter(function (i) {
                    return (i.code === locale && i.code !== null);
                });

            if (selectedLocales.length > 0) {
                return selectedLocales[0];
            }
            else {
                // Could not find locale, fallback (e.g. en-US, en)
                if (locale.indexOf("-")) {
                    var language = locale.substring(0, locale.indexOf("-"));
                    return this.resolveLocale(language);
                }
            }
        },

        localeString: function (key) {
            return this.resolveLocale().strings[key];
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
            var $error = $("<div />").addClass("hv-error ui negative message");
            //$("<i/>").addClass("close icon").appendTo($error);
            $("<div/>").addClass("header").html("Oops...").appendTo($error);
            $("<p/>").html("Something went wrong. Please try again later.").appendTo($error);

            var $viewport = this.getViewport();
            $viewport.removeClass("loading");
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
