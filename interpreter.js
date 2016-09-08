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
environment["setq"] = function (expression) {
    environment[expression[0]] = new Interpreter([expression[1]]).result()
}

class Interpreter {
    constructor(expression) {
        this.expression = expression
    }

    result() {
        var interpreter = this
        return this.expression.map(function (expression) {
            return interpreter._result(expression)
        })[this.expression.length - 1]
    }

    _result(expression) {
        if (expression instanceof Array && expression[0] == "setq") {
            return environment[expression[0]](expression.slice(1))
        }

        if (typeof expression === "string") {
            return environment[expression]
        }

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
