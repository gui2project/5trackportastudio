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
var pjson           = require('./package.json');
var chalk           = require('chalk');         //  coloring for console label

//  The information object
var info = function( pJson, mode) {

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
                                chalk.blue( '[' + _this.about + ']' ));
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
    this.root = path.resolve(__dirname);

    //  Output creation status and info
    this.console.log('Created global.app\n',this);
};

/* Application paths export*/
module.exports = function(mode){
    //  Generate an instance of the information object
    return new info(pjson, mode);
}

