/**
 *  @file   lib.js
 *
 *  holds application functions
 */

/**
 *  @name getCookie
 *
 *  retrieves cookies from the system
 *
 *  @param name     the cookie name to search for
 *
 *  @return         the value of the cookie
 */
var getCookie = function(name){

    var re, mrsfields, cookie = Cookies.get(name);
    //console.log(name, ':', cookie);

    mrsfields = cookie;

    if (cookie == undefined) {
        return 'empty';
    } else if (cookie.indexOf('"') != -1) {
        re = new RegExp(/[^"]+(?=(" ")|"$)/g);
        cookie = re.exec(cookie);

        if (Array.isArray(cookie)){
            mrsfields = cookie[0]
        } else {
            mrsfields = cookie;
        }

        //onsole.log(name, ':', mrsfields);
    }

    return mrsfields == null ? 'empty' : mrsfields;
}

/**
 *  @name validateSession
 *
 *  Validates a session and sets up initial view
 */
var validateSession = function(){
    if (ts.user_id == 'empty') {
        console.log("No session");
        dd.show('INIT', ts.session = false, false);
    } else {
        $.ajax({
            url: '/api/get/session/valid'
        }).done(function() {
            console.log("valid session");
            dd.show('MIX', ts.session = true, false);
        }).fail(function(){
            console.log("invalid session");
            dd.show('INIT', ts.session = false, false);
        });
    }
};