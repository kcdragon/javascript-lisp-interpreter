QUnit.test("Interpreter#result addition", function(assert) {
    assert.equal(
        new Interpreter(["+", 1, 1]).result(),
        2
    )
});

QUnit.test("Interpreter#result subtraction", function(assert) {
    assert.equal(
        new Interpreter(["-", 2, 1]).result(),
        1
    )
});

QUnit.test("Interpreter#result multiplication", function(assert) {
    assert.equal(
        new Interpreter(["*", 3, 2]).result(),
        6
    )
});

QUnit.test("Interpreter#result division", function(assert) {
    assert.equal(
        new Interpreter(["/", 3, 2]).result(),
        1.5
    )
});

QUnit.test("Interpreter#result nested lists", function(assert) {
    assert.equal(
        new Interpreter(["*", ["+", 1, 1], 3]).result(),
        6
    )
});

QUnit.test("Interpreter#result equality - 'eql'", function(assert) {
    assert.equal(
        new Interpreter(["eql", 1, 1]).result(),
        true
    )
    assert.equal(
        new Interpreter(["eql", 1, 2]).result(),
        false
    )
});
