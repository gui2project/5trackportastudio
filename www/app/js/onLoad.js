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
            //trip.start();

        }, function (err) { // Microphone Enabled Error
            console.log('microphone-browser-compatible: success');
            console.log('microphone-enabled: failure: ' + err);
            $('.splash.microphone')
                .toggleClass('hide');
            $('.splash.cover')
                .fadeOut(300);

            // Show Browser Microphone instructions
            console.log('Displaying Microphone Instructions');
            $('.splash.microphone .instructions')
                .removeClass('display');

            if ($.inArray(userAgent.browser, ['Chrome', 'IE', 'Opera', 'Safari'])) {
                $('.splash.microphone .instructions.' + userAgent.browser)
                    .addClass('display');
            } else {
                $('.splash.microphone .instructions.other')
                    .addClass('display');
            }

        }, function () { // Browser Support Error
            console.log('microphone-browser-compatible: failure');
            $('.splash.browser')
                .toggleClass('hide');
            $('.splash.cover')
                .fadeOut(300);
        });

        dd = new DropDown();
        sw = new StopWatch();
        ac = new AudioContext();

        dd.init({
            dropDownId: '#partial',
            navigationId: '#navigation',
            speed: 800
        });
        sw.run('INIT', '#stopWatch-1 div.timedisplay');

        //  Determine if session is valid and prepare panels
        validateSession(function () {
            console.log('initial setup - session');
            dd.show('MIX');
        }, function () {
            console.log('initial setup - no session');
            dd.show('INIT');
        });

        //  FORM VALIDATION

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
                                $('#register-form')
                                    .closest('form')
                                    .find('input[type=text], input[type=password], input[type=email], textarea')
                                    .val('');
                                $('#register-form .icon-right')
                                    .removeClass('err');
                                $('#register-form .icon-right')
                                    .removeClass('pass');

                            }, function () {
                                console.log('registration-failed: Check your cookies.');
                                $('#register-form')
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');
                                registerValidator.showErrors(regCheck.cookie);
                            });
                        })
                        .fail(function (data) {
                            validateSession(function () {
                                console.log('registration-failed: There was an error processing the form.');
                                $('#register-form')
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');
                                registerValidator.showErrors(regCheck.server);
                            }, function () {
                                console.log('registration-failed: user is registered');
                                $('#register-form')
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
                                $('#login-form')
                                    .closest('form')
                                    .find('input[type=text], input[type=password], input[type=email], textarea')
                                    .val('');
                                $('#login-form .icon-right')
                                    .removeClass('err');
                                $('#login-form .icon-right')
                                    .removeClass('pass');
                                dd.show('MIX');
                            }, function () {
                                console.log('login-failed: Check your cookies.');
                                $('#login-form')
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');
                                loginValidator.showErrors(credCheck.cookie);
                            });
                        })
                        .fail(function () {
                            validateSession(function () {
                                console.log('login-failed: There was an error processing the form.');
                                $('#login-form')
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');
                                loginValidator.showErrors(credCheck.server);
                            }, function () {
                                console.log('login-failed: invalid credentials.');
                                $('#login-form')
                                    .closest('form')
                                    .find('input[type=password]')
                                    .val('');
                                loginValidator.showErrors(credCheck.fail);
                            });
                        });
                },

                highlight: function (element, errorClass, validClass) {
                    console.log(element.id);
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

        //  CLICK CONTROLS

        // Setup logo
        $('.navbar-brand-label')
            .on('click', function () {
                dd.show('TOGGLE');
                var top = dd.stateHistory.top();
                if (top === 'FX') {
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

        //console.log('start trip run');
        //trip.start();
        //       trip.next();
        //    trip.next();
        //  trip.stop();   

    });