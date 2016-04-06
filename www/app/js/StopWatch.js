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
               trip.start();
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
        var h, m, s, ms, newTime;

        h = m = s = ms = 0;
        newTime = '';

        //h = Math.floor(time / (60 * 60 * 1000));
        //time = time % (60 * 60 * 1000);
        m = Math.floor(time / (60 * 1000));
        time = time % (60 * 1000);
        s = Math.floor(time / 1000);
        ms = time % 1000;

        var space = function (xs, sm, md, pad) {
            return '<div class="col-xs-' + xs + ' col-sm-' + sm + ' col-md-' + md + ' sys-font">' + pad + '</div>';
        };

        newTime = space(1, 3, 1, '') + space(3, 1, 3, _this.pad(m, 3)) + space(1, 1, 1, '') + space(2, 2, 2, _this.pad(s, 2)) + space(1, 1, 1, '') + space(3, 1, 3, _this.pad(ms, 3)) + space(1, 3, 1, '');
        return newTime;
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
        setInterval(_this.update, 1);
    };

    /**
     *  Clears the display interval of the clock, in other words it stops animation
     *
     *  @method StopWatch.clearClocktimer
     */
    this.clearClocktimer = function () {
        clearInterval(_this.clocktimer);
    };

    /**
     *  Interval function, writes the time of the clock into the element.
     *
     *  @method StopWatch.update
     */
    this.update = function () {
        $(_this.getId())
            .html(_this.formatTime(_this.getTime()));
    };

    /**
     *  Adjusts the clock to a given time.
     *
     *  @method StopWatch.adjust
     *  @param  {Integet}   mod     The value to adjust the time by.
     *  @return {Integer}   The current laptime.
     */
    this.adjust = function (mod) {
        _this.run('STOP');

        if (_this.laptime + mod <= 0) {
            _this.run('RESET');
        } else {
            _this.laptime += mod;
        }

        return _this.laptime;
    };

    /**
     *  This is the command function to the clock, it accepts
     *
     *  @method StopWatch.run
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
            _this.adjust(option);
            return _this.laptime;
        }
    };
};