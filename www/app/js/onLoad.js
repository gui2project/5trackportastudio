/**
 *  @file   onLoad.js
 *
 *  The Document on load function, kicks off after a page is rendered.
 */
var music = new Music();
$( document ).ready(function() {

    music.init();
    music.url("/app/audio/2-16 Sublime - Jailhouse.mp3");
    music.load(function(){
        music.play(0);
    });

});
