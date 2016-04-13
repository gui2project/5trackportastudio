/**
 *  @file   StopWatch.js
 *
 *  Holds the stopwatch class
 */

/**
 *  This is a stopwatch that will be used to create a clock to manage tracks play position
 *
 *  modified from https://gist.github.com/electricg/4372563
 *
 *  @class   StopWatch
 */
var StopWatch = function () {

    var _this = this;

    this.startAt = 0; //  start time
    this.lapTime = 0; //  run time
    this.id = ''; //   Id name
    this.clocktimer = null; //   setinterval holder
    this.clocktimerBool = false; // if the interval has been started
    this.maxRunTime = 0;

    /**
     *  Gets current time
     *
     *  @method     StopWatch.now
     *  @return     {String} current time
     */
    this.now = function () {
        return (new Date())
            .getTime();
    };

    /**
     *  Starts the clock
     *
     *  @method     StopWatch.start
     */
    this.start = function () {

        _this.startAt = _this.startAt ? _this.startAt : _this.now();
    };

    /**
     *  Stops the clock
     *
     *  @method     StopWatch.stop
     */
    this.stop = function () {
        // If running, update elapsed time otherwise keep it
        _this.lapTime = _this.startAt ? _this.lapTime + _this.now() - _this.startAt : _this.lapTime;
        _this.startAt = 0; // Paused
    };

    /**
     *  Reset the clock time values
     *
     *  @method     StopWatch.reset
     */
    this.reset = function () {
        _this.lapTime = 0;
        _this.startAt = 0;
    };

    /**
     *  Get the runtime
     *
     *  @method     StopWatch.getTime
     *  @return {Integer}    The runtime
     */
    this.getTime = function () {
        return _this.lapTime + (_this.startAt ? _this.now() - _this.startAt : 0);
    };

    /**
     *  Gives a number formated with leading zeroes
     *
     *  @method     StopWatch.pad
     *  @param  {Integer} num     The number to pad
     *  @param  {Integer} size    How many digits to show
     *  @return {STRING}    formated number
     */
    this.pad = function (num, size) {
        var s = '0000' + num;
        return s.substr(s.length - size);
    };

    /**
     *  Formats the time display
     *
     *  @method     StopWatch.formatTime
     *  @param   {Integer}   time    The timestamp to display
     *  @return  the new time string to display
     */
    this.formatTime = function (time) {
        var minutes,
            seconds,
            milliseconds,
            section = function (xs, sm, md, pad) {
                return $('<div></div>')
                    .addClass(['col-xs-' + xs, 'col-sm-' + sm, 'col-md-' + md, 'sys-font'].join(' '))
                    .html(pad);
            };

        //  Calculate time
        minutes = Math.floor(time / (60 * 1000));
        time %= (60 * 1000);
        seconds = Math.floor(time / 1000);
        time %= 1000;
        milliseconds = time;

        return $('<div></div>')
            .append(section(1, 3, 1, ''))
            .append(section(3, 1, 3, _this.pad(minutes, 3)))
            .append(section(1, 1, 1, ''))
            .append(section(2, 2, 2, _this.pad(seconds, 2)))
            .append(section(1, 1, 1, ''))
            .append(section(3, 1, 3, _this.pad(milliseconds, 3)))
            .append(section(1, 3, 1, ''));
    };

    /**
     *  Sets the id of the element to insert the clock
     *
     *  @method StopWatch.setId
     *  @param  {String} id      The id of the element
     */
    this.setId = function (id) {
        _this.id = id;
    };

    /**
     *  Get the Id of the element that has the clock
     *
     *  @method     StopWatch.getId
     *  @return     {String}    The id of the clock
     */
    this.getId = function () {
        return _this.id;
    };

    /**
     *  Sets the display interval of the clock, In other words it animates changes in time
     *
     *  @method StopWatch.setClocktimer
     */
    this.setClocktimer = function () {
        if (_this.clocktimerBool === false) {
            _this.clocktimerBool = true;
            _this.clocktimer = setInterval(_this.update, 1);
        }
    };

    /**
     *  Clears the display interval of the clock, in other words it stops animation
     *
     *  @method StopWatch.clearClocktimer
     */
    this.clearClocktimer = function () {
        if (_this.clocktimerBool) {
            clearInterval(_this.clocktimer);
            _this.clocktimerBool = false;
        }

    };

    /**
     *  Interval function, writes the time of the clock into the element.
     *
     *  @method StopWatch.update
     */
    this.update = function () {
        var time = _this.getTime();

        positionNeedle(time);

        //  Terminate at max time
        if (_this.maxRunTime !== -1 &&
            time >= _this.maxRunTime &&
            _this.clocktimerBool) {

            $('button.stop')
                .trigger('click');

            _this.clearClocktimer();
        }
    };

    /**
     *  Adjusts the clock to a given time.
     *
     *  @method StopWatch.adjust
     *  @param  {Integet}   offset     The value to adjust the time by.
     *  @return {Integer}   The current laptime.
     */
    this.adjust = function (offset) {
        _this.run('STOP');

        if ((_this.laptime + offset) <= 0) {
            _this.run('RESET');
        } else {
            _this.laptime += offset;
        }

        return _this.laptime;
    };
    /**
     *  Sets track or masters individual play length.
     *
     *  @method StopWatch.setTrack
     *
     *  @param {String} trackNumber Accepts the track designating value
     *  @param {Integer} value The time elapsed for the track.
     */
    this.setTrack = function (trackNumber, value) {
        $('#track-time-display-' + trackNumber)
            .html(_this.formatTime(value));
    };
    /**
     *  This is the command function to the clock, it accepts
     *
     *  @method StopWatch.run
     *
     *  @param  {String} action 'START' -   Starts the stopwatch
     *                          'STOP'  -   Stops the stopwatch
     *                          'RESET' -   Restarts the stopwatch
     *                          'INIT'  -   Initializes the stopwatch
     * @param   {String} option  Any options that an action requires.
     *                          null        no options
     *                          idString    Required by 'INIT', the idstring of the element that will display the clock
     *
     * @return  {Integer| Null} The lapTime or RunTime on the stopwatch
     */
    this.run = function (action, option) {
        switch (action) {
        case 'INIT': // requires option IdString
            _this.setId(option);
            _this.update();

            return _this.laptime;

        case 'START':
            _this.maxRunTime = dVar(option, parseInt($('.master')
                .attr('data-track-length')));

            _this.setClocktimer();
            _this.start();

            return _this.laptime;

        case 'STOP':
            _this.stop();
            _this.clearClocktimer();

            return _this.laptime;

        case 'RESET':
            _this.stop();
            _this.clearClocktimer();
            _this.reset();
            _this.update();

            return _this.laptime;

        case 'ADJUST': //needs a value from option
            option = dVar(option, 500);

            _this.adjust(option);

            return _this.laptime;
        }
    };
};