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

        //  TUTORIAL - trip.js

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
                    'started. During the tutorial click the <span class="bold">Next</span> button to ' +
                    'continue and the <span class="bold">Quit</span> button to exit at anytime, otherwise ' +
                    'click on the highlighted elements to proceed. </p>',
                onTripStart: function (tripIndex, tripObject) {
                    // Move overlay to be within relative space of dropdown elements
                    $('.trip-overlay')
                        .appendTo('body main .splashes');
                }
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
                expose: trip.startpoint,
                position: 's',
                content: '<p class="text-left max-width-100">The effects catalog' +
                    'holds all the available effects and the special remove effect' +
                    'button.</p>',
            }, {
                sel: (trip.selector[11] = '#partial .dropdown-left'),
                expose: trip.startpoint,
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
                content: '<p class="text-left max-width-100">You have just added ' +
                    'your first effect.<p>',
            }, {
                sel: (trip.selector[14] = '#master-1 .play'),
                expose: trip.selector[14],
                position: 's',
                nextLabel: ' ',
                nextClickSelector: trip.selector[14],
                content: '<p class="text-left max-width-100">Now click play to ' +
                    'listen to your track with the added effect.</p>'
            }, {
                sel: (trip.selector[15] = '#track-1 .eq[type=HIGH]'),
                expose: trip.selector[15],
                position: 'e',
                content: '<p class="text-left max-width-100">You can use the treble knob to raise or lower high tones.</p>'
            }, {
                sel: (trip.selector[16] = '#track-1 .eq[type=LOW]'),
                expose: trip.selector[16],
                position: 'e',
                content: '<p class="text-left max-width-100">You can use the bass knob to raise or lower low tones.</p>'
            }, {
                sel: (trip.selector[17] = '#track-1 .pan'),
                expose: trip.selector[17],
                position: 'e',
                content: '<p class="text-left max-width-100">With pan you can shift the sound of a track to the left or right ear.</p>'
            }, {
                sel: (trip.selector[18] = '#track-1 .slider:visible'),
                expose: trip.selector[18],
                position: 'e',
                content: '<p class="text-left max-width-100">You can use the slider to raise and lower the volume of a particular track.</p>'
            }, {
                sel: (trip.selector[19] = '#track-1 .meter:visible'),
                expose: trip.selector[19],
                position: 'e',
                content: '<p class="text-left max-width-100">When a track is playing or recording with the volume on, the meter fills to show the current volume.</p>'
            }, {
                sel: (trip.selector[20] = '#track-1 .track-label'),
                expose: trip.selector[20],
                position: 'e',
                content: '<p class="text-left max-width-100">The track label can also be edited by clicking on the current label. When saving your mixes this label will be used to help name them.</p>'
            }, {
                sel: (trip.selector[21] = '#master-1 .glass'),
                expose: trip.selector[21],
                position: 's',
                content: '<p class="text-left max-width-100">You can watch track lengths, and play runtime on the display. The recording track is highlighted in pink, while the longest track is shaded. We represent track lengths as a percentage of the longest track, and display their length in time next to their bar length.</p>'
            }, {
                expose: true,
                position: 'screen-center',
                content: '<p class="text-left max-width-100">Hope you learned about trackstudio, and now it is time to make some music.<p>',
            }],
            //  global config options
            trip.options
        );
        var microphoneOptions = jQuery.extend(true, {}, trip.options);
        microphoneOptions.showCloseBox = false;
        microphoneOptions.finishLabel = '';

        //  microphone - chrome
        trip.journey.microphone.chrome = new Trip(
            [trip.sharedTrips.genericMicrophoneStartStep, {
                sel: (trip.selector[1] = '.splash .top'),
                expose: true,
                position: 's',
                content: '<p class="text-left max-width-100">In your address bar, ' +
                    'find the <image ' +
                    'src="/app/img/browser-icons/chrome-microphone-disabled.png"/>' +
                    'icon and click on it.</p><p class="text-left max-width-100">' +
                    'In the browser&#39s dialog box, select ' +
                    'the <span class="bold">Always allow ...</span> radio button and make sure that the ' +
                    '<span class="bold">Microphone</span> select, is set to <span class="bold">Default</span> and then click ' +
                    '<span class="bold">Done</span>.</p>',

            }],
            //  global config options
            microphoneOptions
        );
        //  microphone - opera
        trip.journey.microphone.opera = new Trip(
            [trip.sharedTrips.genericMicrophoneStartStep, {
                sel: (trip.selector[1] = '.splash .top'),
                expose: true,
                position: 's',
                content: '<p class="text-left max-width-100">In your address bar, ' +
                    'find the <image ' +
                    'src="/app/img/browser-icons/opera-microphone-disabled.png"/>' +
                    'icon and click on it.</p><p class="text-left max-width-100">In ' +
                    'the browser&#39s dialog box, click the <span class="bold">Clear this setting ' +
                    'and reload</span> button, and accept the requested permissions.</p>'
            }],
            //  global config options
            microphoneOptions
        );
        // microphone - firefox
        trip.journey.microphone.firefox = new Trip(
            [trip.sharedTrips.genericMicrophoneStartStep, {
                sel: (trip.selector[1] = '.splash .top'),
                expose: true,
                position: 's',
                content: '<p class="text-left max-width-100">In your address bar, ' +
                    'find the <image src="/app/img/browser-icons/firefox-information.png"/>' +
                    'icon and click it.</p><p class="text-left max-width-100">In the ' +
                    'browser&#39s dialog box in <span class="bold">Permissions</span>, set the select for <span class="bold">Use ' +
                    'the Microphone</span> to <span class="bold">Allow</span>. </p><p class="text-left max-width-100">' +
                    'At this point you will need to refresh the page and click <span class="bold">Share Selected Device</span> in the next browser dialog.</p>'
            }],
            //  global config options
            microphoneOptions
        );
        // browser
        trip.journey.browser = new Trip(
            [{
                sel: (trip.selector[0] = '.splash .top'),
                expose: true,
                position: 'screen-center',
                content: '<p class="text-left max-width-100">Welcome to trackstudio!</p><p class="text-left max-width-100">There seems to be a problem with the browser you are using. Your browser is not compatible with our application, because we rely on the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">Web Audio API</a> to record sounds. To use our application you will need to use a modern browser. We recomend using <a href="https://www.google.com/chrome/browser/desktop/index.html">Google Chrome</a>.</p>'
            }],
            //  global config options
            microphoneOptions
        );

        getMicrophone(function (stream) { // Microphone Success
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
            //'ie', 'firefox', 'edge', 'safari',
            if (['chrome', 'opera', 'firefox'].indexOf(userAgent.browser.toLowerCase()) !== -1) {
                $('.splash.microphone')
                    .find('.instructions.' + userAgent.browser.toLowerCase())
                    .addClass('display');

                console.log('Starting microphone trip', userAgent);
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
                    .toggleClass('hide');

                $('.splash.cover')
                    .hide();

                trip.journey.browser.start();
            }

        }, function () { // Browser Support Error
            console.log('microphone-browser-compatible: failure');

            $('.splash.microphone')
                .toggleClass('hide');

            $('.splash.cover')
                .hide();

            trip.journey.browser.start();
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

        //  VALIDATE SESSION

        console.log('Init: Validating Session');
        //  Determine if session is valid and prepare panels
        validateSession(function () {
            console.log('initial setup - session');
            dd.show('MIX');
        }, function () {
            console.log('initial setup - no session');
            dd.show('INIT');
        });

        //  TOOLTIPS - qTip
        console.log('Init: Tooltips');
        $('.link-sign-in span > span')
            .qtip((qTipDefault)({
                arrow: 'top center',
                content: 'Sign in to trackstudio'
            }));
        $('.mixer-meter')
            .qtip((qTipDefault)({
                arrow: 'bottom center',
                content: 'The volume meter'
            }));
        $('.scale')
            .qtip((qTipDefault)({
                arrow: 'bottom center',
                content: 'The volume scale'
            }));
        $('.stopWatch.glass')
            .qtip((qTipDefault)({
                arrow: 'top center',
                content: 'Holds recording and playback information, such as track length and current runtime'
            }));
        $('.link-sign-out span > span')
            .qtip((qTipDefault)({
                arrow: 'top center',
                content: 'Sign out of trackstudio'
            }));
        $('.link-register span > span')
            .qtip((qTipDefault)({
                arrow: 'top center',
                content: 'Register with trackstudio'
            }));
        $('.navbar-brand-label')
            .qtip((qTipDefault)({
                arrow: 'top center',
                content: 'Toggle the dropdown menu'
            }));
        $('.link-tutorial span')
            .qtip((qTipDefault)({
                arrow: 'top center',
                content: 'Begin the tutorial'
            }));

        $('.track-label')
            .qtip((qTipDefault)({
                content: 'Edit the track label'
            }));
        $('.mute')
            .qtip((qTipDefault)({
                content: 'Toggle track output'
            }));
        $('.record')
            .qtip((qTipDefault)({
                content: 'Record to track'
            }));
        $('.fx-box')
            .qtip((qTipDefault)({
                content: 'Add an effect'
            }));
        $('.eq[type=HIGH]')
            .qtip((qTipDefault)({
                content: 'Treble equalizer knob'
            }));
        $('.eq[type=LOW]')
            .qtip((qTipDefault)({
                content: 'Bass equalizer knob'
            }));
        $('.pan')
            .qtip((qTipDefault)({
                content: 'Shift sound left and right'
            }));
        $('.fader')
            .qtip((qTipDefault)({
                content: 'Volume slider'
            }));
        $('.stop')
            .qtip((qTipDefault)({
                content: 'Stop'
            }));
        $('.play')
            .qtip((qTipDefault)({
                content: 'Play'
            }));
        $('.rewind')
            .qtip((qTipDefault)({
                content: 'Rewind'
            }));
        $('.forward')
            .qtip((qTipDefault)({
                content: 'Fast forward'
            }));

        $('#login-email')
            .qtip((qTipDefault)({
                content: 'Enter a registered email'
            }));
        $('#login-password')
            .qtip((qTipDefault)({
                content: 'Enter your password'
            }));
        $('#dropdown-button-login')
            .qtip((qTipDefault)({
                content: 'Click to sign in'
            }));
        $('#register-email')
            .qtip((qTipDefault)({
                content: 'Enter a valid email'
            }));
        $('#register-name')
            .qtip((qTipDefault)({
                content: 'Enter your name'
            }));
        $('#register-password-1')
            .qtip((qTipDefault)({
                content: 'Enter a password that is at least 8 characters'
            }));
        $('#register-password-2')
            .qtip((qTipDefault)({
                content: 'Confirm your password'
            }));
        $('#dropdown-button-register')
            .qtip((qTipDefault)({
                content: 'Click to register with trackstudio'
            }));
        //  FORM VALIDATION

        console.log('Init: forms');
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
        console.log('Init: links');
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
                dd.dropdown.close();
                trip.journey.tutorial.start();
            });
    });