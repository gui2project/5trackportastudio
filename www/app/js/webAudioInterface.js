var track1 = null,
    track2 = null,
    track3 = null,
    track4 = null;

    /**
     * var track = [null,null,null,null]
     */

$(function() {
    captureAudio();

    track1 = new TrackTemplate();
    track2 = new TrackTemplate();
    track3 = new TrackTemplate();
    track4 = new TrackTemplate();


    track1.InitTrack()
    track2.InitTrack()
    track3.InitTrack()
    track4.InitTrack()

    /**
     * captureAudio();
     * track.forEach(function(index, track){
     *      track[index] = new TrackTemplate();
     *      track[index].InitTrack()
     * });
     */
});

function armTrackToggle(trackNumber)
{
    console.log("armTrackToggle track:"+trackNumber);

    switch(trackNumber) {
    case 1:
        track1.armTrackToggle()
        break;
    case 2:
        track2.armTrackToggle()
        break;
    case 3:
        track3.armTrackToggle()
        break;
    case 4:
        track4.armTrackToggle()
        break;
    }
    /**
     * console.log("armTrackToggle track:"+trackNumber);
     * track[trackNumber].armTrackToggle();
     */
}

function recordToggle(trackNumber)
{
    console.log("recordToggle track:"+trackNumber);

    switch(trackNumber) {
    case 1:
        track1.recordToggle()
        if(track1.isRecording)
        {
            track2.playTrack()
            track3.playTrack()
            track4.playTrack()
        }
        break;
    case 2:
        track2.recordToggle()
        if(track2.isRecording)
        {
            track1.playTrack()
            track3.playTrack()
            track4.playTrack()
        }
        break;
    case 3:
        track3.recordToggle()
        if(track3.isRecording)
        {
            track1.playTrack()
            track2.playTrack()
            track4.playTrack()
        }
        break;
    case 4:
        track4.recordToggle()
        if(track4.isRecording)
        {
        track1.playTrack()
        track2.playTrack()
        track3.playTrack()
        }
        break;
    }
    /**
     *  console.log("recordToggle track:"+trackNumber);
     *  thisTrack[tracknumber].recordToggle();
     *  if(thisTrack[tracknumber].isRecording) {
     *      track.forEach(function(index, thisTrack){
     *          if (index != tracknumber)
     *              track[index].playTrack();
     *       });
     *   }
     *
     */

}

function play(trackNumber){
    track1.playTrack()
    track2.playTrack()
    track3.playTrack()
    track4.playTrack()
    /**
     * track.forEach(function(index, track){
     *      track[index].playTrack();
     * });
     */
}

function pan(trackNumber, amount)
{
    switch(trackNumber) {
    case 1:
        track1.pan.pan.value = amount;
        break;
    case 2:
        track2.pan.pan.value = amount;
        break;
    case 3:
        track3.pan.pan.value = amount;
        break;
    case 4:
        track4.pan.pan.value = amount;
        break;
    }
    /**
     *  track[index].pan.pan.value = amount;
     */
}

function gain(trackNumber, amount)
{
    console.log("Changed Gain of track:" + trackNumber);
    switch(trackNumber) {
    case 1:
        track1.gain.gain.value = amount;
        break;
    case 2:
        track2.gain.gain.value = amount;
        break;
    case 3:
        track3.gain.gain.value = amount;
        break;
    case 4:
        track4.gain.gain.value = amount;
        break;
    }
    /**
     *      console.log("Changed Gain of track:" + trackNumber);
     *      track[trackNumber].gain.gain.value = amount;
     */
}