/**
 *  @file   init.js
 *
 *  This file runs before any other scripts to initialize the system
 */

//  CONTEXT DETERMINATIONS

// Redirect user to https
if(window.location.href.indexOf("https") > -1) {
    window.location.href = "https://trackstudio.herokuapp.com/";

//  Determine audio context
window.AudioContext = window.AudioContext ||
    window.webkitAudioContext;

//  Determine navigator for microphone detection
navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

//  VARIABLE DECLARATIONS

var ac = null; //  Audio Context
var sw = null; //  Stop watch
var dd = null; //  Drop Down
var ts = { //  trackstudio cookies
    user_id: null, //  user hash
    user_session: null, //  session hash
    session: false //  session state
};

//  APPLICATION FUNCTIONS

/**
 *  @name   require
 *
 *  This is a client side function that emulates the action of require for
 *  loaded node_modules that are being served through static virtual directory.
 *
 *  It is used to resolve the dependency without modifying the node_module itself
 *  this is important because any changes to the node_module locally will not
 *  propogate when being rebuilt.
 *
 *  @param      src         The string name being required
 *
 *  @return         The code being required
 */
var require = function (src) {
    switch (src) {
    case 'jquery':
        return $;
    default:
        return undefined;
    }
};

/**
 *  @name   getCookie
 *
 *  Retrieves cookies from the system, this function is necessary
 *  because artifacts were being passed prepended to the cookie
 *  value.
 *
 *  @param  name            The cookie name to search for
 *
 *  @return ret     The value of the cookie
 */
var getCookie = function (name) {
    var re, //  Holds the regular expression
        ret, //  The cookie string value
        exp, //  The regular expression
        cookie; //  Holds the cookie name

    exp = /[^"]+(?=(" ")|"$)/g;
    ret = cookie = Cookies.get(name);

    //  Undefined cookie
    if (cookie === undefined)
        return 'empty';

    //  Detect for quote artifact
    if (cookie.indexOf('"') != -1) {
        cookie = exp.exec(cookie);
        ret = (Array.isArray(cookie) ? cookie[0] : cookie);
    }

    //  Previously recognized empty cookie
    return (ret === null ? 'empty' : ret);
};

/**
 *  @name   validateSession
 *
 *  Validates a session and sets up the ts object, handles initial views
 *
 *  @param  callSession     The function to call on success
 *  @param  callNoSession   The function to call on failure
 */
var validateSession = function (callSession, callNoSession) {
    console.log('--- Validationg session');

    //  Setting Defaults
    callNoSession = dVar(callNoSession, function () {});
    callSession = dVar(callSession, function () {});

    //  Initializing cookie value
    ts.user_id = getCookie('ts_user_id');
    ts.user_session = getCookie('ts_user_session');
    ts.session = false;

    //  Lock Navigation
    dd.navigation.display.lock(ts.session);

    if (ts.user_id == 'empty') {
        //  No user cookie found
        console.log("No session", ts);

        if (callNoSession) callNoSession();
    } else {
        //  User cookie found
        $.ajax({
                url: '/api/get/session/valid'
            })
            .done(function (data) {
                var session;

                //  Update cookie
                ts.user_id = getCookie('ts_user_id');
                ts.user_session = getCookie('ts_user_session');

                if (data) {
                    console.log(" Succesful return: Valid session");
                    ts.session = true;
                    session = callSession;
                } else {
                    console.log(" Succesful return: Invalid session");
                    ts.session = false;
                    session = callNoSession;
                }

                console.log('Current cookie:', ts);
                dd.navigation.display.lock(ts.session);

                if (session) session();
            })
            .fail(function () {
                ts.user_id = getCookie('ts_user_id');
                ts.user_session = getCookie('ts_user_session');
                ts.session = false;

                console.log("Invalid session", ts);
                dd.navigation.display.lock(ts.session);

                if (callNoSession) callNoSession();
            });
    }
};

/**
 *  @name   dVar
 *
 *  Gets the default parameter if one was not given
 *
 *  @param  param           The value to test
 *  @param  def             The default value
 *
 *  @return         The default paramater
 */
var dVar = function (param, def) {
    return (typeof param === 'undefined') ? def : param;
};

/**
 *  @name   getMicrophone
 *
 *  Detects the microphone and sets up callbacks
 *
 *  @param  micSuccess     The microphone success callback
 *  @param  micFailure     The microphone failure callback
 *  @param  browserFailure The browser incompatibility callback
 */
var getMicrophone = function (micSuccess, micFailure, browserFailure) {
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            audio: true
        }, micSuccess, micFailure);
    } else browserFailure();
};

//http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
var getBrowser = function () {
    return (function () {
        var ua = navigator.userAgent;
        var temp = null;
        var ret = {
            browser: null,
            version: null
        };
        var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident/i.test(M[1])) {
            temp = /\brv[ :]+(\d+)/g.exec(ua) || [];
            ret.browser = 'IE';
            ret.version = (temp[1] || '');
            return ret;
        }

        if (M[1] === 'Chrome') {
            temp = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (temp !== null) {
                ret.browser = temp.slice(1)[0].replace('OPR', 'Opera');
                ret.version = temp.slice(1)[1];
                return ret;
            }
        }

        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        temp = ua.match(/version\/(\d+)/i);

        if (temp !== null)
            M.splice(1, 1, temp[1]);

        ret.browser = M[0];
        ret.version = M[1];

        return ret;
    })();
};