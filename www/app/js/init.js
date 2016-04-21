/**
 *  @file   init.js
 *
 *  This file runs before any other scripts to initialize the system
 */

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
    if (cookie === undefined) {
        return 'empty';
    }

    //  Detect for quote artifact
    if (cookie.indexOf('"') !== -1) {
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

    if (ts.user_id === 'empty') {
        //  No user cookie found
        console.log('No session', ts);

        if (callNoSession) {
            callNoSession();
        }
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
                    console.log(' Succesful return: Valid session');
                    ts.session = true;
                    session = callSession;
                } else {
                    console.log(' Succesful return: Invalid session');
                    ts.session = false;
                    session = callNoSession;
                }

                console.log('Current cookie:', ts);
                dd.navigation.display.lock(ts.session);

                if (session) {
                    session();
                }
            })
            .fail(function () {
                ts.user_id = getCookie('ts_user_id');
                ts.user_session = getCookie('ts_user_session');
                ts.session = false;

                console.log('Invalid session', ts);
                dd.navigation.display.lock(ts.session);

                if (callNoSession) {
                    callNoSession();
                }
            });
    }
};

/**
 *  Generates a qTip object with default settings, we use this to reduce the
 *  ammount of clutter during qtip definitions.
 *
 *  Example
 *      $('.mixer-meter')
 *          .qtip((qTipDefault)({
 *              arrow: 'bottom center',
 *              content: 'The volume meter'
 *          }));
 *
 *  @function qTipDefault
 *  @param  {Object}  Obj  Properties to be modified
 *  @return {Object.qTipSettings}  The qTip Object.
 */
var qTipDefault = function (obj) {

    //  References to corners
    var corners = [
        'bottom left', 'bottom right', 'bottom center',
        'top right', 'top left', 'top center',
        'left center', 'left top', 'left bottom',
        'right center', 'right bottom', 'right top'
    ];
    var opposites = [
        'top right', 'top left', 'top center',
        'bottom left', 'bottom right', 'bottom center',
        'right center', 'right bottom', 'right top',
        'left center', 'left top', 'left bottom'
    ];

    var adjustedX, adjustedY;

    //  Get object settings or default
    var offsetX = dVar(obj.offsetX, 0);
    var offsetY = dVar(obj.offsetY, 0);
    var pixels = dVar(obj.pixels, 4);
    var defarrow = 'bottom center';

    var i = corners.indexOf(dVar(obj.arrow, defarrow));

    //  Determine index positioning
    if (i === -1) {
        i = corners.indexOf(defarrow);
    }

    //  Determine positioning adjustment
    if (i >= 0 && i <= 2) {
        adjustedX = 0;
        adjustedY = -1 * pixels;
    } else if (i >= 3 && i <= 5) {
        adjustedX = 0;
        adjustedY = pixels;
    } else if (i >= 6 && i <= 8) {
        adjustedX = -1 * pixels;
        adjustedY = 0;
    } else if (i >= 9 && i <= 11) {
        adjustedX = pixels;
        adjustedY = 0;
    }

    //  Return qtip object
    return {
        content: dVar(obj.content, ''),
        position: {
            my: corners[i], // Use the corner...
            at: opposites[i], // ...and opposite corner
            adjust: {
                x: (adjustedX + offsetX),
                y: (adjustedY + offsetY)
            }
        },
        show: {
            event: 'mouseover',
            solo: true // Only show one tooltip at a time
        },
        hide: {
            event: 'mouseout',
            delay: 1,
            fixed: true,
            effect: function () {
                $(this)
                    .fadeOut(250);
            }
        },
        style: {
            classes: 'jquery-tooltips',
            tip: {
                corner: corners[i],
                height: pixels * 4,
                width: pixels * 2
            },
            border: {
                width: 2,
                radius: 3,
                color: '#212121'
            }
        }
    };
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
 *  Detects the microphone and sets up callbacks
 *
 *  @function   getMicrophone
 *  @param  micSuccess     The microphone success callback
 *  @param  micFailure     The microphone failure callback
 *  @param  browserFailure The browser incompatibility callback
 */
var getMicrophone = function (micSuccess, micFailure, browserFailure) {
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            audio: true
        }, micSuccess, micFailure);
    } else {
        browserFailure();
    }
};

/**
 *  Determines which browser and version are being used, this was modified from
 *  the link.
 *
 *  Example
 *      userAgent = getBrowser();
 *
 *      console.log('Browser ', userAgent.browser, ' V', userAgent.version);
 *
 *  @function getBrowser
 *  @see http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
 *  @return {Object} returns an object with a property browser and version
 */
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

        if (temp !== null) {
            M.splice(1, 1, temp[1]);
        }

        ret.browser = M[0];
        ret.version = M[1];

        return ret;
    })();
};

/**
 *  Positions the Display needle
 *
 *  @function positionNeedle
 *  @param {Integer} time The time in milliseconds to display
 */
var positionNeedle = function (time) {
    var evaluation,
        percent = 0,
        offset = -1,
        master = $('#master-1')
        .attr('data-track-length'),
        needle = function (position) {
            $('.graph-clock')
                .find('.graph-clock-needle')
                .css({
                    'left': position + '%'
                });
        };

    if (master === 0) {
        needle(offset);
        return;
    }

    evaluation = time / master;

    if (evaluation >= 1) {
        percent = 100;
    } else if (master > 0) {
        percent = evaluation * 100;
    }

    needle(percent + offset);
};

/**
 *  Resets mixer elements for the tutorial
 *
 *  @function resetMixer
 */
var resetMixer = function () {
    $('.record button[data-armed="1"]')
        .trigger('click');

    $('.mute button[data-muted="1"]')
        .trigger('click');
};

/**
 *  Function to be used to extend jQuery to allow for grand parent searching by
 *  integer.
 *
 *  Example:
 *      $.fn.genParent = genParent;
 *      $(id).genParent(3) === $(id).parent().parent().parent(); // true
 *
 *  @function genParent
 *  @param  {Integer} genBack   How many parents to go back
 *  @return {Object.jQuery}     The selector
 */
var genParent = function (genBack) {
    var ret;

    if (genBack === 0) {
        return this;
    }

    for (ret = $(this); genBack > 0; --genBack) {
        ret = ret.parent();
    }

    return ret;
};

//  CONTEXT DETERMINATIONS

// Redirect user to https except when coming from a developement machine
if (window.location.protocol === 'http:' &&
    !window.location.host.toLowerCase()
    .startsWith('localhost', 0) &&
    !window.location.host.toLowerCase()
    .startsWith('127.0.0.1', 0)) {
    window.location.href = 'https:' +
        window.location.href.substring(window.location.protocol.length);
}

//  Determine audio context
window.AudioContext = window.AudioContext ||
    window.webkitAudioContext;

//  Determine navigator for microphone detection
navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

//  VARIABLE DECLARATIONS
var trip = {
    inTripSpeed: 0,
    startpoint: '.header link-tutorial',
    sharedTrips: {
        genericMicrophoneStartStep: {
            expose: true,
            position: 'screen-center',
            content: '<p class="text-left max-width-100">Welcome to trackstudio</p>' +
                '<p class="text-left max-width-100">There seems to be a problem ' +
                'with your browser\'s microphone permissions. ' +
                'We use a browser\'s microphone to record audio into tracks, and therefore we ' +
                'require microphone access.</p><p class="text-left max-width-100">To ' +
                'enable your browser\s microphone click \'Next\' and follow the ' +
                'instructions provided.</p>'
        }
    },
    journey: {
        microphone: {}
    },
    options: {
        animation: 'none',
        backToTopWhenEnded: true,
        canGoNext: true,
        canGoPrev: false,
        closeBoxLabel: '<span class="action-label negative">Quit</span>',
        delay: -1,
        enableAnimation: true,
        enableKeyBinding: true,
        finishLabel: '<span class="action-label positive">Finish</span>',
        header: 'Step {{tripIndex}}',
        nextLabel: '<span class="action-label positive">Next</span>',
        overlayHolder: 'body', // this can be moved around
        overlayZindex: 99999,
        prevLabel: ' ',
        showCloseBox: true,
        showHeader: false,
        showNavigation: true,
        skipUndefinedTrip: false,
        tripBlockHTML: [
            '<div class="trip-block">',
            '<a href="#" class="trip-prev"></a>',
            '<div class="trip-header"></div>',
            '<div class="trip-content"></div>',
            '<div class="trip-progress-wrapper">',
            '<div class="trip-progress-bar"></div>',
            '<a href="#" class="trip-close"></a>',
            '<a href="#" class="trip-next"></a>',
            '</div>',
            '</div>'
        ],
        tripTheme: 'yeti', // this has been customized with css
        onEnd: function () {
            //  Destroy bound click events so that the user can continue using
            //  without finishing tutorial
            trip.selector.forEach(function (element, index, array) {
                console.log(trip.selector[index]);
                $(trip.selector[index])
                    .off('click.Trip');
            });
            //  Restore Overlay position
            $('.trip-overlay')
                .appendTo('body');
            $('.cover')
                .css({
                    'position': ''
                });
            //  Restore Jquery speed
            jQuery.fx.speeds._default = trip.currentSpeed;
            console.log('onEnd');
        },
        onStart: function () {
            console.log('onStart');
            //  Change jQuery speed to prevent overlay fadein
            $.fx.speeds._default = trip.inTripSpeed;

            $('.cover')
                .css({
                    'position': 'absolute'
                });
            //  Reset mixer
            resetMixer();
        },
        onTripChange: function () {
            console.log('onTripChange');
        },
        onTripClose: function () {
            console.log('onTripClose');
        },
        onTripEnd: function () {
            console.log('onTripEnd');
        },
        onTripPause: function () {
            console.log('onTripPause');
        },
        onTripResume: function () {
            console.log('onTripResume');
        },
        onTripStart: function () {
            console.log('onTripStart');
        },
        onTripStop: function () {
            console.log('onTripStop');
        }
    },
    selector: []
};

var ac = null; //  Audio Context
var sw = null; //  Stop watch
var dd = null; //  Drop Down
var ts = { //  trackstudio cookies
    user_id: null, //  user hash
    user_session: null, //  session hash
    session: false //  session state
};

var trackClear = [0, 0, 0, 0]; // Holds Clear interval functions for each track