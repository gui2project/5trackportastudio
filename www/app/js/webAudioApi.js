window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var audioRecorder = null,
    audioInput = null,
    recordingBuffer = null,
    rawRecordingBuffer = null;

//Options for initializing navigator.getUserMedia
var opts =
{
  audio: {
      optional: [{ echoCancellation: false }]
  }
};

function captureAudio(){
    if (isGetUserMediaSupported)
    {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        initializeAudio();
    }
}

function isGetUserMediaSupported() {
     if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.getUserMedia)
        return alert('GetUserMedia is not supported in your browser');
}

//Initiate grabbing the users default microphone feed
function initializeAudio(){
    navigator.getUserMedia(opts, gotStream, function(e) {
                alert('Error getting audio');
                console.log(e);
            });
}

function gotStream(stream) {
    audioInput = audioContext.createMediaStreamSource(stream);
    audioRecorder = new Recorder(audioInput,{workerPath:'/javascripts/recorderWorker.js'});
}

function TrackTemplate()//constructor for a blank track
{
    var _this;
    this.buffer = null;
    this.eqHigh = audioContext.createBiquadFilter();
    this.eqMid = audioContext.createBiquadFilter();
    this.eqLow = audioContext.createBiquadFilter();
    this.gain = audioContext.createGain();
    this.pan = audioContext.createStereoPanner();
    this.analyser = audioContext.createAnalyser();
    this.meter = createAudioMeter(audioContext);
    this.timer = new StopWatch();
    this.isRecording = false;
    var bufferSource = null;
    var isArmed = false;
    var pausedLocation = null;
    var isMuted = false;

    this.InitTrack = function()//initializes a blank track ready for recording
    {
        this.gain.value = .7;
        this.eqHigh.type = "peaking",
        this.eqHigh.frequency.value = 2000;
        this.eqHigh.gain.value = 0;
        this.eqHigh.Q.value = .75;
        this.eqMid.type = "peaking",
        this.eqMid.frequency.value = 800;
        this.eqMid.gain.value = 0;
        this.eqMid.Q.value = .75;
        this.eqLow.type = "peaking",
        this.eqLow.frequency.value = 250;
        this.eqLow.gain.value = 0;
        this.eqLow.Q.value = .75;

        this.eqHigh.connect(this.eqMid);
        this.eqMid.connect(this.eqLow);
        this.eqLow.connect(this.gain);
        this.gain.connect(this.pan);
        this.pan.connect(audioContext.destination);
        this.gain.connect(this.meter);
    }

    this.playTrack = function(){
        if(this.buffer!=null)
        {
            bufferSource = audioContext.createBufferSource(2,this.buffer, audioContext.sampleRate);
            bufferSource.buffer = this.buffer;
            bufferSource.connect(this.eqHigh);
            bufferSource.start(0);

        }
    }

    this.stopTrack = function(){
        if(this.buffer!=null)
        {
            bufferSource.stop();
        }
    }

    this.pauseTrack = function(){
        //needs Jose's clock
    }

    this.armTrackToggle = function(){
        if(isArmed == false)
        {
            audioInput.connect(this.eqHigh);
            isArmed = true;
        }
        else
        {
            audioInput.disconnect(this.eqHigh);
            isArmed = false;
        }
    }

    this.muteTrackToggle = function(){
        if(!isMuted){
            this.pan.disconnect();
            isMuted = true;
        }
        else{
            this.pan.connect(audioContext.destination);
            isMuted = false;
        }
    }

    this.recordToggle = function()
    {
        if(isArmed == true)
        {
            if (this.isRecording == false)
            {
                audioRecorder.clear();
                audioRecorder.record();
                this.isRecording=true;
            }
            else
            {
                audioRecorder.stop();
                this.isRecording = false;
                this.getRecorderBuffer();
            }
        }
        else
        console.log("Track must be armed to record");
    }

    this.getRecorderBuffer = function()
    {
        _this = this;//bring scope to callback function
        audioRecorder.getBuffer(this.grabFromAudioRecorderBuffer);
    }

    this.grabFromAudioRecorderBuffer = function(buffers){
        recordingBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
        recordingBuffer.getChannelData(0).set(buffers[0]);
        recordingBuffer.getChannelData(1).set(buffers[1]);
        _this.buffer = recordingBuffer;
    }
}

