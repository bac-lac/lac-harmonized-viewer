(function ($) {



    $.Viewer = function (element) {

        this.element = element;

        this.init();
    };

    $.Viewer.prototype = {

        init: function () {

            // Initialize UI dropdowns

            var dropdowns = this.element.querySelectorAll(".dropdown:not(.is-hoverable), .navbar .has-dropdown");

            if (dropdowns.length > 0) {

                dropdowns.forEach(function (dropdown) {
                    dropdown.addEventListener("click", function (e) {
                        e.stopPropagation();
                        dropdown.classList.toggle("is-active");
                    });
                });

                document.addEventListener("click", function () {
                    dropdowns.forEach(function (dropdown) {
                        dropdown.classList.remove("is-active");
                    });
                });

            }
        }
    };

}(HarmonizedViewer));