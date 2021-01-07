(function($) {
    "use strict";
    var self = {};
    self.init = function() {

        var animated = false;
        var bolts = document.getElementsByClassName("pn-docushare-flex-bolt");
        var dialPos = TweenMax.set("#pn-docushare-flex-wheel", {
            x: "+=0"
        }).target[0]._gsTransform;

        Draggable.create("#pn-docushare-flex-wheel", {
            type: "rotation",
            throwProps: true,
            onDrag: dragUpdate
        });

        function dragUpdate() {
            var percent = dialPos.rotation / 360;
            removeIndicator();
            if (percent > 0.5) {
                animateBars();

            }
        }

        function enforceSecurity() {
            animated = true;
            TweenMax.from("#pn-docushare-flex-bar-1, #pn-docushare-flex-bar-2", 1, {
                scale: 0,
                x: 100
            });
            TweenMax.to("#pn-docushare-flex-bar-1, #pn-docushare-flex-bar-2", 1, {
                opacity: 1
            });
            TweenMax.to("#pn-docushare-flex-hatch", 1, {
                opacity: 1,
                delay: 0.75
            });
            TweenMax.staggerTo(bolts, 1, {
                opacity: 1,
                delay: 1.25
            }, 0.25);
        }

        var removeIndicator = (function() {
            var executed = false;
            return function() {
                if (!executed) {
                    executed = true;
                    TweenMax.to(".pn-docushare-flex-safe-button", 0.5, {
                        autoAlpha: 0
                    });
                }
            };
        })();

        var animateBars = (function() {
            var executed = false;
            return function() {
                if (!executed) {
                    executed = true;
                    enforceSecurity();

                    if (window.xrx_sc_synthetic_lid_event) {
                        // ************
                        // If user manually completed interaction, trigger metric tracking
                        // ************
                        // console.log('Report: Control');
                        window.xrx_sc_synthetic_lid_event('conversation-wheel');
                    }
                }
            };
        })();

        var element = $('.pn-docushare-flex-safe-container');

        if (!animated) {

            var waypoint = new Waypoint({

                element: element,
                handler: function(direction) {
                    if (!animated) {
                        removeIndicator();
                        animateBars();
                    }
                },
                offset: '50'
            });
        }

    };

    self.init();
})(window.jQuery);