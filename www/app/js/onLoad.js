/**
 *  @file   onLoad.js
 *
 *  The Document on load function, kicks off after a page is rendered.
 */

//  ONLOAD

$(document)
    .ready(function () {

        //  INIT COMPONENTS

        console.log('Init: DropDown');
        dd = new DropDown();
        dd.init({
            dropDownId: '#partial',
            navigationId: '#navigation',
            speed: 800
        });

        console.log('Init: StopWatch');
        sw = new StopWatch();
        sw.run('INIT', '#stopWatch-1 div.timedisplay');

        console.log('Init: AudioContext');
        ac = new AudioContext();

        console.log('Init: TripJS');
        // Set speeds to force fadein used in trip.js to immediate
        trip.currentSpeed = jQuery.fx.speeds._default;
        //  Create Trips
        trip.journey.tutorial = new Trip(
            [{
                expose: true,
                position: 'screen-center',
                content: '<p class="text-left max-width-100">Welcome to trackstudio, ' +
                    'this tutorial will show you everything you need to know to get ' +
                    'started. During the tutorial click the \'Next\' button to ' +
                    'continue and the \'Quit\' button to exit at anytime, otherwise ' +
                    'click on the highlighted elements to proceed. </p>'
            }, {
                expose: true,
                position: 'screen-center',
                content: '<p class="text-left max-width-100">Before we move on, ' +
                    'we recommend that you grab a pair of headphones or earbuds ' +
                    'and plug them in.</p>'
            }, {
                sel: (trip.selector[2] = '#track-1 .mute > button'),
                expose: trip.selector[2],
                nextClickSelector: trip.selector[2],
                position: 'e',
                nextLabel: ' ',
                content: '<p class="text-left max-width-100">Begin by toggling ' +
                    'speaker output. This prevents feedback when not using ' +
                    'headphones.</p>'
            }, {
                sel: (trip.selector[3] = '#track-1 .record > button'),
                expose: trip.selector[3],
                nextClickSelector: trip.selector[3],
                position: 's',
                content: '<p class="text-left max-width-100">Next click the ' +
                    'record button, to record to a track.</p>',
            }, {
                sel: (trip.selector[4] = '#track-1 .record > button'),
                expose: trip.selector[4],
                nextClickSelector: trip.selector[4],
                position: 'e',
                nextLabel: ' ',
                content: '<p class="text-left max-width-100">Make some sounds to ' +
                    'record them, and then click record again to stop recording.</p>',
            }, {
                sel: (trip.selector[5] = '#track-1 .mute > button'),
                expose: trip.selector[5],
                nextClickSelector: trip.selector[5],
                position: 'e',
                nextLabel: ' ',
                content: '<p class="text-left max-width-100">Toggle speaker ' +
                    'output back on so that track audio can be reconnected.</p>',
            }, {
                sel: (trip.selector[6] = '#master-1 .play'),
                expose: trip.selector[6],
                nextClickSelector: trip.selector[6],
                position: 'w',
                nextLabel: ' ',
                content: '<p class="text-left max-width-100">Congratulations, ' +
                    'you have recorded your first track! To hear what you have ' +
                    'so far click play, play will stops automatically when you ' +
                    'reach the end of the master track.</p>',
            }, {
                sel: (trip.selector[7] = '#master-1 .stop'),
                expose: trip.selector[7],
                position: 's',
                content: '<p class="text-left max-width-100">You can stop the ' +
                    'Master track from playing at any time by clicking stop, ' +
                    'or you can wait for the Master track to run out.</p>',
            }, {
                sel: (trip.selector[8] = '#track-1 .link-fx-box'),
                expose: trip.selector[8],
                nextClickSelector: trip.selector[8],
                position: 'n',
                nextLabel: ' ',
                content: '<p class="text-left max-width-100">Click here to add ' +
                    'an effect to the track.</p>',
                onTripEnd: function (tripIndex, tripObject) {
                    // Move overlay to be within relative space of dropdown elements
                    $('.trip-overlay')
                        .appendTo('.dropdown');
                }
            }, {
                expose: true,
                position: 'screen-center',
                content: '<p class="text-left max-width-100">In the drop down ' +
                    'you can manage the tracks effects.</p>',
            }, {
                sel: (trip.selector[10] = '#partial .fx-catalog-panel'),
                expose: trip.selector[10],
                position: 's',
                content: '<p class="text-left max-width-100">The effects catalog' +
                    'holds all the available effects and the special remove effect' +
                    'button.</p>',
            }, {
                sel: (trip.selector[11] = '#partial .dropdown-left'),
                expose: trip.selector[11],
                position: 'e',
                content: '<p class="text-left max-width-100">The information ' +
                    'panel allows you to cancel out of an effect manipulation ' +
                    'and also displays any information about an effect when the ' +
                    'effect is being hovered over.</p>',
            }, {
                sel: (trip.selector[12] = '#effect-item-reverb'),
                expose: trip.selector[12],
                nextClickSelector: trip.selector[12],
                position: 's',
                nextLabel: ' ',
                content: '<p class="text-left max-width-100"> Hover over the ' +
                    'reverb effect to see its information displayed in the ' +
                    'information panel, click it to select the effect.</p>',
                onTripEnd: function (tripIndex, tripObject) {
                    // Move overlay to be within relative space of mixer elements
                    $('.trip-overlay')
                        .appendTo('main .splashes');
                }
            }, {
                expose: true,
                position: 'screen-center',
                content: '<p class="text-left max-width-100">You have just added' +
                    'your first effect.<p>',
            }, {
                sel: (trip.selector[14] = '#master-1 .play'),
                expose: trip.selector[14],
                position: 's',
                nextLabel: ' ',
                nextClickSelector: trip.selector[14],
                content: '<p class="text-left max-width-100">Now click play to ' +
                    'listen to your track with the added effect.</p>',
            }],
            //  global config options
            trip.options
        );

        trip.journey.microphone = {};

        var genericMicrophoneStartStep = {
            position: 'screen-center',
            content: '<p>Welcome to trackstudio</p>' +
                '<p>There seems to be a problem with your browser\'s microphone permissions. ' +
                'We use a browser\'s microphone to record audio into tracks, and therefore we require microphone access.</p>' +
                '<p>To enable your browser\s microphone click \'Next\' and follow the instructions provided.</p>',
            showNavigation: true,
            nextLabel: 'Next',
            delay: -1,
        };

        //  microphone - chrome
        trip.journey.microphone.chrome = new Trip(
            [genericMicrophoneStartStep, {
                sel: '.splash .top',
                position: 's',
                content: '<p>In your address bar, find the <image src="/app/img/browser-icons/chrome-microphone-disabled.png"/> icon and click on it.</p>' +
                    '<p>In the browser\'s dialog box, select the \'Always allow ...\' radio button and make sure that the \'Microphone\' select, is set to \'Default\'. </p>' +
                    '<p>Click \'Done\'.</p>',
                delay: -1,

            }],
            //  global config options
            trip.options
        );

        //  microphone - opera
        trip.journey.microphone.opera = new Trip(
            [genericMicrophoneStartStep, {
                sel: '.splash .top',
                position: 's',
                content: '<p>In your address bar, find the <image src="/app/img/browser-icons/opera-microphone-disabled.png"/> icon and click on it.</p>' +
                    '<p> In the browser\'s dialog box, click the \'Clear this setting and reload\' button, and accept the requested permissions.</p>',
                delay: -1,
            }],
            //  global config options
            trip.options
        );

        // microphone - firefox
        trip.journey.microphone.firefox = new Trip(
            [genericMicrophoneStartStep, {
                sel: '.splash .top',
                position: 's',
                content: '<p>In your address bar, find the <image src="/app/img/browser-icons/firefox-information.png"/> icon and click it.</p>' +
                    '<p>In the browser\'s dialog box in \'Permissions\', set the select for \`Use the Microphone\' to \'Allow\'. </p>' +
                    '<p>At this point you will need to refresh the page and click \'Share Selected Device\' in the next browser dialog.</p>',
                delay: -1,

            }],
            //  global config options
            trip.options
        );

        // microphone - edge
        trip.journey.microphone.edge = new Trip(
            [genericMicrophoneStartStep, {
                sel: '.splash .top',
                position: 's',
                content: '<p>In your address bar, find the __ icon and right click it.</p>' +
                    '<p>In the browser\'s dialog box, select the \'Always allow ...\' radio button and make sure that the \'Microphone\' select, is set to \'Default\'.</p>' +
                    '<p> Click \'Done\'.</p>',
                delay: -1,

            }],
            //  global config options
            trip.options
        );

        // microphone - safari
        trip.journey.microphone.safari = new Trip(
            [genericMicrophoneStartStep, {
                sel: '.splash .top',
                position: 's',
                content: '<p>In your address bar, find the __ icon and right click it.</p>' +
                    '<p>In the browser\'s dialog box, select the \'Always allow ...\' radio button and make sure that the \'Microphone\' select, is set to \'Default\'.</p>' +
                    '<p> Click \'Done\'.</p>',
                delay: -1,

            }],
            //  global config options
            trip.options
        );

        //  ENVIRONMENT

        var userAgent = getBrowser();
        console.log('--- User Agent', userAgent);

        //  HARDWARE SUPPORT

        var mic = getMicrophone(function (stream) { // Microphone Success
            console.log('microphone-browser-compatible: success');
            console.log('microphone-enabled: success');

            $('.splash.cover')
                .fadeOut(1000);

        }, function (err) { // Microphone Enabled Error
            console.log('microphone-browser-compatible: success');
            console.log('microphone-enabled: failure: ' + err);

            $('.splash.microphone')
                .toggleClass('hide');

            $('.splash.cover')
                .fadeOut(300);

            // Show Browser Microphone instructions
            console.log('Displaying Microphone Instructions');

            $('.splash.microphone')
                .find('.instructions')
                .removeClass('display');

            console.log(userAgent.browser.toLowerCase());
            //'ie', 'firefox', 'edge'
            if (['chrome', 'opera', 'safari'].indexOf(userAgent.browser.toLowerCase()) !== -1) {
                $('.splash.microphone')
                    .find('.instructions.' + userAgent.browser.toLowerCase())
                    .addClass('display');

                console.log('Starting microphone trip');
                trip.journey.microphone[userAgent.browser.toLowerCase()].start();

                var clearMicrophoneInterval = setInterval(
                    function () {
                        navigator.getUserMedia({
                            audio: true
                        }, function () {
                            // refresh page when microphone is detected
                            location.reload();
                            clearInterval(clearMicrophoneInterval);
                        }, function () {
                            // Continue checking
                        });
                    }, 100);

            } else {

                $('.splash.microphone')
                    .find('.instructions.other')
                    .addClass('display');
            }

        }, function () { // Browser Support Error
            console.log('microphone-browser-compatible: failure');

            $('.splash.browser')
                .toggleClass('hide');

            $('.splash.cover')
                .fadeOut(300);
        });

        //  VALIDATE SESSION

        console.log('Validating Session');
        //  Determine if session is valid and prepare panels
        validateSession(function () {
            console.log('initial setup - session');
            dd.show('MIX');
        }, function () {
            console.log('initial setup - no session');
            dd.show('INIT');
        });

        //  FORM VALIDATION

        console.log('Setting up forms');
        // Setup form validation on the #register-form element
        var registerValidator = $('#register-form')
            .validate({
                focusInvalid: false,

                // Specify the validation rules
                rules: {
                    'register-name': {
                        minlength: 2,
                        required: true
                    },
                    'register-email': {
                        required: true,
                        email: true
                    },
                    'register-password-1': {
                        required: true,
                        minlength: 8
                    },
                    'register-password-2': {
                        required: true,
                        minlength: 8,
                        equalTo: '#register-password-1'
                    }
                },

                // Specify the validation error messages
                messages: {
                    'register-name': {
                        required: 'Your name is required',
                        minlength: 'Must be at least 2 characters'
                    },
                    'register-email': {
                        required: 'Email address is required',
                        email: 'Please enter a valid email address'
                    },
                    'register-password-1': {
                        required: 'Your password is required',
                        minlength: 'Must be at least 8 characters'
                    },
                    'register-password-2': {
                        required: 'Your password is required',
                        minlength: 'Must be at least 8 characters',
                        equalTo: 'Passwords do not match'
                    }
                },

                submitHandler: function (form) {
                    var regCheck = {};
                    regCheck.registered = {
                        'register-email': 'Email in use'
                    };
                    regCheck.server = {
                        'register-email': 'Server error, refresh and try again.'
                    };
                    regCheck.cookie = {
                        'register-email': 'Invalid cookies.'
                    };

                    $.ajax({
                            method: 'POST',
                            url: '/api/post/user/',
                            data: {
                                name: $('#register-name')
                                    .val(),
                                email: $('#register-email')
                                    .val(),
                                pass: $('#register-password-1')
                                    .val(),
                                login: true
                            }
                        })
                        .done(function (data) {
                            validateSession(function () {
                                console.log('User registered');
                                dd.show('MIX');
                                $(this)
                                    .closest('form')
                                    .find(['input[type=text]', 'input[type=password]', 'input[type=email]', 'textarea'].join(', '))
                                    .val('')
                                    .end()
                                    .find('.icon-right')
                                    .removeClass('err')
                                    .end()
                                    .find('.icon-right')
                                    .removeClass('pass');

                            }, function () {
                                console.log('registration-failed: Check your cookies.');

                                $(this)
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');

                                registerValidator.showErrors(regCheck.cookie);
                            });
                        })
                        .fail(function (data) {
                            validateSession(function () {
                                console.log('registration-failed: There was an error processing the form.');

                                $(this)
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');

                                registerValidator.showErrors(regCheck.server);
                            }, function () {
                                console.log('registration-failed: user is registered');

                                $(this)
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');

                                registerValidator.showErrors(regCheck.registered);
                            });
                        });
                },

                highlight: function (element, errorClass, validClass) {
                    $('.icon-right.' + element.id)
                        .addClass('err');
                    $('.icon-right.' + element.id)
                        .removeClass('pass');
                },
                unhighlight: function (element, errorClass, validClass) {
                    $('.icon-right.' + element.id)
                        .addClass('pass');
                    $('.icon-right.' + element.id)
                        .removeClass('err');
                }
            });

        // Setup form validation on the #login-form element
        var loginValidator = $('#login-form')
            .validate({

                focusInvalid: false,

                // Specify the validation rules
                rules: {
                    'login-email': {
                        required: true,
                        email: true
                    },
                    'login-password': {
                        required: true,
                        minlength: 8
                    }
                },

                // Specify the validation error messages
                messages: {
                    'login-email': {
                        required: 'Email address is required',
                        email: 'Please enter a valid email address'
                    },
                    'login-password': {
                        required: 'Your password is required',
                        minlength: 'Must be at least 8 characters'
                    }
                },

                submitHandler: function (form) {
                    var credCheck = {};

                    credCheck.fail = {
                        'login-password': 'Invalid credentials.'
                    };
                    credCheck.server = {
                        'login-password': 'Server error, refresh and try again.'
                    };
                    credCheck.cookie = {
                        'login-password': 'Invalid cookies.'
                    };

                    $.ajax({
                            method: 'POST',
                            url: '/api/post/login/',
                            data: {
                                email: $('#login-email')
                                    .val(),
                                pass: $('#login-password')
                                    .val()
                            }
                        })
                        .done(function () {
                            validateSession(function () {
                                console.log('user logged in');

                                $(this)
                                    .closest('form')
                                    .find('input[type=text], input[type=password], input[type=email], textarea')
                                    .val('')
                                    .end()
                                    .find('.icon-right')
                                    .removeClass(['err', 'pass'].join(' '));

                                dd.show('MIX');
                            }, function () {
                                console.log('login-failed: Check your cookies.');

                                $(this)
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');

                                loginValidator.showErrors(credCheck.cookie);
                            });
                        })
                        .fail(function () {
                            validateSession(function () {
                                console.log('login-failed: There was an error processing the form.');

                                $(this)
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');

                                loginValidator.showErrors(credCheck.server);
                            }, function () {
                                console.log('login-failed: invalid credentials.');

                                $(this)
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');

                                loginValidator.showErrors(credCheck.fail);
                            });
                        });
                },

                highlight: function (element, errorClass, validClass) {
                    $('.icon-right.' + element.id)
                        .addClass('err')
                        .removeClass('pass');
                },
                unhighlight: function (element, errorClass, validClass) {
                    $('.icon-right.' + element.id)
                        .addClass('pass')
                        .removeClass('err');
                }
            });

        //  CLICK CONTROLS

        // Setup logo
        $('.navbar-brand-label')
            .on('click', function () {
                dd.show('TOGGLE');
                if (dd.stateHistory.top() === 'FX') {
                    dd.show('BACK');
                }
            });

        //  Setup exit of panel
        $('.link-exit')
            .on('click', function () {
                dd.show('BACK');
            });
        //  Setup FX click
        $('.link-fx-box')
            .on('click', function () {
                var trackId = $(this)
                    .closest('.track')
                    .attr('id')
                    .substr(6) - 1;

                $('main')
                    .attr('data-effect-switch', parseInt(trackId));

                dd.show('FX');
                dd.dropdown.open();
            });
        // Setup up logout
        $('.link-sign-out')
            .on('click', function () {
                $.ajax({
                        url: '/api/get/logout/'
                    })
                    .done(function () {
                        validateSession(function () {
                            console.log('logged-out-failed');
                        }, function () {
                            console.log('logged-out');
                            dd.show('LOGGED_OUT');
                        });
                    })
                    .fail(function () {
                        validateSession(function () {
                            console.log('logged-out-failed: cookies were not deleted');
                        }, function () {
                            console.log('logged-out-failed: server error');
                        });

                    });
            });

        // Setup up sign-in
        $('.link-sign-in')
            .on('click', function () {
                dd.show('LOGIN');
                dd.dropdown.open();
            });

        // Setup up register
        $('.link-register')
            .on('click', function () {
                dd.show('REGISTER');
                dd.dropdown.open();
            });

        // Setup api link
        $('.link-api')
            .on('click', function () {
                dd.show('API');
                dd.dropdown.open();
            });

        // Start tutorial
        $('.link-tutorial')
            .on('click', function () {
                console.log('start trip run');
                trip.journey.tutorial.start();
            });
            
        // Create tooltips
        Tipped.create('.track-label', 'Track label', { position: 'top' });
        Tipped.create('.mute', 'Mute button', { position: 'left' });
        Tipped.create('.record', 'Record button', { position: 'right' });
        Tipped.create('.fx-box', 'FX box', { position: 'right' });
        Tipped.create('.eq[type=HIGH]', 'Treble EQ knob', { position: 'right' });
        Tipped.create('.eq[type=LOW]', 'Bass EQ knob', { position: 'right' });
        Tipped.create('.pan', 'Pan knob', { position: 'right' });
        Tipped.create('.fader', 'Volume slider', { position: 'left' });
        Tipped.create('.stop', 'Stop', { position: 'bottom' });
        Tipped.create('.play', 'Play', { position: 'bottom' });
        Tipped.create('.rewind', 'Rewind', { position: 'bottom' });
        Tipped.create('.forward', 'Fast forward', { position: 'bottom' });
    });