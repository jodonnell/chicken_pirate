var LevelTest = TestCase("LevelTest");

LevelTest.prototype = {
    setUp: function () {
        var image = {image:{width: 15, height: 15}};
        this.chickenPirate = new ChickenPirate(new Point(0, 0), image);
        this.map = new Map(this.chickenPirate);
        this.level = new Level(this.map);
    },

    "test that": function() {
        assertFalse(true);
    }
};
