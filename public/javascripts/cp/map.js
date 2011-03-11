var Map = Class.extend({
    init: function(chickenPirate) {
        this._sprites = [];
        this._tiles = [];
        this._chickenPirate = chickenPirate;
    },

    add: function(sprite) {
        this._sprites.push(sprite);
    },

    addTile: function(tile) {
        this._tiles.push(tile);
    },

    update: function() {
        this._chickenPirate.update(this._tiles);
        for (var i = 0; i < this._sprites.length; i++) {
            this._sprites[i].update();
        }
    },


    draw: function() {
        for (var i = 0; i < this._sprites.length; i++)
            this._sprites[i].draw();

        for (var i = 0; i < this._tiles.length; i++)
            this._tiles[i].draw();
    },

});