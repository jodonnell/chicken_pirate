var LoadedImages = Class.extend({
    init: function() {
        this.chicken_pirate_image = 0;
    },

    chicken_pirate_frames: function(loaded_callback) {
        if (this.chicken_pirate_image)
            return this.chicken_pirate_image;

        this.chicken_pirate_image = new SpriteImage("/images/cat.png", loaded_callback);
        return this.chicken_pirate_image;
    }
});
