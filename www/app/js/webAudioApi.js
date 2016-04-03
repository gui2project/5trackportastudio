window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var tuna = new Tuna(audioContext);

var audioRecorder = null,
    audioInput = null,
    recordingBuffer = null,
    rawRecordingBuffer = null;

//Options for initializing navigator.getUserMedia
var opts = {
    audio: {
        optional: [{
            echoCancellation: false
        }]
    }
};

//Checks if we can grab mic feed, then grabs mic feed
function captureAudio() {
    if (isGetUserMediaSupported) {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        initializeAudio();
    }
}

//Checks if we can grab mic feed (called from capture audio)
function isGetUserMediaSupported() {
    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    }
    if (!navigator.getUserMedia) {
        return alert('GetUserMedia is not supported in your browser');
    }
}

//Grabs mic feed (called from capture audio)
function initializeAudio() {
    navigator.getUserMedia(opts, gotStream, function (e) {
        console.log(e);
    });
}

//assigns audioInput and recorder
function gotStream(stream) {
    audioInput = audioContext.createMediaStreamSource(stream);
    audioRecorder = new Recorder(audioInput, {
        workerPath: '/javascripts/recorderWorker.js'
    });
}

//constructor for a blank track
function TrackTemplate() { 
    var _this;
    var bufferSource = null;
    var isArmed = false;
    var pausedLocation = null;
    var isMuted = false;
    
    //bools to help control toggle of effects
    var pingPongOn = false;
    var chorusOn = false;
    var reverbOn = false;
     
    var pingPong = new tuna.PingPongDelay({
            wetLevel: 0.3, //0 to 1
            feedback: 0.3, //0 to 1
            delayTimeLeft: 150, //1 to 10000 (milliseconds)
            delayTimeRight: 200 //1 to 10000 (milliseconds)
        });;
    var chorus = new tuna.Chorus({
            rate: 1.5,
            feedback: 0.2,
            delay: 0.0045,
            bypass: 0
        });
    var reverb = new tuna.Convolver({
        highCut: 22050,                         //20 to 22050
        lowCut: 20,                             //20 to 22050
        dryLevel: 1,                            //0 to 1+
        wetLevel: .3,                            //0 to 1+
        level: 1,                               //0 to 1+, adjusts total output of both wet and dry
        impulse: "/app/audio/impulse_rev.wav",    //the path to your impulse response
        bypass: 0
    });  
          
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
    
    


    //initializes a blank track ready for recording
    this.InitTrack = function () {
        
        this.gain.value = 0.7;
        
        //Create all EQ types
        //High
        this.eqHigh.type = "peaking";
        this.eqHigh.frequency.value = 2000;
        this.eqHigh.gain.value = 0;
        this.eqHigh.Q.value = 0.75;
        
        //Mid
        this.eqMid.type = "peaking";
        this.eqMid.frequency.value = 800;
        this.eqMid.gain.value = 0;
        this.eqMid.Q.value = 0.75;
        //Low
        this.eqLow.type = "peaking";
        this.eqLow.frequency.value = 250;
        this.eqLow.gain.value = 0;
        this.eqLow.Q.value = 0.75;
        
        //Connect all parts of the signal chain
        this.eqHigh.connect(this.eqMid);
        this.eqMid.connect(this.eqLow);
        this.eqLow.connect(this.gain);
        this.gain.connect(this.pan);
        this.pan.connect(audioContext.destination);
        
        //Connect gain to VU Meter
        this.gain.connect(this.meter);
    };

    this.playTrack = function () {
        if (this.buffer !== null) {
            bufferSource = audioContext.createBufferSource(2, this.buffer, audioContext.sampleRate);
            bufferSource.buffer = this.buffer;
            bufferSource.connect(this.eqHigh);
            bufferSource.start(0);
        }
    };

    this.stopTrack = function () {
        if (this.buffer !== null) {
            bufferSource.stop();
        }
    };

    this.pauseTrack = function () {
        //needs Jose's clock
    };
    
    //Connects the whole signal chain so that you hear you microphone feed
    //through your speakers
    this.armTrackToggle = function () {
        if (isArmed === false) {
            audioInput.connect(this.eqHigh);
            isArmed = true;
        } else {
            audioInput.disconnect(this.eqHigh);
            isArmed = false;
        }
    };

    this.muteTrackToggle = function () {
        if (!isMuted) {
            this.pan.disconnect();
            isMuted = true;
        } else {
            this.pan.connect(audioContext.destination);
            isMuted = false;
        }
    };

    this.recordToggle = function () {
        if (isArmed === true) {
            if (this.isRecording === false) {
                audioRecorder.clear();
                audioRecorder.record();
                this.isRecording = true;
            } else {
                audioRecorder.stop();
                this.isRecording = false;
                this.getRecorderBuffer();
            }
        } else {
            console.log('Track must be armed to record');
        }
    };

    this.getRecorderBuffer = function () {
        _this = this; //bring scope to callback function
        audioRecorder.getBuffer(this.grabFromAudioRecorderBuffer);
    };

    /*
    Callback function for getRecorderBuffer, grabs the buffer
    from the recorder.js and transfers it to a WebAudioApi
    buffer called recording buffer.
    */
    
    this.grabFromAudioRecorderBuffer = function (buffers) {
        recordingBuffer = audioContext.createBuffer(2, buffers[0].length, audioContext.sampleRate);
        recordingBuffer.getChannelData(0)
            .set(buffers[0]);
        recordingBuffer.getChannelData(1)
            .set(buffers[1]);
        _this.buffer = recordingBuffer;
    };
    
    this.toggleDelayEffect = function (){
        if (!pingPongOn){
            //Insert the delay into the signal chain
            this.gain.disconnect(this.pan);
            this.gain.connect(pingPong);
            pingPong.connect(this.pan);
            pingPongOn = true;
        }
        else{
            //remove from the signal chain
            this.gain.disconnect();
            pingPong.disconnect();
            this.gain.connect(this.pan);        
            pingPongOn = false;
        }
        
    }
    
    this.toggleReverbEffect = function (){
        if (!reverbOn){
            //Insert the delay into the signal chain
            this.gain.disconnect(this.pan);
            this.gain.connect(reverb);
            reverb.connect(this.pan);
            reverbOn = true;
        }
        else{
            //remove from the signal chain
            this.gain.disconnect();
            reverb.disconnect();
            this.gain.connect(this.pan);        
            reverbOn = false;
        }
    }
        
    this.toggleChorusEffect = function (){
        if (!chorusOn){
            //Insert the delay into the signal chain
            this.gain.disconnect(this.pan);
            this.gain.connect(chorus);
            chorus.connect(this.pan);
            chorusOn = true;
        }
        else{
            //remove from the signal chain
            this.gain.disconnect();
            chorus.disconnect();
            this.gain.connect(this.pan);        
            chorusOn = false;
        }
        
    }
}


function doneEncoding(blob){
    download(blob, "TrackStudio.wav", "audio/wav");
  }