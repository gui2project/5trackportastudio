/**
 *  The Security handler for the application.
 *
 *  code modified from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 *
 *  @name   Security.js
 */

//  REQUIRES

var crypto = require('crypto');
var https = require('https');

var ini = require(global.app.ini());

//  VARIABLES

var msg = '[ SECURITY ]';

/**
 *  This is the Security object. It adds hashing and authentication to the application..
 *
 *  Examples:
 *
 *      var security = new Security();
 *      var salt = security.salt();
 *      var hash = security.hash(req.params.pass, salt);
 *
 *  @class   Security
 */
var Security = function () {

    /**
     *  Generates a hash from the input and salt values
     *
     *  Examples:
     *
     *      var security = new Security();
     *
     *      savedHash == security.hash("InputString", savedSalt) ?
     *          console.log("Same input String") :
     *          console.log("Different input String");
     *
     *  @method     Security.hash
     *
     *  @param     {String}    Input to hash
     *  @param     {String}    Salt to use in hash
     *
     *  @return    {String}    Hash string
     */
    this.hash = function (input, salt) {

        var h = crypto.createHash('sha512');
        global.app.console.log(msg, 'Hashing input.');

        h.update(String(input));
        h.update(String(salt));

        return h.digest('base64');
    };

    /**
     *  Generate a salt to use for Hashing
     *
     *  @method     Security.salt
     *
     *  @return     {String}    A cryptoplogically secure GUID to use
     *                          as a salt during Hashing
     */
    this.salt = function () {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    };

    /**
     *  Generate a Four digit salt
     *
     *  @method     Security.s4
     *
     *  @return {String}    Four digit salt
     */
    this.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    /**
     *  Enable ssl security if ini.security.ssl.state == true
     *
     *  @method     ssl
     *
     *  @param {obj}    app     The express application
     */
    this.ssl = function (app) {
        if (ini.security.ssl.state) {
            var https = require('https');

            var httpsOptions = {
                key: ini.security.ssl.key,
                cert: ini.security.ssl.cert
            };

            global.app.console.log(msg, 'SSL.');
            https.createServer(httpsOptions, app)
                .listen(ini.security.ssl.port);
        }
    };
};

/**
 *  Middleware to intercept for the Security class
 *
 *  @function   middleWare
 *
 *  @return {Object}    An instantiated Security object.
 */
var middleWare = function () {
    //  Generate an instance of the Security object
    return new Security();
};

//  Export content
module.exports = middleWare;