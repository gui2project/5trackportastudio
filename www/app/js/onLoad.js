/**
 *  @file   onLoad.js
 *
 *  The Document on load function, kicks off after a page is rendered.
 */


dd = new DropDown();
sw = new StopWatch();
$( document ).ready(function() {

   // music.load(["/app/audio/2-16 Sublime - Jailhouse.mp3"], function(){

   //     music.mono(0, .25 );
   //     music.stereo(0, 1, 1);// modify p2 for left and p3 for right channels
   //     music.pan(0,0);// negative is left, positive is right
   //     music.play(0,0);
   //     music.pause(0, 11);
   //});

   sw.run('INIT', '#stopWatch-1 div.timedisplay');
   dd.init('#partial');

$('.error').tooltip();


    // Setup form validation on the #register-form element
    $("#register-form").validate({

        // Specify the validation rules
        rules: {
            'register-name': "required",
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
                minlength: 8
            }
        },

        // Specify the validation error messages
        messages: {
            'register-name': "Your name is required",
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
                minlength: "Must be at least 8 characters"
            }
        },

        submitHandler: function(form) {
             var cred = {name: $('#register-name').val(), email: $('#register-email').val(), pass: $('#register-password-1').val()};
             var url = '/api/post/user/';
             console.log(cred);
             $.ajax({
                method: "POST",
                url: url,
                data: cred
            }).done(function() {

            }).fail(function(){

            });
        }
    });

    // Setup form validation on the #register-form element
    $("#login-form").validate({

        // Specify the validation rules
        rules: {
            'login-email': {
                required: true,
                email: true
            },
            'login-password': {
                required: true,
                minlength: 6
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
                minlength: "Must be at least 6 characters"
            }
        },

        submitHandler: function(form) {
             var cred = {email: $('#login-email').val(), pass: $('#login-password').val()};
             var url = '/api/post/login/';
             console.log(cred);
             $.ajax({
                method: "POST",
                url: url,
                data: cred
            }).done(function() {

            }).fail(function(){

            });
        }
    });


});
