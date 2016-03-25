/**
 *  @file   Security.js
 *
 *  The Security handler for the application.
 *
 *  code modified from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */

var crypto  = require('crypto');
var https   = require('https');

var ini     = require(global.app.ini());

var msg     = '[ SECURITY ]';

/**
 *  @name   Security
 *
 *  This is the Security object. It adds hashing and authentication to the application..
 *
 *  Security Usage:
 *
 *  var security = new Security();
 *  var salt = security.salt();
 *  var hash = security.hash(req.params.pass, salt);
 */
var Security = function() {

    this.hash = function (pass, salt) {
        global.app.console.log(msg, 'Hashing a password.');
        var h = crypto.createHash('sha512');

        h.update(String(pass));
        h.update(String(salt));

        return h.digest('base64');
    };

    this.salt = function() {
        //global.app.console.log(msg, 'Creating cryptoplogically secure GUID.');
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    };

    this.s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    this.ssl = function(app){
        if (ini.security.ssl.state) {
            var https = require('https');

            var httpsOptions = {
                key:    ini.security.ssl.key,
                cert:   ini.security.ssl.cert
            };
            global.app.console.log(msg, 'SSL.');
            https.createServer(httpsOptions, app).listen(ini.security.ssl.port);
        }
    }
};

/**
 *  @name exp
 *
 *  Middle ware to intercept for the Security class
 *
 *  @return     An instantiated Security object.
 */
var exp = function(){
    //  Generate an instance of the Security object
    return new Security();
};

//  Export content
module.exports = exp;