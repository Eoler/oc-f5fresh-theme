//=require vendor/foundation/js/foundation/foundation.js
//=require vendor/foundation/js/foundation/foundation.abide.js
//=require vendor/foundation/js/foundation/foundation.accordion.js
//=require vendor/foundation/js/foundation/foundation.alert.js
//=require vendor/foundation/js/foundation/foundation.clearing.js
//=require vendor/foundation/js/foundation/foundation.dropdown.js
//=require vendor/foundation/js/foundation/foundation.equalizer.js
//=require vendor/foundation/js/foundation/foundation.interchange.js
//=require vendor/foundation/js/foundation/foundation.joyride.js
//=require vendor/foundation/js/foundation/foundation.magellan.js
//=require vendor/foundation/js/foundation/foundation.offcanvas.js
//=require vendor/foundation/js/foundation/foundation.orbit.js
//=require vendor/foundation/js/foundation/foundation.reveal.js
//=require vendor/foundation/js/foundation/foundation.slider.js
//=require vendor/foundation/js/foundation/foundation.tab.js
//=require vendor/foundation/js/foundation/foundation.tooltip.js
//=require vendor/foundation/js/foundation/foundation.topbar.js

jQuery(document).ready(function($){

    $(document).foundation({
        tabs: {
            deep_linking: false
        },
        tooltip: {
            //append_to: '.page',
            disable_for_touch: true,
            touch_close_text: 'Touch to dismiss'
        }
    });

});
