var FPS = Class.extend({
    FRAME_RATE: 60,

    init: function() {
        this.setRate(this.FRAME_RATE);
        this.reset();

        var d = new Date();
        this.lastSecond = d.getSeconds();
        this.total_frames = 0;
    },

    setRate: function(rate) {
        this.frameLength = 1000 / rate;
    },

    isNewFrame: function() {
        var currTime = this.getTime();
        var new_frame = (this.prevTime + this.frameLength) <= currTime;


        if (!new_frame) {
            if ((this.prevTime + this.frameLength) - currTime < 5) {
                new_frame = true;
            }
        }

        if (new_frame) {
            this.prevTime = currTime;
            this.total_frames++;
        }
        
        return new_frame;
    },

    getTime: function() {
        var d = new Date();
        return d.getTime();
    },

    reset: function() {
        this.prevTime = this.getTime();
    }
});

var fps = new FPS();