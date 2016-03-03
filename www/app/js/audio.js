var Music = function(){

    this.context;
    this.bufferLoader;
    this.sounds = [
        '../sounds/hyper-reality/br-jam-loop.wav',
        '../sounds/hyper-reality/laughter.wav',
    ];

    this.init = function() {
        // Fix up prefixing
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();
    };

    this.load = function(){
        bufferLoader = new BufferLoader(context, _this.sounds, _this.loaded);
        bufferLoader.load();
    };

    this.loaded = function(bufferList) {
        // Create two sources and play them both together.
        var source1 = context.createBufferSource();
        var source2 = context.createBufferSource();
        source1.buffer = bufferList[0];
        source2.buffer = bufferList[1];

        source1.connect(context.destination);
        source2.connect(context.destination);
        source1.start(0);
        source2.start(0);
    }
}

