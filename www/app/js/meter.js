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
    var i, classValue;
    // Save number of LEDs for later use
    var numberOfLEDs = NumOfLEDs;

    // Tell whether we're clipping or not
    var clipping = false;

    // Add LEDs to meter
    var ledHtml = '<ul>';
    for (i = 0; i < numberOfLEDs; ++i) {

        // Add colors to LEDs
        if (i <= numberOfLEDs / 10) {
            classValue = 'mixer-led-danger';
        } else if (i <= numberOfLEDs / 2) {
            classValue = 'mixer-led-warn';
        } else {
            classValue = 'mixer-led-normal';
        }

        ledHtml += '<li class="mixer-led ' + classValue + '"></li>';
    }
    ledHtml += '</ul>';

    $(this)
        .addClass('mixer-meter')
        .attr('data-vol', 0)
        .html(ledHtml)
        .on('volumeChange', function () {
            var onLeds;

            // Get <ul> from div
            var ul = $(this)
                .children(0);

            // Get data-vol value
            var volume = parseInt($(this)
                .attr('data-vol'));

            // How many LEDs to light up
            var lightUp = Math.ceil((volume / 100) * numberOfLEDs);

            // Find elements you need to light up
            var offLeds = (numberOfLEDs - lightUp);
            if (offLeds < 0) {
                onLEDs = ul.find('li:gt(' + offLeds + ')');
            } else {
                onLEDs = ul.children();
            }
            offLeds = ul.find('li:lt(' + offLeds + ')');

            // Change color of LEDS that are on
            onLEDs.each(function (index, val) {
                $(val)
                    .addClass('on');
            });

            // Change color of LEDS that are off
            offLeds.each(function (index, val) {
                $(val)
                    .removeClass('on');
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
                    .addClass('on');
            }
        });
};

/**
 *  This allows you to change the volume distplayed on a
 *  volume meter.
 *
 *  This should be run on load.
 *
 *  Examples of changing volume displayed:
 *
 *     var meter = $(this).parent().parent().find('.meter');
 *     meter.MeterVolume(vol * 100); // Where volume is expressed as a floating point number between 0.0 and 1.0
 *
 *  @function   MeterVolume
 *  @param   {Number}  vol    Volume to be displayed on the meter
 */
$.fn.MeterVolume = function (vol) {
    // Find out if you have the data-vol data
    var attr = $(this)
        .attr('data-vol');

    // Check if you have the attr or not
    if (typeof attr !== typeof undefined &&
        attr !== false) {
        // Set new value for data-vol and trigger event
        $(this)
            .attr('data-vol', vol)
            .trigger('volumeChange');
    }
};