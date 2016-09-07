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

QUnit.test("Interpreter#result 'and' operator", function(assert) {
    assert.equal(
        new Interpreter(["and", ["eql", 1, 1], ["eql", 2, 2]]).result(),
        true
    )
    assert.equal(
        new Interpreter(["and", ["eql", 1, 1], ["eql", 1, 2]]).result(),
        false
    )
});

QUnit.test("Interpreter#result 'or' operator", function(assert) {
    assert.equal(
        new Interpreter(["or", ["eql", 1, 1], ["eql", 1, 2]]).result(),
        true
    )
    assert.equal(
        new Interpreter(["or", ["eql", 2, 1], ["eql", 1, 2]]).result(),
        false
    )
});

QUnit.test("Interpreter#result 'not' operator", function(assert) {
    assert.equal(
        new Interpreter(["not", ["eql", 1, 1]]).result(),
        false
    )
    assert.equal(
        new Interpreter(["not", ["eql", 1, 2]]).result(),
        true
    )
});

QUnit.test("Interpreter#result 'list' operator", function(assert) {
    assert.deepEqual(
        new Interpreter(["list", 1, 2, 3]).result(),
        [1, 2, 3]
    )
    assert.deepEqual(
        new Interpreter(["list", 1, ["list", 2, 3], 4]).result(),
        [1, [2, 3], 4]
    )
});

QUnit.test("Interpreter#result 'car' operator", function(assert) {
    assert.deepEqual(
        new Interpreter(["car", ["list", 1, 2, 3]]).result(),
        1
    )
    assert.deepEqual(
        new Interpreter(["car", ["list", ["+", 1, 1], 3]]).result(),
        2
    )
});

QUnit.test("Interpreter#result 'cdr' operator", function(assert) {
    assert.deepEqual(
        new Interpreter(["cdr", ["list", 1, 2, 3]]).result(),
        [2, 3]
    )
    assert.deepEqual(
        new Interpreter(["cdr", ["list", 1, ["list", 2, 3]]]).result(),
        [[2, 3]]
    )
});
