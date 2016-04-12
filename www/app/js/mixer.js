/**
 *  @file   mixer.js
 *
 *  description
 */
$(function () {
    var enableButton = function (arr, state) {
        arr.forEach(function (elem) {
            if (state) {
                $(elem)
                    .prop('disabled', state)
                    .addClass('disabledButton')
                    .removeClass('data-active');

            } else {
                $(elem)
                    .prop('disabled', state)
                    .removeClass('disabledButton');
            }
        });
    };

    var mixerbutton = function (arr, state) {
        arr.forEach(function (elem) {
            if (state) {
                console.log('adding data-active:' + elem);
                $(elem)
                    .addClass('data-active');

            } else {
                $(elem)
                    .prop('disabled', state)
                    .removeClass('data-active');
            }
        });
    };

    var playback = function (buttonVal) {

        mixerbutton(['button.stop', 'button.rewind', 'button.forward', 'button.play'], false);

        // Switch for button functions
        switch (buttonVal) {
        case 'Stop':
            stop();
            mixerbutton(['button.stop'], true);
            setTimeout(function () {
                $('button.stop')
                    .removeClass('data-active');
            }, 600);
            break;
        case 'Play':
            play();
            mixerbutton(['button.play'], true);
            break;
        case 'Rewind':
            mixerbutton(['button.rewind'], true);
            break;
        case 'Fast Forward':
            mixerbutton(['button.forward'], true);
            break;
        }
    };

    /* Add data to the mute & record buttons */
    $('.mute button')
        .attr('data-muted', 0)
        .find('.fa-volume-off')
        .css('display', 'none');

    $('.record button')
        .attr('data-armed', 0)
        .find('.fa-stop')
        .css('display', 'none');

    /* Set up track names */
    $('.name')
        .tracklabel();

    /* Set up EQ knobs */
    $('.eq input')
        .val(0)
        .trigger('change')
        .knob({
            width: 60,
            height: 60,
            min: -12,
            max: 12,
            angleOffset: -125,
            angleArc: 250,
            cursor: 20,
            displayInput: false,
            fgColor: '#149BDF'
        });

    /* Set up pan knobs */
    $('.pan input')
        .val(0)
        .trigger('change')
        .knob({
            width: 60,
            height: 60,
            min: -1,
            max: 1,
            step: 0.1,
            angleOffset: -125,
            angleArc: 250,
            cursor: 20,
            displayInput: false,
            fgColor: '#149BDF'
        });

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
                    .removeClass('armed')
                    .find('.fa-volume-up')
                    .css('display', 'block')
                    .end()
                    .find('.fa-volume-off')
                    .css('display', 'none');

                muteToggle(trackNumber);
            } else if (!isMuted) {
                // Turn on armed
                $(this)
                    .attr('data-muted', 1)
                    .addClass('armed')
                    .find('.fa-volume-off')
                    .css('display', 'block')
                    .end()
                    .find('.fa-volume-up')
                    .css('display', 'none');

                muteToggle(trackNumber);
            }
        });

    /* Playback buttons */
    $('.playback button')
        .on('click', function () {
            playback($(this)
                .attr('value'));
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
                    .removeClass('armed')
                    .find('.fa-stop')
                    .css('display', 'none')
                    .end()
                    .find('.fa-circle')
                    .css('display', 'block')
                    .end();

                recordToggle(trackNumber);
                armTrackToggle(trackNumber);

                enableButton(['button.stop', 'button.play', 'button.forward', 'button.rewind', '.record button'], false);

                $(this)
                    .prop('disabled', 0);
            } else {
                // Turn on armed
                $(this)
                    .attr('data-armed', 1)
                    .addClass('armed')
                    .find('.fa-stop')
                    .css('display', 'block')
                    .end()
                    .find('.fa-circle')
                    .css('display', 'none')
                    .end();

                armTrackToggle(trackNumber);
                recordToggle(trackNumber);

                enableButton(['button.stop', 'button.play', 'button.forward', 'button.rewind', '.record button'], true);

                $(this)
                    .prop('disabled', 0);

                mixerbutton(['button.stop'], false);
            }
        });
});