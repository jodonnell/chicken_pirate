
var Level = Class.extend({
    init: function(map) {
        var image = new SpriteImage("/images/tile.jpg");
        image.image.width = 50;
        image.image.height = 50;
        var tile = new Tile(new Point(0, 390), image);
        map.addTile(tile);
    }
});