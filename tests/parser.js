QUnit.test("Parser#expression single list", function(assert) {
  assert.deepEqual(
    new Parser(["(", "+", 1, 1, ")"]).expression(),
    [["+", 1, 1]]
  )
});

QUnit.test("Parser#expression nested list of depth 2", function(assert) {
  assert.deepEqual(
    new Parser(["(", "*", "(", "+", 1, 1, ")", 1, ")"]).expression(),
    [["*", ["+", 1, 1], 1]]
  )
});

QUnit.test("Parser#expression nested list of depth 3", function(assert) {
  assert.deepEqual(
    new Parser(["(", "*", "(", "+", 1, "(", "-", 1, 1, ")", ")", 1, ")"]).expression(),
    [["*", ["+", 1, ["-", 1, 1]], 1]]
  )
});

QUnit.test("Parser#expression multiple lists", function(assert) {
  assert.deepEqual(
    new Parser(["(", "+", 1, 1, ")", "(", "+", 1, 1, ")"]).expression(),
    [["+", 1, 1], ["+", 1, 1]]
  )
  assert.deepEqual(
    new Parser(["(", "+", 1, 1, ")", "(", "+", 1, 1, ")", "(", "+", 1, 1, ")"]).expression(),
    [["+", 1, 1], ["+", 1, 1], ["+", 1, 1]]
  )
});
