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

QUnit.test("Lexer#tokens string", function(assert) {
    assert.deepEqual(
        new Lexer('(string "hello")').tokens(),
        ["(", "string", new LispString("hello"), ")"]
    )
});

QUnit.test("Lexer#tokens string with space", function(assert) {
    assert.deepEqual(
        new Lexer('(string "hello world")').tokens(),
        ["(", "string", new LispString("hello world"), ")"]
    )
});

QUnit.test("Lexer#tokens multiple expressions", function(assert) {
    assert.deepEqual(
        new Lexer("(+ 1 1) (+ 1 1)").tokens(),
        ["(", "+", 1, 1, ")", "(", "+", 1, 1, ")"]
    )
});
