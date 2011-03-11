var body = $('body')[0];
var canvas = ($('<canvas>').attr({'width':'800','height':'600'}).css({'position':'absolute','top':'0','left':'0'}).prependTo(body))[0];

var context = canvas.getContext("2d");

var last_milli = 0;
var MainGameLoop = Class.extend({
    init: function() {
        this.control = new Control();
        this.chickenPirate = new ChickenPirate(new Point(80, 0), loaded_images.chicken_pirate_frames());
        this.map = new Map(this.chickenPirate);

        var image = new SpriteImage("/images/tile.jpg");
        image.image.width = 50;
        image.image.height = 50;
        var tile = new Tile(new Point(0, 390), image);
        this.map.addTile(tile);

        tile = new Tile(new Point(187, 420), image);
        this.map.addTile(tile);

        tile = new Tile(new Point(187, 200), image);
        this.map.addTile(tile);


        // debug
        var d = new Date();
        this._current_seconds = d.getSeconds();
        this._current_fps = 0;
        this._frames = 0;
    },

    update: function() {
        var d = new Date();
        var millisecondsSince = d.getTime() - this._begin;
        this._begin = d.getTime();

        if (!fps.isNewFrame())
            return;

        canvas.width = canvas.width;

        this.move();

        this.map.update();

        this.draw();

        this._frames++;
        d = new Date();
        context.font = "bold 18px sans-serif";
        context.fillText('frame took: ' + (d.getTime() - this._begin).toString() + 'ms', 500, 300);
        context.fillText(this._current_fps + 'fps', 500, 350);
        context.fillText(millisecondsSince, 500, 380);
        if (d.getSeconds() != this._current_seconds) {
            this._current_seconds = d.getSeconds();
            this._current_fps = this._frames;
            this._frames = 0;
        }
    },

    draw: function() {
        this.chickenPirate.draw();
        this.map.draw();
    },

    move: function() {
        if (this.control.isMovingRight())
            this.chickenPirate.moveRight(this.map._tiles);
        if (this.control.isMovingLeft())
            this.chickenPirate.moveLeft(this.map._tiles);
        if (this.control.isMovingDown())
            this.chickenPirate.moveDown(this.map._tiles);
        if (this.control.isMovingUp())
            this.chickenPirate.moveUp(this.map._tiles);
        if (this.control.isJumping())
            this.chickenPirate.jump(this.map._tiles);
    }

});

var loaded_images = new LoadedImages();

loaded_images.chicken_pirate_frames(function() {
    setInterval('mainGameLoop.update()', 5);
});
var mainGameLoop = new MainGameLoop();
