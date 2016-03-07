var track1 = null,
    track2 = null,
    track3 = null,
    track4 = null;

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
    
});

function armTrackToggle(trackNumber)
{
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
}

function recordToggle(trackNumber)
{
    switch(trackNumber) {
    case 1:
        track1.recordToggle()
        break;
    case 2:
        track2.recordToggle()
        break;
    case 3:
        track3.recordToggle()
        break;
    case 4:
        track4.recordToggle()
        break;
    }
}

function play(trackNumber)
{
    switch(trackNumber) {
    case 1:
        track1.playTrack()
        break;
    case 2:
        track2.playTrack()
        break;
    case 3:
        track3.playTrack()
        break;
    case 4:
        track4.playTrack1()
        break;
    }
}

function pan(trackNumber, amount)
{
    switch(trackNumber) {
    case 1:
        track1.pan.pan.value(amount);
        break;
    case 2:
        track2.pan.pan.value(amount);
        break;
    case 3:
        track3.pan.pan.value(amount);
        break;
    case 4:
        track4.pan.pan.value(amount);
        break;
    }
}

function gain(trackNumber, amount)
{
    switch(trackNumber) {
    case 1:
        track1.gain.gain.value(amount);
        break;
    case 2:
        track2.gain.gain.value(amount);
        break;
    case 3:
        track3.gain.gain.value(amount);
        break;
    case 4:
        track4.gain.gain.value(amount);
        break;
    }
}