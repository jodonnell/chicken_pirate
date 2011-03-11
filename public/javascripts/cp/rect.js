// Value object
var Rect = Class.extend({
    init: function(pos, size) {
        this.pos = pos;
        this.size = size;

        this.top_left = pos;
        this.bottom_right = new Point(pos.x + size.x, pos.y + size.y);
        this.top_right = new Point(pos.x + size.x, pos.y);
        this.bottom_left = new Point(pos.x, pos.y + size.y);
    },

    isPointInRect: function(point) {
        var x_in = point.x >= this.pos.x && point.x <= this.bottom_right.x;
        var y_in = point.y >= this.pos.y && point.y <= this.bottom_right.y;
        return x_in && y_in;
    },

    didCollideWith: function(rect) {
        return this.isPointInRect(rect.bottom_right) || this.isPointInRect(rect.bottom_left)
            || this.isPointInRect(rect.top_right) || this.isPointInRect(rect.top_left);
    },

    didRightCollideWith: function(rect) {
        return this.isPointInRect(rect.bottom_left) || this.isPointInRect(rect.top_left);
    },

    didLeftCollideWith: function(rect) {
        return this.isPointInRect(rect.bottom_right) || this.isPointInRect(rect.top_right);
    },

    didBottomCollideWith: function(rect) {
        return this.isPointInRect(rect.top_right) || this.isPointInRect(rect.top_left);
    },

    didTopCollideWith: function(rect) {
        return this.isPointInRect(rect.bottom_right) || this.isPointInRect(rect.bottom_left);
    },

    left: function() {
        return this.pos.x;
    },

    right: function() {
        return this.pos.x + this.size.x;
    },

    top: function() {
        return this.pos.y;
    },

    bottom: function() {
        return this.pos.y + this.size.y;
    },

    toString: function() {
        return 'x :' + this.pos.x + ' y: ' + this.pos.y + ' width: ' + this.size.x + ' height: ' + this.size.y;
    }
});
