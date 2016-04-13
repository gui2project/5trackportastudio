/**
 *  @file   mixer.js
 *
 *  description
 */
$(function () {

    /**
     *  Enables a button.
     *
     *  @function enableButton
     *  @param {Array} arr An array of selectors to enable.
     */
    var enableButton = function (arr) {
        toggleButtonState(arr, true);
    };

    /**
     *  Disables a button.
     *
     *  @function disableButton
     *  @param {Array} arr An array of selectors to disable.
     */
    var disableButton = function (arr) {
        toggleButtonState(arr, false);
    };

    /**
     *  Toggles a button state
     *
     *  @function toggleButtonState
     *  @param {Array} arr An array of selectors
     *  @param {Boolean} state The state to place the button in
     */
    var toggleButtonState = function (arr, state) {
        arr.forEach(function (elem) {
            if (!state) {
                $(elem)
                    .prop('disabled', 1)
                    .addClass('disabledButton')
                    .removeClass('data-active');

            } else {
                $(elem)
                    .prop('disabled', 0)
                    .removeClass('disabledButton');
            }
        });
    };

    /**
     *  Disables a button state in a jQuery Chain
     *
     *  @function $.fn.disableButton
     *  @see disableButton
     *  @param {Array} arr An array of selectors
     *  @param {Boolean} state The state to place the button in
     */
    $.fn.disableButton = function () {
        disableButton([this]);
        return this;
    };
    /**
     *  Enables a button state in a jQuery Chain
     *
     *  @function $.fn.enableButton
     *  @see enableButton
     *  @param {Array} arr An array of selectors
     *  @param {Boolean} state The state to place the button in
     */
    $.fn.enableButton = function () {
        enableButton([this]);
        return this;
    };

    //  Mixer component initializations
    $('.track')
        .attr('data-track-length', 0)
        .on('datachange', function () {
            var arr = [];
            var count = 0;

            $('.track')
                .each(function () {

                    //  Record all track lengths
                    arr.push(parseInt($(this)
                        .attr('data-track-length')));

                    //  when all tracks are recorded
                    if (++count >= 3) {
                        var max = Math.max.apply(null, arr);
                        var values = [0, 0, 0, 0];

                        //  check for maximum track
                        if (max !== 0) {
                            values = arr.map(function (dividend) {
                                return (dividend / max) * 100;
                            });
                        }

                        //  update master track length
                        $('.master')
                            .attr('data-track-length', max)
                            .trigger('update');

                        //  UPDATE THE PERCENT BAR
                        for (i = 0; i < values.length; ++i) {
                            var selector = '.graph-clock > .graph-clock-wrapper:nth-child(' +
                                parseInt(1 + i) + ') .graph-clock-bar';

                            console.log(selector);
                            $(selector)
                                .css({
                                    'width': values[i] + '%'
                                });
                        }
                    }
                });
        });

    $('.master')
        .on('update', function () {
            sw.setTrack('master', $('.master')
                .attr('data-track-length'));
        });

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

    //  METER
    $('.meter')
        .meter(36);
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
        .attr('data-muted', 0)
        .find('.fa-volume-off')
        .css('display', 'none')
        .end()
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
    $('button.stop')
        .disableButton()
        .on('click', function () {
            enableButton(['button.play', 'button.rewind', 'button.forward', '.record button']);
            disableButton(['button.stop']);
            stop();

        });
    $('button.play')
        .disableButton()
        .on('click', function () {
            enableButton(['button.stop']);
            disableButton(['button.play', 'button.forward', 'button.rewind', '.record button']);

            play();
        });
    $('button.forward')
        .disableButton()
        .on('click', function () {
            enableButton(['button.stop']);
            disableButton(['button.play', 'button.forward', 'button.rewind', '.record button']);
        });
    $('button.rewind')
        .disableButton()
        .on('click', function () {
            enableButton(['button.stop']);
            disableButton(['button.play', 'button.forward', 'button.rewind', '.record button']);
        });

    /* Recording buttons */
    $('.record button')
        .attr('data-armed', 0)
        .find('.fa-stop')
        .css('display', 'none')
        .end()
        .on('click', function () {

            var trackId = $(this)
                .closest('.track')
                .attr('id')
                .substr(6) - 1;
            var trackSelector = '#track-' + (1 + trackId);

            var _this = this;

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

                clearInterval(trackClear[trackId]);

                enableButton(['button.play', 'button.forward', 'button.rewind', '.record button']);

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

                trackClear[trackId] = setInterval(function () {
                    var trackTime = sw.getTime();
                    $(trackSelector)
                        .attr('data-track-length', trackTime)
                        .trigger('datachange');
                    sw.setTrack(trackId, trackTime);
                }, 1);

                disableButton(['button.stop', 'button.play', 'button.forward', 'button.rewind', '.record button']);

                $(this)
                    .prop('disabled', 0);
            }
        });
});