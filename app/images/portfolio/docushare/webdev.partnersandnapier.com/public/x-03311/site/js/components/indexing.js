(function($) {
    "use strict";
    var self = {};
    self.init = function() {

        var animated = false;

        Draggable.create(".pn-docushare-flex-slider", {
            type: "y",
            edgeResistance: 1,
            bounds: ".pn-docushare-flex-interaction",
            throwProps: false,
            onDragEnd: hitTest,
            onDrag: reveal,
            allowNativeTouchScrolling: false
        });

        function hitTest(e) {

            if (this.hitTest("#pn-docushare-flex-hitTest")) {
                TweenMax.to(".pn-docushare-flex-slider", 0.75, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                });
                TweenMax.to(".pn-docushare-flex-invoice-container", 0, {
                    paddingBottom: '150%'
                });


                if ((window.xrx_sc_synthetic_lid_event) && (!animated)) {
                    // ************
                    // If user manually completed interaction, trigger metric tracking
                    // ************
                    // console.log('Report: Drag to index');
                    window.xrx_sc_synthetic_lid_event('drag-to-index');
                }
                animated = true;
            }
        }

        function reveal(e) {
            var childPos = $('.pn-docushare-flex-slider').offset();
            var parentPos = $('.pn-docushare-flex-slider').parent().offset();
            var childOffset = {
                top: childPos.top - parentPos.top
            };
            var revealAmt = childOffset.top - 25;
            TweenMax.to(".pn-docushare-flex-invoice-container", 0, {
                paddingBottom: revealAmt + 'px'
            });
        }
        var element = $('.pn-docushare-flex-invoice-container');
        var waypoint = new Waypoint({

            element: element,
            handler: function(direction) {
                if (!animated) {
                    TweenMax.to(".pn-docushare-flex-slider", 1, {
                        top: '100%',
                        ease: Power2.easeInOut
                    });
                    TweenMax.to(".pn-docushare-flex-invoice-container", 1, {
                        paddingBottom: '120%',
                        ease: Power2.easeInOut
                    });
                    TweenMax.to(".pn-docushare-flex-slider", 0.75, {
                        autoAlpha: 0,
                        ease: Power2.easeInOut,
                        delay: 1
                    });
                }
            },
            offset: '100'
        });

    };

    self.init();
})(window.jQuery);