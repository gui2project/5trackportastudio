/**
 *  This is a research file for web audio api it is not used in the project.
 *
 *  @name   audio.js
 */

var msg = '[ MUSIC ]';

function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
            },
            function (error) {
                console.error('decodeAudioData error', error);
            }
        );
    };

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    };

    request.send();
};

BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
};

var Audio = function () {

    var _this = this;

    this.ac = null;
    this.buff = null;
    this.channels = {
        mono: 1,
        stereo: 2
    };

    this.callback = null;
    this.src = [];
    this.splitter = [];
    this.merger = [];
    this.gain = [];
    this.Lgain = [];
    this.Rgain = [];
    this.panner = [];
    this.urls = [];
    this.analyser = [];
    this.javascriptNode = [];

    this.init = function () {
        console.log(msg, "Determining context.");
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        console.log(msg, "Setting audio context.");
        _this.ac = new AudioContext(); //c
    };

    this.url = function (url) {
        console.log(msg, "Saving urls.", url);
        _this.urls = url;
    };

    this.load = function (urls, callback) {
        music.init();
        music.url(urls);
        _this.callback = callback;
        console.log(msg, "Creating buffer.");
        _this.buff = new BufferLoader(_this.ac, _this.urls, _this.loaded);
        _this.buff.load();
    };

    this.loaded = function () {
        _this.buff.bufferList.forEach(function (sound, index) {
            var channels;

            // setup a javascript node for the analyser
            _this.javascriptNode[index] = _this.ac.createScriptProcessor(2048, 1, 1);
            _this.javascriptNode[index].connect(_this.ac.destination);
            _this.analyser[index] = _this.ac.createAnalyser();
            _this.analyser[index].smoothingTimeConstant = 0.3;
            _this.analyser[index].fftSize = 1024;

            console.log(msg, "Loading src", index);
            _this.src[index] = _this.ac.createBufferSource(); //s

            console.log(msg, "Setting buff", index);
            _this.src[index].buffer = sound;

            console.log(msg, "Create M gain node", index);
            _this.gain[index] = _this.ac.createGain(); //g

            console.log(msg, "Splitting into channels", channels = _this.channels.stereo);
            _this.splitter[index] = _this.ac.createChannelSplitter(channels);
            _this.merger[index] = _this.ac.createChannelMerger(channels);

            console.log(msg, "Create L gain node", index);
            _this.Lgain[index] = _this.ac.createGain(); //g

            console.log(msg, "Create R gain node", index);
            _this.Rgain[index] = _this.ac.createGain(); //g

            console.log(msg, "Create panner node", index);
            _this.panner[index] = _this.ac.createPanner(); //p

            console.log(msg, "Connecting src", index);
            _this.src[index].connect(_this.gain[index]);
            _this.gain[index].connect(_this.panner[index]);

            _this.panner[index].connect(_this.splitter[index]);
            _this.splitter[index].connect(_this.Lgain[index], 0);
            _this.splitter[index].connect(_this.Rgain[index], 1);

            _this.Lgain[index].connect(_this.merger[index], 0, 0);
            _this.Rgain[index].connect(_this.merger[index], 0, 1);

            // and connect to destination, if you want audio for the peak analyser
            _this.merger[index].connect(_this.analyser);
            _this.analyser.connect(_this.javascriptNode[index]);
            _this.sourceNode.connect(_this.ac.destination);

        });

        _this.callback();
    };

    this.play = function (index, delay) {
        var now = new Date()
            .getTime();
        console.log(msg, "Playing src", index, 'at', delay, 'from', now);
        _this.src[index].start(delay);
    };

    this.pause = function (index, delay) {
        var now = new Date()
            .getTime();
        console.log(msg, "Stopping src", index, 'at', delay, 'from', now);
        _this.src[index].stop(delay);
    };

    this.pan = function (index, range) {
        var xDeg = parseInt(range);
        var zDeg = xDeg + 90;

        if (zDeg > 90)
            zDeg = 180 - zDeg;

        var x = Math.sin(xDeg * (Math.PI / 180));
        var z = Math.sin(zDeg * (Math.PI / 180));

        console.log(msg, 'Panner set to (', x, ':', 0, ':', z, ')');
        _this.panner[index].setPosition(x, 0, z);
    };

    this.stereo = function (index, Lvalue, Rvalue) {
        console.log(msg, 'Stereo volume set to', Lvalue, Rvalue);
        _this.Lgain[index].gain.value = Lvalue;
        _this.Rgain[index].gain.value = Rvalue;
    };

    this.mono = function (index, value) {
        console.log(msg, 'Mono volume set to', value);
        _this.gain[index].gain.value = value;

    };
};