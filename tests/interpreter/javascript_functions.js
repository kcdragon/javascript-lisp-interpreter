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

array = new Array
array.push(1)
QUnit.test("Interpreter#result can execute a JavaScript function defined on a Object that takes an argument", function(assert) {
    assert.equal(
        new Interpreter(
            [
                ["indexOf", "array", 1]
            ],
            environment,
            global
        ).result(),
        0
    )
});
