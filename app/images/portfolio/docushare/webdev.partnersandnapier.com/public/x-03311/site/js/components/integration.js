(function($) {
    "use strict";
    var self = {};

    self.init = function() {

        var element = document.getElementById('pn-docushare-flex-integration');

        var waypoint = new Waypoint({
            element: element,
            handler: function(direction) {

                // CLOUD ANIMATIONS ====

                TweenMax.set('.pn-docushare-flex-cloud-container', {
                    visibility: 'visible'
                });

                // Left side of Xerox logo
                TweenMax.from('.pn-docushare-flex-cloud-1', 1, {
                    scale: 0,
                    autoAlpha: 0,
                    x: 200
                });
                TweenMax.from('.pn-docushare-flex-cloud-2', 1, {
                    scale: 0,
                    autoAlpha: 0,
                    y: 100,
                    x: 100,
                    delay: 0.25
                });
                TweenMax.from('.pn-docushare-flex-cloud-chart', 1, {
                    scale: 0,
                    autoAlpha: 0,
                    y: -50,
                    x: 200,
                    delay: 0.5
                });
                TweenMax.from('.pn-docushare-flex-cloud-handshake', 1, {
                    scale: 0,
                    autoAlpha: 0,
                    y: 80,
                    x: 200,
                    delay: 0.75
                });

                // Right side of Xerox logo
                TweenMax.from('.pn-docushare-flex-cloud-3', 1, {
                    scale: 0,
                    autoAlpha: 0,
                    x: -400,
                    y: 200
                });
                TweenMax.from('.pn-docushare-flex-cloud-4', 1, {
                    scale: 0,
                    autoAlpha: 0,
                    x: -500,
                    y: -40,
                    delay: 0.25
                });
                TweenMax.from('.pn-docushare-flex-cloud-pen', 1, {
                    scale: 0,
                    autoAlpha: 0,
                    x: -200,
                    y: -20,
                    delay: 0.5
                });
                TweenMax.from('.pn-docushare-flex-cloud-lightbulb', 1, {
                    scale: 0,
                    autoAlpha: 0,
                    x: -250,
                    y: 100,
                    delay: 0.75
                });
                this.destroy();
            },
            offset: 'bottom-in-view'
        });

        // Retrieve container position relative to viewport
        var rect = $('.pn-docushare-flex-clouds')[0].getBoundingClientRect();
        // Create mouse object to keep track of mouse coordinates
        var mouse = {
            x: 0,
            y: 0,
            moved: false
        };

        $(".pn-docushare-flex-clouds").mousemove(function(e) {
            // set moved property to true
            mouse.moved = true;
            // calculate mouse coordinates
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        // Ticker event will be called on every frame
        TweenLite.ticker.addEventListener('tick', function() {
            // if mouse is moved call parallax function
            if (mouse.moved) {
                // parallaxIt takes two parameters
                // first is the target element
                // Second is how much the element should move
                // Movement is relative to height and width of parent, in this case the container
                // insert all your parallax calls here
                // you can insert more parameters to change duration etc for each element
                parallaxIt(".pn-docushare-flex-cloud-1", -5);
                parallaxIt(".pn-docushare-flex-cloud-2", -3);
                parallaxIt(".pn-docushare-flex-cloud-3", 5);
                parallaxIt(".pn-docushare-flex-cloud-4", 3);
                parallaxIt(".pn-docushare-flex-cloud-handshake", -20);
                parallaxIt(".pn-docushare-flex-cloud-chart", -15);
                parallaxIt(".pn-docushare-flex-cloud-lightbulb", 20);
                parallaxIt(".pn-docushare-flex-cloud-pen", 15);
            }
            // set moved property to false on each frame so parallax function won't be called more than once
            mouse.moved = false;
        });

        // Simplest part, take mouse coordinates and container dimensions and animate elements
        function parallaxIt(target, movement) {
            TweenMax.to(target, 0.3, {
                x: (mouse.x - rect.width / 2) / rect.width * movement,
                y: (mouse.y - rect.height / 2) / rect.height * movement
            });
        }

        // Recaclulate container dimensions on resize and scroll
        $(window).on('resize scroll', function() {
            rect = $('.pn-docushare-flex-clouds')[0].getBoundingClientRect();
        });

    };

    self.init();
})(window.jQuery);