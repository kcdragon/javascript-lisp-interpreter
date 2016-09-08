var environment = {}
environment["+"] = function (expression) {
    return expression.reduce(function (sum, operand) {
        return sum + operand
    }, 0)
}
environment["-"] = function (expression) {
    return expression[0] - expression[1]
}
environment["*"] = function (expression) {
    return expression[0] * expression[1]
}
environment["/"] = function (expression) {
    return expression[0] / expression[1]
}
environment["eql"] = function (expression) {
    return expression[0] == expression[1]
}
environment["and"] = function (expression) {
    return expression[0] && expression[1]
}
environment["or"] = function (expression) {
    return expression[0] || expression[1]
}
environment["not"] = function (expression) {
    return !expression[0]
}
environment["list"] = function (expression) {
    return expression
}
environment["car"] = function (expression) {
    return expression[0][0]
}
environment["cdr"] = function (expression) {
    return expression[0].slice(1)
}

class Interpreter {
    constructor(expression) {
        this.expression = expression
    }

    result() {
        return this._result(this.expression)
    }

    _result(expression) {
        if (!(expression instanceof Array)) {
            return expression
        }

        if (typeof environment[expression[0]] === "undefined") {
            throw "Operation '" + expression[0] + "' is not supported"
        }
        else {
            return environment[expression[0]](this._evaluateList(expression.slice(1)))
        }
    }

    _evaluateList(expression) {
        var interpreter = this
        return expression.map(function (expression) {
            return interpreter._result(expression)
        })
    }
}
