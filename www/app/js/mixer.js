/**
 *  @file   mixer.js
 *
 *  description
 */
$(function () {
    /* Add data to the mute & record buttons */
    $('.mute button')
        .attr('data-muted', 0);
    $('.record button')
        .attr('data-armed', 0);

    /* Set up track names */
    $('.name')
        .tracklabel();

    /* Set up EQ knobs */
    $('.eq input')
        .knob({
            width: 75,
            height: 75,
            min: -12,
            max: 12,
            angleOffset: -125,
            angleArc: 250,
            cursor: 20,
            displayInput: false
        });
    $('.eq input')
        .val(0)
        .trigger('change');

    /* Set up pan knobs */
    $('.pan input')
        .knob({
            width: 75,
            height: 75,
            min: -1,
            max: 1,
            step: 0.1,
            angleOffset: -125,
            angleArc: 250,
            cursor: 20,
            displayInput: false
        });
    $('.pan input')
        .val(0)
        .trigger('change');

    /* Set up volume sliders */
    $('.slider')
        .slider({
            reversed: true,
            precision: 2,
            min: 0.00,
            max: 1.00,
            step: 0.01,
            value: 0.70,
            orientation: 'vertical',
            tooltip_position: 'left'
        });

    /* Knob function */
    $('canvas')
        .on('mousedown', function () {
            $(this)
                .addClass('changing');
        })
        .on('mousemove', function () {
            // Check if dragging
            if (!$(this)
                .hasClass('changing')) {
                return;
            }

            // Get track number and value of the knob
            var trackNumber = parseInt($(this)
                .parent()
                .parent()
                .attr('value'));
            var knobValue = parseFloat($(this)
                .parent()
                .find('input')
                .val());
            console.log(this);
            // Check which knob you are (EQ or pan)
            if ($(this)
                .parent()
                .parent()
                .hasClass('eq')) {
                // Get EQ type (high, mid, low)
                var eqType = $(this)
                    .parent()
                    .parent()
                    .attr('type');

                //function to change EQ
                eq(trackNumber, eqType, knobValue);

            } else if ($(this)
                .parent()
                .parent()
                .hasClass('pan')) {

                pan(trackNumber, knobValue);
            }
        });
    $(document)
        .on('mouseup', function () {
            // Remove changing
            $('.changing')
                .removeClass('changing');
        });

    /* Slider function */
    $('.slider')
        .on('change', function () {
            // Get track number and value of the slider
            var trackNumber = parseInt($(this)
                .parent()
                .attr('value'));
            var sliderVal = parseFloat($(this)
                .val());
            if (!isNaN(sliderVal)) {
                gain(trackNumber, sliderVal);
            }
        });

    /* Mute buttons */
    $('.mute button')
        .on('click', function () {
            // Get track number and value of the button
            var trackNumber = parseInt($(this)
                .parent()
                .attr('value'));

            // Check variables
            var isMuted = parseInt($(this)
                .attr('data-muted'));

            // Toggle armed
            if (isMuted) {
                // Turn off armed
                $(this)
                    .attr('data-muted', 0)
                    .addClass('armed');

                muteToggle(trackNumber);

            } else {
                // Turn on armed
                $(this)
                    .attr('data-muted', 1)
                    .removeClass('armed');

                muteToggle(trackNumber);

            }
        });

    /* Recording buttons */
    $('.record button')
        .on('click', function () {
            // Get track number and value of the knob
            var trackNumber = parseInt($(this)
                .parent()
                .attr('value'));

            // Check variables
            var isArmed = parseInt($(this)
                .attr('data-armed'));

            // Toggle armed
            if (isArmed) {
                // Turn off armed
                $(this)
                    .attr('data-armed', 0)
                    .removeClass('armed');

                recordToggle(trackNumber);
                armTrackToggle(trackNumber);

            } else {
                // Turn on armed
                $(this)
                    .attr('data-armed', 1)
                    .addClass('armed');

                armTrackToggle(trackNumber);
                recordToggle(trackNumber);

            }
        });

    var mixerbutton = function (element) {
        $('button.stop')
            .removeClass('data-active');
        $('button.rewind')
            .removeClass('data-active');
        $('button.forward')
            .removeClass('data-active');
        $('button.play')
            .removeClass('data-active');
        element.addClass('data-active');
    };

    /* Playback buttons */
    $('.playback button')
        .on('click', function () {
            // Get the button type
            var buttonVal = $(this)
                .attr('value');

            // Switch for button functions
            switch (buttonVal) {
            case 'Stop':
                stop();
                mixerbutton($('button.stop'));
                break;
            case 'Play':
                play();
                mixerbutton($('button.play'));
                break;
            case 'Rewind':
                mixerbutton($('button.rewind'));
                break;
            case 'Fast Forward':
                mixerbutton($('button.forward'));
                break;
            }
        });
});