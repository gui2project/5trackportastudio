/**
 *  @file   globals.js
 *
 *  Holds the information obj, this object determines information about the
 *  running application and resolves which configuration file to use. It also
 *  creates creates logging function wrappers that appends '[appName]' to the
 *  console logs to help diferentiate message made by the developers from those
 *  made by dependencies or the system.
 */

//  Requires
var path            = require('path');
var pjson           = require('../../package.json');
var chalk           = require('chalk');         //  coloring for console label
var msg             = '[ GLOBAL ]';

//  The information object
var info = function(pJson, mode, root) {

    /**
     *  Use this scope in children
     */
    var _this = this;

    /**
     *  The label to use for the application
     */
    this.about = pJson.name + ' ' + pJson.version ;

    /**
     *  Modifies the console logs when used through the object to prepend
     *  '[appName appVersion'].
     */
    this.console = {
        /**
         *  consol.log replacement
         */
        log: function(){
            //  prepend to arguments
            Array.prototype.unshift.call(arguments,
                                chalk.cyan( '[' + _this.about + ']' ));
            //  modify local console behavior
            console.log.apply(this, arguments);
        },
        err: function(){
            //  prepend to arguments
            Array.prototype.unshift.call(arguments,
                                chalk.bgRed( '[' + _this.about + ':ERROR]' ));
            //  modify local console behavior
            console.log.apply(this, arguments);
        }
    };

    /**
     *  The path to the configuration file
     */
    this.ini = function(){
        return path.join(this.root, 'ini', this.mode + '.js');
    }

    /**
     *  The mode to run the application in
     */
    this.mode = mode;

    /**
     *  The root directory
     */
    this.root = root;

    //  Output creation status and info
    this.console.log(msg, 'Initializing.');
    // Reporting that the configuration was used
    this.console.log(msg, 'Using:', this.ini());

    this.console.log(msg, 'Done.');
};

/**
 *  @name exp
 *
 *  Middle ware to intercept the configuration mode
 *
 *  @param      mode    "developement" | "production"
 *
 *  @return     An instantiated configuration object.
 */
var exp = function(mode, root){
    //  Generate an instance of the information object
    return new info(pjson, mode, root);
};

//  Export content
module.exports = exp;

