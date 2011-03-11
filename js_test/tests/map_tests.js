MapTest = TestCase("MapTest");

MapTest.prototype = {
    setUp: function () {
        var image = {image:{width: 15, height: 15}};
        this.chickenPirate = new ChickenPirate(new Point(0, 0), image);
        this.map = new Map(this.chickenPirate);

        this.tile = new Tile(new Point(0, 30), image);
    },

    "test add tile": function() {
        assertEquals(0, this.map._tiles.length);
        this.map.addTile(this.tile);
        assertEquals(1, this.map._tiles.length);
    },

    "test that chicken pirate falls with nothing under him": function() {
        this.map.addTile(this.tile);
        this.map.update();
        assertEquals(this.chickenPirate.FREE_FALL_SPEED, this.chickenPirate.top());
    }
}
