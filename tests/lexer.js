QUnit.test("Lexer#tokens single list", function(assert) {
    assert.deepEqual(
        ["(", "+", 1, 1, ")"],
        new Lexer("(+ 1 1)").tokens()
    )
});

QUnit.test("Lexer#tokens nested list", function(assert) {
    assert.deepEqual(
        ["(", "-", "(", "+", 1, 1, ")", 1, ")"],
        new Lexer("(- (+ 1 1) 1)").tokens()
    )
});

QUnit.test("Lexer#tokens floating point number", function(assert) {
    assert.deepEqual(
        ["(", "+", 1.1, 1.2, ")"],
        new Lexer("(+ 1.1 1.2)").tokens()
    )
});
