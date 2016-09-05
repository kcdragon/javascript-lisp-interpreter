QUnit.test("Lexer#token single list", function(assert) {
    assert.deepEqual(
        ["(", "+", 1, 1, ")"],
        new Lexer("(+ 1 1)").tokens()
    )
});

QUnit.test("Lexer#token nested list", function(assert) {
    assert.deepEqual(
        ["(", "-", "(", "+", 1, 1, ")", 1, ")"],
        new Lexer("(- (+ 1 1) 1)").tokens()
    )
});

QUnit.test("Lexer#token floating point number", function(assert) {
    assert.deepEqual(
        ["(", "+", 1.1, 1.2, ")"],
        new Lexer("(+ 1.1 1.2)").tokens()
    )
});
