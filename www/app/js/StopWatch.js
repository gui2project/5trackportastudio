/**
 *  @file   StopWatch.js
 *
 *  Holds the stopwatch class
 */

/**
 *  @name   StopWatch
 *
 *  This is a stopwatch that will be used to create a clock to manage tracks play position
 *
 *  modified from https://gist.github.com/electricg/4372563
 */
var StopWatch = function () {

    var _this = this;

    this.startAt = 0; //  start time
    this.lapTime = 0; //  run time
    this.id = ''; //   Id name
    this.clocktimer = null; //   setinterval holder

    /**
     *  @name       now
     *
     *  Gets current time
     *
     *  @return      current time
     */
    this.now = function () {
        return (new Date())
            .getTime();
    };

    /**
     *  @name       start
     *
     *  start the clock
     */
    this.start = function () {
        _this.startAt = _this.startAt ? _this.startAt : _this.now();
    };

    /**
     *  @name        stop
     *
     *  stop the clock
     */
    this.stop = function () {
        // If running, update elapsed time otherwise keep it
        _this.lapTime = _this.startAt ? _this.lapTime + _this.now() - _this.startAt : _this.lapTime;
        _this.startAt = 0; // Paused
    };

    /**
     *  @name       reset
     *
     *  reset the clock time values
     */
    this.reset = function () {
        _this.lapTime = 0;
        _this.startAt = 0;
    };

    /**
     *  @name   getTime
     *
     *  get the runtime
     *
     *  @return     the runtime
     */
    this.getTime = function () {
        return _this.lapTime + (_this.startAt ? _this.now() - _this.startAt : 0);
    };

    /**
     *  @name   pad
     *
     *  gives a number formated with leading zeroes
     *
     *  @param  num     the number to pad
     *  @param  size    how many digits to show
     *
     *  @return {STRING}    formated number
     */
    this.pad = function (num, size) {
        var s = '0000' + num;
        return s.substr(s.length - size);
    };

    /**
     * @name    formatTime
     *
     * Formats the time display
     *
     * @param   time    The timestamp to display
     *
     * @return  the new time string to display
     */
    this.formatTime = function (time) {
        var h, m, s, ms, newTime;

        h = m = s = ms = 0;
        newTime = '';

        h = Math.floor(time / (60 * 60 * 1000));
        time = time % (60 * 60 * 1000);
        m = Math.floor(time / (60 * 1000));
        time = time % (60 * 1000);
        s = Math.floor(time / 1000);
        ms = time % 1000;

        var colon = '<span class="sys-font">:</span>';
        var period = '<span class="sys-font"> </span>';
        newTime = _this.pad(h, 2) + period + _this.pad(m, 2) + period + _this.pad(s, 2) + period + _this.pad(ms, 3);
        return newTime;
    };

    /**
     *  @name    setId
     *
     *  sets the id of the element to insert the clock
     *
     *  @param  id      the id of the element
     */
    this.setId = function (id) {
        _this.id = id;
    };

    /**
     *  @name   getId
     *
     *  get the Id of the element that has the clock
     *
     *  @return         the id of the clock
     */
    this.getId = function () {
        return _this.id;
    };

    /**
     *  @name   setClocktimer
     *
     *  sets the display interval of the clock, In other words it animates changes in time
     */
    this.setClocktimer = function () {
        setInterval(_this.update, 1);
    };

    /**
     *  @name   clearClocktimer
     *
     *  clears the display interval of the clock, in other words it stops animation
     */
    this.clearClocktimer = function () {
        clearInterval(_this.clocktimer);
    };

    /**
     *  @name   update
     *
     *  interval function, writes the time of the clock into the element.
     */
    this.update = function () {
        $(_this.getId())
            .html(_this.formatTime(_this.getTime()));
    };

    /**
     *  @name   adjust
     *
     * adjusts the clock to a given time
     *
     *  @param  mod     the value to adjust the time by
     *
     *  @return         the current laptime
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
     *  @name   run
     *
     *  This is the command function to the clock, it accepts
     *
     *  @param  action      'START' -   Starts the stopwatch
     *                      'STOP'  -   Stops the stopwatch
     *                      'RESET' -   Restarts the stopwatch
     *                      'INIT'  -   Initializes the stopwatch
     * @param   option      Any options that an action requires.
     *          null        no options
     *          idString    Required by 'INIT', the idstring of the element that will display the clock
     *
     * @return              The lapTime or RunTime on the stopwatch
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

// var sw = new StopWatch();

// sw.run('INIT', 'time');
//  STARTTIME = sw.run('START');
//  STOPTIME = sw.run('STOP');
//  NEW POSITION = SW.RUN('ADJUST', 1000)
//  0 = sw.run('RESET');