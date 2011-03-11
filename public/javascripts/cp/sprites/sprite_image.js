var SpriteImage = Class.extend({
    init: function(image_path, loaded_callback) {
        this.ready = 0;
        this.image = new Image();
        this.image.src = image_path;

        if (loaded_callback) {
            this.image.onload = loaded_callback;
        }
        else {
            this.image.onload = $.proxy( function() {
                this.ready = 1;
            }, this);
        }
    }
});
