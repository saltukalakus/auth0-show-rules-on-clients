/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 */
$(window).ready(function() {
    (function($, Spinner) {

        $.fn.spin = function(opts, color) {

            return this.each(function() {
                var $this = $(this)
                    , data = $this.data()

                if (data.spinner) {
                    data.spinner.stop()
                    delete data.spinner
                }
                if (opts !== false) {
                    opts = $.extend(
                        { color: color || $this.css('color') }
                        , $.fn.spin.presets[opts] || opts
                    )
                    data.spinner = new Spinner(opts).spin(this)
                }
            })
        }

        $.fn.spin.presets = {
            tiny:  { lines:  8, length: 2, width: 2, radius: 3 }
            , small: { lines:  8, length: 4, width: 3, radius: 5 }
            , large: { lines: 10, length: 8, width: 4, radius: 8 }
        }

    })($, Spinner);
});