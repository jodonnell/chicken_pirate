var ChickenPirate = Sprite.extend({
    FREE_FALL_SPEED: 5,
    JUMP_INITIAL_SPEED: 5,

    init: function (pos, image) {
        this._super(pos, image);
        this.movementSpeed = 2;
        this._fallSpeed = 2;
        this._jump_speed = false;
    },

    moveRight: function(tiles) {
        var movement = this._getMovementToRight(tiles);
        this.setX(this.left() + movement);
    },

    moveLeft: function(tiles) {
        var movement = this._getMovementToLeft(tiles);
        this.setX(this.left() - movement);
    },

    moveUp: function(tiles) {
        var halfWay = this._totalJumpingTime() / 2;
        var beenJumpingFrames = fps.total_frames - this._startedJumpingAt;
        if (beenJumpingFrames >= halfWay) {
            this._jump_speed = 0;
        }

        var movement = this._getMovementToTop(tiles);
        if (movement != this._jump_speed)
            this._jump_speed = 0;
        
        this.setY(this.top() - movement);
    },

    moveDown: function(tiles) {
        var movement = this._getMovementToBottom(tiles);
        this.setY(this.top() + movement);
    },

    update: function(tiles) {
        if (this._jump_speed)
            this.moveUp(tiles);
        else
            this.moveDown(tiles);
    },

    _getMovementToRight: function(tiles) {
        var chr = new CollisionHelperRight(this, tiles);
        return chr.getMovement();
    },

    _getMovementToLeft: function(tiles) {
        var chl = new CollisionHelperLeft(this, tiles);
        return chl.getMovement();
    },

    _getMovementToBottom: function(tiles) {
        var chm = new CollisionHelperBottom(this, tiles);
        return chm.getMovement();
    },

    _getMovementToTop: function(tiles) {
        var cht = new CollisionHelperTop(this, tiles);
        return cht.getMovement();
    },
    
    jump: function(tiles) {
        if (this._getMovementToBottom(tiles)) {
            return;
        }
        this._jump_speed = this.JUMP_INITIAL_SPEED;
        this._startedJumpingAt = fps.total_frames;
    },

    _totalJumpingTime: function() {
        return Math.round(fps.FRAME_RATE * 0.7);
    }
});
