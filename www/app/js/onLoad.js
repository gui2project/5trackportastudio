/**
 *  @file   onLoad.js
 *
 *  The Document on load function, kicks off after a page is rendered.
 */

var music = new Audio();
var sw = new StopWatch();
$( document ).ready(function() {

   // music.load(["/app/audio/2-16 Sublime - Jailhouse.mp3"], function(){

   //     music.mono(0, .25 );
   //     music.stereo(0, 1, 1);// modify p2 for left and p3 for right channels
   //     music.pan(0,0);// negative is left, positive is right
   //     music.play(0,0);
   //     music.pause(0, 11);
   //});


   var mixerbutton = function(element) {
       console.log(element);
       $('button.stop').removeClass('data-active');
       $('button.rewind').removeClass('data-active');
       $('button.forward').removeClass('data-active');
       $('button.play').removeClass('data-active');
       element.addClass('data-active');
    }



   /* Mute buttons */
    $('button.play').on('click', function(){mixerbutton($( this ))} );
    $('button.stop').on('click', function(){mixerbutton($( this ))} );
    $('button.rewind').on('click', function(){mixerbutton($( this ))} );
    $('button.forward').on('click', function(){mixerbutton($( this ))} );

   sw.run('INIT', '#stopWatch-1 div.timedisplay');

});
