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
});
