SpriteTest = TestCase("SpriteTest");

SpriteTest.prototype = {
    setUp: function () {
        var image = this.createImage();
        this.sprite = new Sprite(new Point(0, 0), image);
        this.sprite2 = new Sprite(new Point(20, 20), image);
    },

    createImage: function() {
        var image = new SpriteImage("images/cat.png");
        image.image.width = 20;
        image.image.height = 20;
        return image;
    },

    "test collision": function() {
        assertTrue(this.sprite.didCollideWith(this.sprite2));

        var sprite2 = new Sprite(new Point(21, 21), this.createImage());
        assertFalse(this.sprite.didCollideWith(sprite2));
    },

    "test setX": function() {
        this.sprite.setX(30);
        assertEquals(30, this.sprite.rect.top_left.x);
        assertEquals(50, this.sprite.rect.bottom_right.x);
    }
}
