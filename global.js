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

//  The information object
var info = function( pJson ) {
    /**
     *  Modifies the console logs when used through the object to prepend
     *  '[appName'].
     */
    this.console = {
        /**
         *  consol.log replacement
         */
        log: function(){
            Array.prototype.unshift.call(arguments,
                                '[' + pJson.name + ' ' + pJson.version + ']');
            console.log.apply(this, arguments);
        }
    };
    /**
     *  The path to the configuration file
     */
    this.ini = function(){return path.join( this.root,
                                            'ini',
                                            this.mode + '.js');};
    /**
     *  The name of the application
     */
    this.name = pJson.name;
    /**
     *  The mode to run the application in
     */
    this.mode = 'developement';
    /**
     *  The root directory
     */
    this.root = path.resolve(__dirname);
    /**
     *  Application version
     */
    this.version =  pJson.version;

    //  Output creation status and info
    this.console.log('Created global.app');
    this.console.log(this);
};

//  Generate an instance of the information object
var obj = new info( pjson );

/* Application paths export*/
module.exports = obj;
