/**
 *  @file   onLoad.js
 *
 *  The Document on load function, kicks off after a page is rendered.
 */

//  ONLOAD

$(document)
    .ready(function () {

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

            if ($.inArray(userAgent.browser, ['Chrome', 'IE', 'Opera', 'Safari'])) {
                $('.splash.microphone')
                    .find('.instructions.' + userAgent.browser)
                    .addClass('display');
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
        trip.journey.push(new Trip(
            [{
                position: 'screen-center',
                content: 'Hey there! Welcome to TrackStudio, would you like us to show you around? Click next for a simple tutorial.',
                showNavigation: true,
                prevLabel: 'Back',
                nextLabel: 'Next',
                delay: -1,
            }, {
                position: 'screen-center',
                content: 'Before we move on, we recommend that you grab a pair of headphones/earbuds and plug them in.',
                showNavigation: true,
                prevLabel: 'Back',
                nextLabel: 'Next',
                delay: -1
            }, {
                sel: $('#track-1 .mute > button'),
                content: 'Begin by toggling speaker output.<br/> This prevents feedback.',
                showNavigation: false,
                delay: -1,
                position: 'n',
                nextClickSelector: $('#track-1 .mute > button')
            }, {
                //index 3
                sel: $('#track-1 .record > button'),
                content: 'Next lets record a simple track to get started.',
                showNavigation: false,
                delay: -1,
                position: 'n',
                nextClickSelector: $('#track-1 .record > button')
            }, {
                position: 'screen-center',
                content: 'At this point lets make some music. When you are done click next.',
                showNavigation: true,
                prevLabel: 'Back',
                nextLabel: 'Next',
                delay: -1,
            }, {
                sel: $('#track-1 > .row .track-fader > .track-fader-record > button'),
                content: 'Click again to stop recording.',
                showNavigation: false,
                delay: -1,
                position: 'n',
                nextClickSelector: $('#track-1 > .row .track-fader > .track-fader-record > button')
            }, {
                sel: $('#master-1 > .row .playback > div > .play '),
                content: 'Congrats, you’ve recorded your first track! Let’s hear what we’ve got so far.',
                showNavigation: false,
                delay: -1,
                position: 'n',
                nextClickSelector: $('#master-1 > .row .playback > div > .play')

            }, {
                sel: $('#master-1 > .row .playback > div > .stop'),
                content: 'Awesome! Let’s stop it, and add some special effects.',
                showNavigation: false,
                delay: -1,
                position: 'n',
                nextClickSelector: $('#master-1 > .row .playback > div > .stop')
            }, {
                sel: $('#track-1 > .row .fx-box > div > .link-fx-box'),
                content: 'Click here to get started with effects.',
                showNavigation: false,
                delay: -1,
                position: 'n',
                nextClickSelector: $('#track-1 > .row .fx-box > div > .link-fx-box')
            }, {
                position: 'screen-center',
                content: 'Here you can choose from an array of effects.',
                showNavigation: true,
                prevLabel: 'Back',
                nextLabel: 'Next',
                delay: -1
            }, {
                sel: $('#partial .fx-catalog-panel'),
                content: 'This is the effects catalog.',
                showNavigation: true,
                position: 's',
                prevLabel: 'Back',
                nextLabel: 'Next',
                delay: -1
            }, {
                //index 11
                sel: '#effect-item-reverb .fx-catalog-panel-item-image',
                position: 's',
                content: 'Select the reverb effect.',
                showNavigation: false,
                delay: -1,
                nextClickSelector: '#effect-item-reverb .fx-catalog-panel-item-image'
            }, {
                sel: '#partial > .holder > .dropdown-left > .information-panel .information-title',
                //BUG: This box appears next to the wrong element at first, but moves to the right place
                // after zooming out and then back in.
                //sel: '#partial .information-panel',
                content: 'This is the information panel.',
                showNavigation: true,
                position: 'e',
                prevLabel: 'Back',
                nextLabel: 'Next',
                delay: -1
            }, {
                //index 13
                sel: '#effect-item-reverb-select-track-0',
                content: 'Click here to add the reverb effect to Track 1.',
                showNavigation: false,
                delay: -1,
                position: 'e',
                nextClickSelector: '#effect-item-reverb-select-track-0'
            }, {
                sel: $('#master-1 > .row .playback > div > .play '),
                content: 'Now listen to your track with the effect.',
                showNavigation: false,
                delay: -1,
                position: 'n',
                nextClickSelector: $('#master-1 > .row .playback > div > .play')
            }],
            //  global config options
            trip.options
        ));

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
                trip.journey[0].start();
            });
            
        // Create tooltips
        Tipped.create('.track-label', 'Track label', { position: 'top' });
        Tipped.create('.mute', 'Mute button', { position: 'left' });
        Tipped.create('.record', 'Record button', { position: 'right' });
        Tipped.create('.fx-box', 'FX box', { position: 'right' });
        Tipped.create('.eq', 'EQ knob', { position: 'right' });
        Tipped.create('.pan', 'Pan knob', { position: 'right' });
        Tipped.create('.fader', 'Volume slider', { position: 'left' });
        Tipped.create('.stop', 'Stop', { position: 'bottom' });
        Tipped.create('.play', 'Play', { position: 'bottom' });
        Tipped.create('.rewind', 'Rewind', { position: 'bottom' });
        Tipped.create('.forward', 'Fast forward', { position: 'bottom' });
    });