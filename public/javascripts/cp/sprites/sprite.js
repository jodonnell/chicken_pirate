var Sprite = Class.extend({
    init: function(pos, image) {
        this.ready = 0;
        this.old_pos = new Point(pos.x, pos.y);

        this.image = image;
        this.rect = new Rect(pos, new Point(this.image.image.width, this.image.image.height));
    },

    left: function() {
        return this.rect.left();
    },
    
    right: function() {
        return this.rect.right();
    },

    top: function() {
        return this.rect.top();
    },

    bottom: function() {
        return this.rect.bottom();
    },

    didCollideWith: function(sprite) {
        return this.rect.didCollideWith(sprite.rect);
    },

    didRightCollideWith: function(sprite) {
        return this.rect.didRightCollideWith(sprite.rect);
    },

    didLeftCollideWith: function(sprite) {
        return this.rect.didLeftCollideWith(sprite.rect);
    },

    didBottomCollideWith: function(sprite) {
        return this.rect.didBottomCollideWith(sprite.rect);
    },

    didTopCollideWith: function(sprite) {
        return this.rect.didTopCollideWith(sprite.rect);
    },

    setX: function(x) {
        this.old_pos.x = this.left();
        this.rect.pos.x = x;
        this.rect = new Rect(this.rect.pos, new Point(this.image.image.width, this.image.image.height));
    },

    setY: function(y) {
        this.old_pos.y = this.top();
        this.rect.pos.y = y;
        this.rect = new Rect(this.rect.pos, new Point(this.image.image.width, this.image.image.height));
    },

    draw: function() {
        context.drawImage(this.image.image, this.rect.pos.x, this.rect.pos.y);
    }

});