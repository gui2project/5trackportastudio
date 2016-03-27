var track1 = null,
    track2 = null,
    track3 = null,
    track4 = null;

/**
 * var track = [null,null,null,null]
 */

$(function () {
    captureAudio();

    track1 = new TrackTemplate();
    track2 = new TrackTemplate();
    track3 = new TrackTemplate();
    track4 = new TrackTemplate();

    track1.InitTrack();
    track2.InitTrack();
    track3.InitTrack();
    track4.InitTrack();

    /**
     * captureAudio();
     * track.forEach(function(index, track){
     *      track[index] = new TrackTemplate();
     *      track[index].InitTrack()
     * });
     */
});

function armTrackToggle(trackNumber) {
    console.log("armTrackToggle track:" + trackNumber);

    switch (trackNumber) {
    case 1:
        track1.armTrackToggle();
        break;
    case 2:
        track2.armTrackToggle();
        break;
    case 3:
        track3.armTrackToggle();
        break;
    case 4:
        track4.armTrackToggle();
        break;
    }
    /**
     * console.log("armTrackToggle track:"+trackNumber);
     * track[trackNumber].armTrackToggle();
     */
}

function recordToggle(trackNumber) {
    console.log("recordToggle track:" + trackNumber);

    switch (trackNumber) {
    case 1:
        track1.recordToggle();

        if (track1.isRecording) {
            track2.playTrack();
            track3.playTrack();
            track4.playTrack();
        }

        sw.run('START');
        break;
    case 2:
        track2.recordToggle();

        if (track2.isRecording) {
            track1.playTrack();
            track3.playTrack();
            track4.playTrack();
        }

        sw.run('START');
        break;
    case 3:
        track3.recordToggle();

        if (track3.isRecording) {
            track1.playTrack();
            track2.playTrack();
            track4.playTrack();
        }

        sw.run('START');
        break;
    case 4:
        track4.recordToggle();

        if (track4.isRecording) {
            track1.playTrack();
            track2.playTrack();
            track3.playTrack();
        }

        sw.run('START');
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

function play() {
    console.log("play");
    track1.playTrack();
    track2.playTrack();
    track3.playTrack();
    track4.playTrack();
    /**
     * track.forEach(function(index, track){
     *      track[index].playTrack();
     * });
     */
    sw.run('START');

}

function stop() {
    console.log("stop");
    sw.run('STOP');
    sw.run('RESET');
    track1.stopTrack();
    track2.stopTrack();
    track3.stopTrack();
    track4.stopTrack();
}

function muteToggle(trackNumber) {

    console.log("MuteToggle track:" + trackNumber);

    switch (trackNumber) {
    case 1:
        track1.muteTrackToggle();
        break;
    case 2:
        track2.muteTrackToggle();
        break;
    case 3:
        track3.muteTrackToggle();
        break;
    case 4:
        track4.muteTrackToggle();
        break;
    }
}

function pan(trackNumber, amount) {
    console.log("pan:" + amount + " track:" + trackNumber);
    switch (trackNumber) {
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

function gain(trackNumber, amount) {
    console.log("Changed Gain of track:" + trackNumber + " to " + amount);
    switch (trackNumber) {
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
}

function eq(trackNumber, type, amount) {
    console.log("Changing Eq" + type + " of Track:" + trackNumber + " amount:" + amount);

    if (type == "high") {
        switch (trackNumber) {
        case 1:
            track1.eqHigh.gain.value = amount;
            break;
        case 2:
            track2.eqHigh.gain.value = amount;
            break;
        case 3:
            track3.eqHigh.gain.value = amount;
            break;
        case 4:
            track4.eqHigh.gain.value = amount;
            break;
        }
    }

    if (type == "mid") {
        switch (trackNumber) {
        case 1:
            track1.eqMid.gain.value = amount;
            break;
        case 2:
            track2.eqMid.gain.value = amount;
            break;
        case 3:
            track3.eqMid.gain.value = amount;
            break;
        case 4:
            track4.eqMid.gain.value = amount;
            break;
        }
    }

    if (type == "low") {
        switch (trackNumber) {
        case 1:
            track1.eqLow.gain.value = amount;
            break;
        case 2:
            track2.eqLow.gain.value = amount;
            break;
        case 3:
            track3.eqLow.gain.value = amount;
            break;
        case 4:
            track4.eqLow.gain.value = amount;
            break;
        }
    }
}