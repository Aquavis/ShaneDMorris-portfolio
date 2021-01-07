(function($) {
    "use strict";
    var self = {};
    self.init = function() {

        var animated = false;
        var fadeInStagger = document.getElementsByClassName('pn-docushare-flex-fade-in-stagger');
        var element = document.getElementsByClassName('pn-docushare-flex-comment-container')[0];

        var waypoint = new Waypoint({
            element: element,
            handler: function(direction) {
                TweenMax.set('.pn-docushare-flex-fade-in-stagger', {
                    visibility: 'visible'
                });
                TweenMax.staggerFrom(fadeInStagger, 1, {
                    x: -50,
                    opacity: 0,
                    ease: Power2.easeOut
                }, 0.2);
                this.destroy();
            },
            offset: 'bottom-in-view'
        });

        $('.pn-docushare-flex-comment-add').on('click', function() {
            TweenMax.to($(this), 0, {
                autoAlpha: 0,
                display: "none"
            });
            TweenMax.to('.pn-docushare-flex-hidden', 1, {
                x: 0,
                autoAlpha: 1,
                display: 'block',
                ease: Power2.easeOut
            });

            if (window.xrx_sc_synthetic_lid_event) {
                // ************
                // If user manually completed interaction, trigger metric tracking
                // ************
                // console.log('Report: Tap to add');
                window.xrx_sc_synthetic_lid_event('tap-to-add');
            }

        });

        var waypointAnim = new Waypoint({
            element: element,
            handler: function(direction) {
                TweenMax.to($('.pn-docushare-flex-comment-add'), 0, {
                    autoAlpha: 0,
                    display: "none"
                });
                TweenMax.to('.pn-docushare-flex-hidden', 1, {
                    x: 0,
                    autoAlpha: 1,
                    display: 'block',
                    ease: Power2.easeOut
                });
            },
            offset: '150'
        });

    };

    self.init();
})(window.jQuery);