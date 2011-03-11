RectTest = TestCase("RectTest");

RectTest.prototype = {
    setUp: function () {
        this.rect = new Rect(new Point(0, 0), new Point(20, 20));
        this.rect2 = new Rect(new Point(10, 10), new Point(20, 20));
    },

    "test is point in rect": function() {
        var point = new Point(10, 10);
        assertTrue(this.rect.isPointInRect(point));

        point = new Point(21, 21);
        assertFalse(this.rect.isPointInRect(point));

        point = new Point(20, 10);
        assertTrue(this.rect.isPointInRect(point));

        point = new Point(20, 10);
        assertTrue(this.rect2.isPointInRect(point));

        point = new Point(31, 10);
        assertFalse(this.rect2.isPointInRect(point));
    },

    "test did collid with?": function () {
        var rect = new Rect(new Point(10, 10), new Point(20, 20));
        assertTrue(this.rect.didCollideWith(rect));

        var rect = new Rect(new Point(21, 21), new Point(20, 20));
        assertFalse(this.rect.didCollideWith(rect));

        var rect = new Rect(new Point(30, 30), new Point(20, 20));
        assertTrue(this.rect2.didCollideWith(rect));
    }
}
