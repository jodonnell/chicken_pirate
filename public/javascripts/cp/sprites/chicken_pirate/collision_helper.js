var CollisionHelperTemplateMethod = Class.extend({
    init: function(sprite, tiles) {
        this._sprite = sprite;
        this._tiles = tiles;
    },

    getMovement: function() {
        this.setToTestPos();
        this.getCollidedWith();
        this.sort();
        this.setOriginalPos();
        
        if (this._collidedWithPos.length == 0)
            return this.getSpeed();

        return this.adjustedMovement();
    },

    getSpeed: function() {
        return this._sprite.movementSpeed;
    }
});

var CollisionHelperRight = CollisionHelperTemplateMethod.extend({
    setToTestPos: function() {
        this._sprite.setX(this._sprite.left() + this._sprite.movementSpeed);
    },
    
    getCollidedWith: function() {
        this._collidedWithPos = [];
        for (var i = 0; i < this._tiles.length; i++) {
            if (this._sprite.didRightCollideWith(this._tiles[i]))
                this._collidedWithPos.push(this._tiles[i].left());
        }
    },

    sort: function() {
        this._collidedWithPos.sort(function(a,b) {return a - b;});
    },

    setOriginalPos: function() {
        this._sprite.setX(this._sprite.left() - this._sprite.movementSpeed);
    },

    adjustedMovement: function() {
        return this._collidedWithPos[0] - this._sprite.right() - 1;
    }
});

var CollisionHelperLeft = CollisionHelperTemplateMethod.extend({
    setToTestPos: function() {
        this._sprite.setX(this._sprite.left() - this._sprite.movementSpeed);
    },
    
    getCollidedWith: function() {
        this._collidedWithPos = [];
        for (var i = 0; i < this._tiles.length; i++) {
            if (this._sprite.didLeftCollideWith(this._tiles[i]))
                this._collidedWithPos.push(this._tiles[i].right());
        }
    },

    sort: function() {
        this._collidedWithPos.sort(function(a,b) {return b - a;});
    },

    setOriginalPos: function() {
        this._sprite.setX(this._sprite.left() + this._sprite.movementSpeed);
    },

    adjustedMovement: function() {
        return this._sprite.left() - this._collidedWithPos[0] - 1;
    }
});

var CollisionHelperBottom = CollisionHelperTemplateMethod.extend({
    setToTestPos: function() {
        this._sprite.setY(this._sprite.top() + this._sprite.FREE_FALL_SPEED);
    },
    
    getCollidedWith: function() {
        this._collidedWithPos = [];
        for (var i = 0; i < this._tiles.length; i++) {
            if (this._sprite.didBottomCollideWith(this._tiles[i]))
                this._collidedWithPos.push(this._tiles[i].top());
        }
    },

    sort: function() {
        this._collidedWithPos.sort(function(a,b) {return a - b;});
    },

    setOriginalPos: function() {
        this._sprite.setY(this._sprite.top() - this._sprite.FREE_FALL_SPEED);
    },

    adjustedMovement: function() {
        return this._collidedWithPos[0] - this._sprite.bottom() - 1;
    },

    getSpeed: function() {
        return this._sprite.FREE_FALL_SPEED;
    }
});

var CollisionHelperTop = CollisionHelperTemplateMethod.extend({
    setToTestPos: function() {
        this._sprite.setY(this._sprite.top() - this._sprite._jump_speed);
    },
    
    getCollidedWith: function() {
        this._collidedWithPos = [];
        for (var i = 0; i < this._tiles.length; i++) {
            if (this._sprite.didTopCollideWith(this._tiles[i]))
                this._collidedWithPos.push(this._tiles[i].bottom());
        }
    },

    sort: function() {
        this._collidedWithPos.sort(function(a,b) {return b - a;});
    },

    setOriginalPos: function() {
        this._sprite.setY(this._sprite.top() + this._sprite._jump_speed);
    },

    adjustedMovement: function() {
        return this._sprite.top() - this._collidedWithPos[0] - 1;
    },

    getSpeed: function() {
        return this._sprite._jump_speed;
    }
});