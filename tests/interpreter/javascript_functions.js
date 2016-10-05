var global = this
var globallyDefinedFunction = function () { return 1 }
var globallyDefinedFunctionWithOneArgument = function (n) { return n }
var globallyDefinedFunctionWithTwoArguments = function (a, b) { return a + b }

QUnit.test("Interpreter#result can call a globally defined JavaScript function", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["globallyDefinedFunction"]
      ],
      environment,
      global
    ).result(),
    1
  )
});

QUnit.test("Interpreter#result can call a globally defined JavaScript function with an argument", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["globallyDefinedFunctionWithOneArgument", 1]
      ],
      environment,
      global
    ).result(),
    1
  )
});

QUnit.test("Interpreter#result can call a globally defined JavaScript function with two arguments", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["globallyDefinedFunctionWithTwoArguments", 1, 2]
      ],
      environment,
      global
    ).result(),
    3
  )
});

QUnit.test("Interpreter#result can call a globally defined JavaScript function with a dynamic argument", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["globallyDefinedFunctionWithOneArgument", ["+", 1, 2]]
      ],
      environment,
      global
    ).result(),
    3
  )
});

var array = new Array
array.push(1)
QUnit.test("Interpreter#result can execute a JavaScript function defined on a Object", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["pop", "array"]
      ],
      environment,
      global
    ).result(),
    1
  )
});

var array2 = new Array
array2.push(1)
QUnit.test("Interpreter#result can execute a JavaScript function defined on a Object that takes an argument", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["indexOf", "array2", 1]
      ],
      environment,
      global
    ).result(),
    0
  )
});

var array3 = new Array
array3.push(1)
QUnit.test("Interpreter#result can execute a JavaScript function defined on a Object that takes a dynamic argument", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["pop", ["concat", "array3", 2]]
      ],
      environment,
      global
    ).result(),
    2
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

QUnit.test("Interpreter#result can execute a JavaScript function defined on a String", function(assert) {
  assert.equal(
    new Interpreter(
      [
        ["indexOf", new LispString("hello"), new LispString("e")]
      ]
    ).result(),
    1
  )
});
