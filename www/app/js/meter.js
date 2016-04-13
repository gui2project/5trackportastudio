/**
 *  Contains the class for the visual volume (peak) meter
 *
 *  @name   meter.js
 */

// Function for making LEDs
$.fn.meter = function (NumOfLEDs) {
    var i,
        numberOfLEDs = NumOfLEDs, // Save number of LEDs for later use
        clipping = false; // Tell whether we're clipping or not

    // Add LEDs to meter
    var ledHtml = $('<ul></ul>');

    for (i = 0; i < numberOfLEDs; ++i) {
        var li = $('<li></li>')
            .addClass('mixer-led');

        // Add colors to LEDs
        if (i <= numberOfLEDs / 10) {
            li.addClass('mixer-led-danger');
        } else if (i <= numberOfLEDs / 2) {
            li.addClass('mixer-led-warn');
        } else {
            li.addClass('mixer-led-normal');
        }

        $(ledHtml)
            .append(li);
    }

    $(this)
        .addClass('mixer-meter')
        .attr('data-vol', 0)
        .append(ledHtml)
        .on('volumeChange', function () {
            var onLeds,
                ul = $(this) // Get <ul> from div
                .children(0),
                volume = parseInt($(this) // Get data-vol value
                    .attr('data-vol')),
                lightUp = Math // How many LEDs to light up
                .ceil((volume / 100) * numberOfLEDs),
                offLeds = (numberOfLEDs - lightUp); // How many LEDs to turn off

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