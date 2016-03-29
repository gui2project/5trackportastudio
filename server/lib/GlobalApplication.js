/**
 *  Holds the Global application obj, this object determines information about the
 *  running application and resolves which configuration file to use. It also
 *  creates creates logging function wrappers that appends '[appName]' to the
 *  console logs to help diferentiate message made by the developers from those
 *  made by dependencies or the system.
 *
 *  @name   GlobalApplication.js
 */

//  Requires
var path = require('path');
var chalk = require('chalk'); //  coloring for console label
var msg = '[ GLOBAL ]';

/**
 *  The Global application object, ties in configurations package information and application reporting.
 *  To be run from app.js
 *
 *  Examples:
 *
 *      //  Get application root directory and system mode
 *      var root = path.resolve(__dirname);
 *      var mode = process.env.TS_RUN_MODE;
 *
 *      // Set application mode to: development | production
 *      global.app = require('./server/lib/GlobalApplication.js')(mode, root);
 *
 *  @class  GlobalApplication
 *
 *  @param  {JSON}      pJson   The package.json contents. Supplied by middleWare function.
 *  @param  {String}    mode    The ini/(developement|production|gulp).js file to use.
 *  @param  {String}    root    The application root directory.
 */
var GlobalApplication = function (pJson, mode, root) {

    //  Use this scope in children
    var _this = this;

    //  Console reporting object
    this.console = {};

    //  The label to use for the application, Name and version of the application from package.json
    this.about = pJson.name + ' ' + pJson.version;

    /**
     *  Prepends the '[appName appVersion]'
     *
     *  Examples:
     *
     *      global.app.console.log( "Message" );
     *      //  Outputs [ appName versionName ] Message
     *
     *  @method     GlobalApplication.console.log
     *  @param {List}   Anything that can be passed to console.log
     */
    this.console.log = function () {
        //  prepend to arguments
        Array.prototype.unshift.call(arguments,
            chalk.cyan('[' + _this.about + ']'));
        //  modify local console behavior
        console.log.apply(this, arguments);
    };

    /**
     *  Prepends the '[appName appVersion:ERROR]' and highlights message as red
     *
     *  Examples:
     *
     *      global.app.console.err( "Message" );
     *      //  Outputs [ appName versionName:ERROR ] Message
     *
     *  @method     GlobalApplication.console.err
     *  @param {List}   Anything that can be passed to console.log
     */
    this.console.err = function () {
        //  prepend to arguments
        Array.prototype.unshift.call(arguments,
            chalk.bgRed('[' + _this.about + ':ERROR]'));
        //  modify local console behavior
        console.log.apply(this, arguments);
    };

    /**
     *  Generates the path to the configuration file
     *
     *  @method     GlobalApplication.ini
     *  @return {String}    Path to the configuration file to use
     */
    this.ini = function () {
        return path.join(this.root, 'ini', this.mode + '.js');
    };

    this.mode = mode; //  The mode the application is running in
    this.root = root; // The root path of the application

    //  Output creation status and info
    this.console.log(msg, 'Initializing.');
    // Reporting that the configuration was used
    this.console.log(msg, 'Using:', this.ini());

    this.console.log(msg, 'Done.');
};

/**
 *  GlobalApplication middle ware intercept function
 *
 *  @function   middleWare
 *
 *  @param  {String}    mode    The ini/(developement|production|gulp).js file to use.
 *  @param  {String}    root    The application root directory.
 */
var middleWare = function (mode, root) {
    //  Get package.json
    var pjson = require('../../package.json');
    //  Generate an instance of the information object
    return new GlobalApplication(pjson, mode, root);
};

//  Export content
module.exports = middleWare;