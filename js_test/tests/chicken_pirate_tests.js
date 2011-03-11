ChickenPirateTest = TestCase("ChickenPirateTest");

ChickenPirateTest.prototype = {
    setUp: function () {
        var image = {image:{width: 50, height: 50}};
        this.chickenPirate = new ChickenPirate(new Point(0, 0), image);

        image = {image:{width: 15, height: 15}};
        this.tiles = [new Tile(new Point(0, 50 + 15), image)];


        this.small_image = {image:{width: 1, height: 1}};

        var tiles = [new Tile(new Point(this.chickenPirate.right() + 2, 0), image)];

        this.CHICKEN_PIRATE_TOP_ON_COLLIDE = 14;
    },

    "test basic movement": function() {
        assertEquals(0, this.chickenPirate.left());
        this.chickenPirate.moveRight([]);
        assertEquals(this.chickenPirate.movementSpeed, this.chickenPirate.left());

        this.chickenPirate.moveRight([]);
        this.chickenPirate.moveDown([]);
        assertEquals(this.chickenPirate.movementSpeed * 2, this.chickenPirate.left());
        assertEquals(this.chickenPirate.FREE_FALL_SPEED, this.chickenPirate.top());
    },

    "test that chicken pirate falls until he hits a tile": function() {
        var large_number = 100;
        for (var i = 0; i < large_number; i++) {
            this.chickenPirate.update(this.tiles);
        }

        assertEquals(this.CHICKEN_PIRATE_TOP_ON_COLLIDE, this.chickenPirate.top());
    },

    "test that chicken pirate falls with no floors underneath him": function () {
        this.chickenPirate.update([]);
        assertEquals(this.chickenPirate.FREE_FALL_SPEED, this.chickenPirate.top());

        this.chickenPirate.update([]);
        assertEquals(this.chickenPirate.FREE_FALL_SPEED * 2, this.chickenPirate.top());
    },

    "test that chicken pirate stops falling when he hits the floor": function () {
        this.chickenPirate.update(this.tiles);
        assertEquals(this.chickenPirate.FREE_FALL_SPEED, this.chickenPirate.top());

        this.chickenPirate.update(this.tiles);
        this.chickenPirate.update(this.tiles);
        this.chickenPirate.update(this.tiles);
        assertEquals(this.CHICKEN_PIRATE_TOP_ON_COLLIDE, this.chickenPirate.top());
    },

    "test that old position is recorded": function () {
        assertEquals(0, this.chickenPirate.left());
        this.chickenPirate.moveRight([]);
        assertEquals(0, this.chickenPirate.old_pos.x);
    },

    "test that chicken pirate falls off ledge": function() {
        var image = {image:{width: 2, height: 1}};
        var tiles = [new Tile(new Point(0, this.chickenPirate.bottom() + 1), image)];

        this.chickenPirate.update(tiles);
        assertEquals(0, this.chickenPirate.top());

        this.chickenPirate.moveRight(tiles);
        this.chickenPirate.update(tiles);
        assertEquals(0, this.chickenPirate.top());

        this.chickenPirate.moveRight(tiles);
        this.chickenPirate.update(tiles);
        assertEquals(this.chickenPirate.FREE_FALL_SPEED, this.chickenPirate.top());
    },

    'test that chicken pirate cannot walk through walls': function () {
        var tiles = [new Tile(new Point(this.chickenPirate.right() + 2, 0), this.small_image)];
        this.chickenPirate.moveRight(tiles);
        assertEquals(1, this.chickenPirate.left());

        var tiles = [new Tile(new Point(-2, 0), this.small_image)];
        this.chickenPirate.moveLeft(tiles);
        this.chickenPirate.moveLeft(tiles);
        assertEquals(0, this.chickenPirate.left());
    },

    'test that chicken pirate can not jump while in the air': function() {
        this.chickenPirate.jump([]);
        this.chickenPirate.update([]);
        assertEquals(this.chickenPirate.FREE_FALL_SPEED, this.chickenPirate.top());
    },

    'test that chicken pirate can jump while grounded': function() {
        var tiles = [new Tile(new Point(0, this.chickenPirate.bottom() + 1), this.small_image)];
        this.chickenPirate.jump(tiles);
        this.chickenPirate.update(tiles);
        assertEquals(-this.chickenPirate.JUMP_INITIAL_SPEED, this.chickenPirate.top());
    },

    'test that chicken pirate begins to fall at apex of jump': function() {
        var tiles = [new Tile(new Point(0, this.chickenPirate.bottom() + 1), this.small_image)];
        this.chickenPirate.jump(tiles);

        var totalJumpFrames = this.chickenPirate._totalJumpingTime();
        for (var i = 0; i < totalJumpFrames; i++) {
            fps.total_frames++;
            this.chickenPirate.update(tiles);
        }
        fps.total_frames = 0;
        assertEquals(0, this.chickenPirate.top());
    },
    
    'test that chicken pirate jump collision detection works': function() {
        var tiles = [new Tile(new Point(0, this.chickenPirate.bottom() + 1), this.small_image),
                     new Tile(new Point(0, this.chickenPirate.top() - 3), this.small_image)];

        this.chickenPirate.jump(tiles);
        this.chickenPirate.update(tiles);

        assertEquals(-1, this.chickenPirate.top());
    },

    'test that chicken pirate jump and movement collision detection works': function() {
        var image = {image:{width: 50, height: 1}};
        var tiles = [new Tile(new Point(0, this.chickenPirate.bottom() + 1), image),
                     new Tile(new Point(10, this.chickenPirate.top() - 3), this.small_image)];

        this.chickenPirate.moveRight(tiles);
        this.chickenPirate.jump(tiles);
        this.chickenPirate.update(tiles);

        this.chickenPirate.moveRight(tiles);
        this.chickenPirate.update(tiles);

        assertEquals(0, this.chickenPirate.top());
        assertEquals(this.chickenPirate.movementSpeed * 2, this.chickenPirate.left());
    }
}
