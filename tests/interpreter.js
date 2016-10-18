QUnit.test("Interpreter#result addition", function(assert) {
  assert.equal(
    new Interpreter([["+", 1, 1]]).result(),
    2
  )
});

QUnit.test("Interpreter#result subtraction", function(assert) {
  assert.equal(
    new Interpreter([["-", 2, 1]]).result(),
    1
  )
});

QUnit.test("Interpreter#result multiplication", function(assert) {
  assert.equal(
    new Interpreter([["*", 3, 2]]).result(),
    6
  )
});

QUnit.test("Interpreter#result division", function(assert) {
  assert.equal(
    new Interpreter([["/", 3, 2]]).result(),
    1.5
  )
});

QUnit.test("Interpreter#result nested lists", function(assert) {
  assert.equal(
    new Interpreter([["*", ["+", 1, 1], 3]]).result(),
    6
  )
});

QUnit.test("Interpreter#result equality - 'eql'", function(assert) {
  assert.equal(
    new Interpreter([["eql", 1, 1]]).result(),
    true
  )
  assert.equal(
    new Interpreter([["eql", 1, 2]]).result(),
    false
  )
});

QUnit.test("Interpreter#result 'and' operator", function(assert) {
  assert.equal(
    new Interpreter([["and", ["eql", 1, 1], ["eql", 2, 2]]]).result(),
    true
  )
  assert.equal(
    new Interpreter([["and", ["eql", 1, 1], ["eql", 1, 2]]]).result(),
    false
  )
});

QUnit.test("Interpreter#result 'or' operator", function(assert) {
  assert.equal(
    new Interpreter([["or", ["eql", 1, 1], ["eql", 1, 2]]]).result(),
    true
  )
  assert.equal(
    new Interpreter([["or", ["eql", 2, 1], ["eql", 1, 2]]]).result(),
    false
  )
});

QUnit.test("Interpreter#result 'not' operator", function(assert) {
  assert.equal(
    new Interpreter([["not", ["eql", 1, 1]]]).result(),
    false
  )
  assert.equal(
    new Interpreter([["not", ["eql", 1, 2]]]).result(),
    true
  )
});

QUnit.test("Interpreter#result 'if' operator", function(assert) {
  assert.equal(
    new Interpreter([["if", ["eql", 1, 1], 2, 3]]).result(),
    2
  )
  assert.equal(
    new Interpreter([["if", ["eql", 1, 2], 2, 3]]).result(),
    3
  )
});

QUnit.test("Interpreter#result 'list' operator", function(assert) {
  assert.deepEqual(
    new Interpreter([["list", 1, 2, 3]]).result(),
    [1, 2, 3]
  )
  assert.deepEqual(
    new Interpreter([["list", 1, ["list", 2, 3], 4]]).result(),
    [1, [2, 3], 4]
  )
});

QUnit.test("Interpreter#result 'car' operator", function(assert) {
  assert.deepEqual(
    new Interpreter([["car", ["list", 1, 2, 3]]]).result(),
    1
  )
  assert.deepEqual(
    new Interpreter([["car", ["list", ["+", 1, 1], 3]]]).result(),
    2
  )
});

QUnit.test("Interpreter#result 'cdr' operator", function(assert) {
  assert.deepEqual(
    new Interpreter([["cdr", ["list", 1, 2, 3]]]).result(),
    [2, 3]
  )
  assert.deepEqual(
    new Interpreter([["cdr", ["list", 1, ["list", 2, 3]]]]).result(),
    [[2, 3]]
  )
});

QUnit.test("Interpreter#result execute multiple expressions", function(assert) {
  assert.equal(
    new Interpreter([["+", 1, 1], ["+", 1, 2]]).result(),
    3
  )
});

QUnit.test("Interpreter#result 'setq' - assign variable", function(assert) {
  assert.equal(
    new Interpreter([["setq", "a", 1], ["+", "a", 2]]).result(),
    3
  )
});

QUnit.test("Interpreter#result 'setq' - assign variable to another variable", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["setq", "a", 1],
        ["setq", "b", "a"],
        ["+", "b", 2]
      ]
    ).result(),
    3
  )
});

QUnit.test("Interpreter#result lambda function", function(assert) {
  assert.equal(
    typeof new Interpreter([["lambda", ["n"], ["+", "n", 1]]]).result(),
    "function"
  )
});

QUnit.test("Interpreter#result evaluate lambda", function(assert) {
  assert.equal(
    new Interpreter([[["lambda", ["n"], ["+", "n", 1]], 1]]).result(),
    2
  )
});

QUnit.test("Interpreter#result lambda scope", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["setq", "n", 2],
        [["lambda", ["n"], ["+", "n", 1]], 1],
        ["+", "n", 1]
      ]
    ).result(),
    3
  )
});

QUnit.test("Interpreter#result lambda nested scope", function(assert) {
  assert.equal(
    new Interpreter(
      [
        [
          [
            "lambda",
            ["n"],
            ["+", 1, [["lambda", ["m"], ["+", "m", 1]], "n"]]
          ],
          1
        ]
      ]
    ).result(),
    3
  )
});

QUnit.test("Interpreter#result throws error for unknown function", function(assert) {
  assert.throws(
    function () {
      return new Interpreter(
        [
          ["unknown", 1]
        ]
      ).result()
    },
      /Operation 'unknown' is not supported/
  )
});
