QUnit.test("Lexer#tokens single list", function(assert) {
    assert.deepEqual(
        new Lexer("(+ 1 1)").tokens(),
        ["(", "+", 1, 1, ")"]
    )
});

QUnit.test("Lexer#tokens nested list", function(assert) {
    assert.deepEqual(
        new Lexer("(- (+ 1 1) 1)").tokens(),
        ["(", "-", "(", "+", 1, 1, ")", 1, ")"]
    )
});

QUnit.test("Lexer#tokens floating point number", function(assert) {
    assert.deepEqual(
        new Lexer("(+ 1.1 1.2)").tokens(),
        ["(", "+", 1.1, 1.2, ")"]
    )
});
