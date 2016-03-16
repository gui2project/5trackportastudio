/**
 *  @file   init.js
 *
 *  This file runs before any other scripts to initialize the system
 */

//  VARIABLE DECLARATIONS

var sw = null;              //  Stop watch
var dd = null;              //  Drop Down
var ts = {                  //  trackstudio cookies
    user_id: null,              //  user hash
    user_session: null,         //  session hash
    session: false              //  session state
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
var require = function(src){
    switch(src){
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
var getCookie = function(name){
    var re,         //  Holds the regular expression
        ret,        //  The cookie string value
        exp,        //  The regular expression
        cookie;     //  Holds the cookie name

    exp = /[^"]+(?=(" ")|"$)/g;
    ret = cookie = Cookies.get(name);

    //  Undefined cookie
    if (cookie == undefined)
        return 'empty';

    //  Detect for quote artifact
    if (cookie.indexOf('"') != -1) {
        re      = new RegExp();
        cookie  = re.exec(cookie);
        ret     = (Array.isArray(cookie) ? cookie[0] : cookie);
    }

    //  Previously recognized empty cookie
    return (ret == null ? 'empty' : ret);
};

/**
 *  @name   validateSession
 *
 *  Validates a session and sets up the ts object, handles initial views
 *
 *  @param  callSession     The function to call on success
 *  @param  callNoSession   The function to call on failure
 */
var validateSession = function(callSession, callNoSession){
    console.log('--- Validationg session');

    //  Setting Defaults
    callNoSession   = dVar(callNoSession, function(){});
    callSession     = dVar(callSession, function(){});

    //  Initializing cookie value
    ts.user_id      = getCookie('ts_user_id');
    ts.user_session = getCookie('ts_user_session');
    ts.session      = false;

    //  Lock Navigation
    dd.navigation.display.lock(ts.session);

    if (ts.user_id == 'empty') {
        //  No user cookie found
        console.log("No session", ts);

        if(callNoSession) callNoSession();
    } else {
        //  User cookie found
        $.ajax({
            url: '/api/get/session/valid'
        }).done(function(data) {
            var session;

            //  Update cookie
            ts.user_id = getCookie('ts_user_id');
            ts.user_session = getCookie('ts_user_session');

            if (data){
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
        }).fail(function(){
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
var dVar = function(param, def) {
    return (typeof param === 'undefined') ? def : param;
};