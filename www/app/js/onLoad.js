/**
 *  @file   onLoad.js
 *
 *  The Document on load function, kicks off after a page is rendered.
 */

//  PRELOAD

//  Get cookie values
ts.user_id = getCookie('ts_user_id');
ts.user_session = getCookie('ts_user_session');

//  INIT components for initial html view
dd = new DropDown();
dd.init('#partial', '#navigation');

sw = new StopWatch();

//  Determine if session is valid and prepare panels - needs ts variable
validateSession();

//  ONLOAD
$( document ).ready(function() {

    //  INIT COMPONENTS
    sw.run('INIT', '#stopWatch-1 div.timedisplay');
    dd.show('INIT', ts.session = false, false);

    //  FORM VALIDATION

    // Setup form validation on the #register-form element
    $("#register-form").validate({

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
                equalTo:  "#register-password-1"
            }
        },

        // Specify the validation error messages
        messages: {
            'register-name': {
                required: "Your name is required",
                minlength: "Must be at least 2 characters"
            },
            'register-email': {
                required: "Email address is required",
                email: "Please enter a valid email address"
            },
            'register-password-1': {
                required: "Your password is required",
                minlength: "Must be at least 8 characters"
            },
            'register-password-2': {
                required: "Your password is required",
                minlength: "Must be at least 8 characters",
                equalTo:  "Passwords do not match"
            }
        },

        submitHandler: function(form) {
             var cred = {name: $('#register-name').val(), email: $('#register-email').val(), pass: $('#register-password-1').val(), login: true};
             var url = '/api/post/user/';

             $.ajax({
                method: "POST",
                url: url,
                data: cred
            }).done(function(data) {
                console.log('User registered');

                ts = {
                    user_id: getCookie('ts_user_id'),
                    user_session: getCookie('ts_user_session')
                };

                dd.show('MIX', true);

            }).fail(function(data){
                console.log('Registration failed');
            });
        }
    });

    // Setup form validation on the #login-form element
    $("#login-form").validate({

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
                required: "Email address is required",
                email: "Please enter a valid email address"
            },
            'login-password': {
                required: "Your password is required",
                minlength: "Must be at least 8 characters"
            }
        },

        submitHandler: function(form) {
             var cred = {email: $('#login-email').val(), pass: $('#login-password').val()};
             var url = '/api/post/login/';

             $.ajax({
                method: "POST",
                url: url,
                data: cred
            }).done(function() {
                console.log('login');

                ts = {
                    user_id: getCookie('ts_user_id'),
                    user_session: getCookie('ts_user_session')
                };

                dd.show('MIX', true);

            }).fail(function(){
                console.log('login-failed');
            });
        }
    });

    // Setup up logout
    $(".link-sign-out").on('click', function(){
        var url = '/api/get/logout/';

        $.ajax({
            url: url
        }).done(function() {
            console.log('logged out');
            dd.show('LOGIN', false);
        }).fail(function(){
            console.log('logged out-failed');
        });
    });

});
