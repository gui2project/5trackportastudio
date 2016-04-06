/**
 *  Contains the class for the visual volume (peak) meter
 *
 *  @name   meter.js
 */

// Set up meters
$(document)
    .ready(function () {
        $('.meter')
            .meter(36);
    });

// Function for making LEDs
$.fn.meter = function (NumOfLEDs) {
    // Save number of LEDs for later use
    var numberOfLEDs = NumOfLEDs;

    // Tell whether we're clipping or not
    var clipping = false;

    // Add mixer-meter class
    $(this)
        .addClass('mixer-meter');

    // Add data value to div tag
    $(this)
        .attr('data-vol', 0);

    // Add LEDs to meter
    var LEDHTML = '<ul>';
    for (var i = 0; i < numberOfLEDs; i++) {
        // Add colors to LEDs
        if (i <= numberOfLEDs / 10) {
            LEDHTML += '<li class="mixer-led mixer-led-red"></li>';
        } else if (i <= numberOfLEDs / 2) {
            LEDHTML += '<li class="mixer-led mixer-led-yellow"></li>';
        } else {
            LEDHTML += '<li class="mixer-led mixer-led-green"></li>';
        }
    }
    LEDHTML += '</ul>';
    $(this)
        .html(LEDHTML);

    // Check if data-vol has changed
    $(this)
        .on('volumeChange', function () {
            // Get <ul> from div
            var ul = $(this)
                .children(0);

            // Get data-vol value
            var volume = parseInt($(this)
                .attr('data-vol'));

            // How many LEDs to light up
            var lightUp = Math.ceil((volume / 100) * numberOfLEDs);

            // Find elements you need to light up
            var onLEDs = ((numberOfLEDs - lightUp) < 0) ? ul.find('li:gt(' + (numberOfLEDs - lightUp) + ')') : ul.children();
            var offLEDs = ul.find('li:lt(' + (numberOfLEDs - lightUp) + ')');

            // Change color of LEDS that are on
            onLEDs.each(function (index, val) {
                if ($(val)
                    .hasClass('mixer-led-red')) {
                    $(val)
                        .css('background-color', '#FF007D');
                } else if ($(val)
                    .hasClass('mixer-led-yellow')) {
                    $(val)
                        .css('background-color', '#C700FF');
                } else if ($(val)
                    .hasClass('mixer-led-green')) {
                    $(val)
                        .css('background-color', '#149BDF');
                }
            });

            // Change color of LEDS that are off
            offLEDs.each(function (index, val) {
                if ($(val)
                    .hasClass('mixer-led-red')) {
                    $(val)
                        .css('background-color', '#333333');
                } else if ($(val)
                    .hasClass('mixer-led-yellow')) {
                    $(val)
                        .css('background-color', '#333333');
                } else if ($(val)
                    .hasClass('mixer-led-green')) {
                    $(val)
                        .css('background-color', '#333333');
                }
            });

            // Set the clipping LED to stay on for a second longer
            if (lightUp === numberOfLEDs) {
                clipping = true;
                setTimeout(function () {
                    clipping = false;
                }, 1000);
            }
            if (clipping === true) {
                ul.find('li:first')
                    .css('background-color', '#FF007D');
            }
        });
};

/**
 *  This allows you to change the volume distplayed on a
 *  volume meter.
 *
 *  @class   MeterVolume
 *  @param   vol    Volume to be displayed on the meter
 *
 *  This should be run on load.
 *
 *  Examples of changing volume displayed:
 *
 *     var meter = $(this).parent().parent().find('.meter');
 *     meter.MeterVolume(vol * 100); // Where volume is expressed as a floating point number between 0.0 and 1.0
 */
$.fn.MeterVolume = function (vol) {
    // Find out if you have the data-vol data
    var attr = $(this)
        .attr('data-vol');

    // Check if you have the attr or not
    if (typeof attr !== typeof undefined && attr !== false) {
        // Set new value for data-vol and trigger event
        $(this)
            .attr('data-vol', vol)
            .trigger('volumeChange');
    }
};