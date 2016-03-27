/**
 *  @name   GlobalApplication.js
 *
 *  Holds the Global application obj, this object determines information about the
 *  running application and resolves which configuration file to use. It also
 *  creates creates logging function wrappers that appends '[appName]' to the
 *  console logs to help diferentiate message made by the developers from those
 *  made by dependencies or the system.
 */

//  Requires
var path = require('path');
var chalk = require('chalk'); //  coloring for console label
var msg = '[ GLOBAL ]';

/**
 *  @class  GlobalApplication
 *
 *  The Global application object, ties in configurations package information and application reporting.
 *
 *  @param  {JSON}      pJson   The package.json contents.
 *  @param  {String}    mode    The ini/(developement|production|gulp).js file to use.
 *  @param  {String}    root    The application root directory.
 */
var GlobalApplication = function (pJson, mode, root) {

    //  Use this scope in children
    var _this = this;

    //  Console reporting object
    this.console = {};

    /**
     *  @name about
     *
     *  The label to use for the application, Name and version of the application from package.json
     */
    this.about = pJson.name + ' ' + pJson.version;

    /**
     *  @method     console.log
     *
     *  Prepends the '[appName appVersion]'
     */
    this.console.log = function () {
        //  prepend to arguments
        Array.prototype.unshift.call(arguments,
            chalk.cyan('[' + _this.about + ']'));
        //  modify local console behavior
        console.log.apply(this, arguments);
    };

    /**
     *  @method     console.err
     *
     *  Prepends the '[appName appVersion:ERROR]' and highlights message as red
     */
    this.console.err = function () {
        //  prepend to arguments
        Array.prototype.unshift.call(arguments,
            chalk.bgRed('[' + _this.about + ':ERROR]'));
        //  modify local console behavior
        console.log.apply(this, arguments);
    };

    /**
     *  @method     ini
     *
     *  The path to the configuration file
     *
     *  @return {String}    Path to the configuration file to use
     */
    this.ini = function () {
        return path.join(this.root, 'ini', this.mode + '.js');
    };

    /**
     *  @name     mode
     *
     *  The mode the application is running in
     */
    this.mode = mode;

    /**
     *  @name   root
     *
     *  The root path of the application
     */
    this.root = root;

    //  Output creation status and info
    this.console.log(msg, 'Initializing.');
    // Reporting that the configuration was used
    this.console.log(msg, 'Using:', this.ini());

    this.console.log(msg, 'Done.');
};

/**
 *  @function   middleWare
 *
 *  GlobalApplication middle ware intercept function
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