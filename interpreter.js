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
environment["lambda"] = function (expression) {
    return function (args) {
        // TODO if args.length !== expression[0].length throw error

        var localEnvironment = {}
        Object.keys(environment).forEach(function (key) {
            localEnvironment[key] = environment[key]
        })
        args.forEach(function (arg, index) {
            localEnvironment[expression[0][index]] = arg
        })
        return new Interpreter([expression[1]], localEnvironment).result()
    }
}

class Interpreter {
    constructor(expression, env = environment) {
        this.expression = expression
        this.env = env
    }

    result() {
        var interpreter = this
        return this.expression.map(function (expression) {
            return interpreter._result(expression)
        })[this.expression.length - 1]
    }

    _result(expression) {
        console.log("expression: " + expression)
        if (typeof expression === "string") {
            return this.env[expression]
        }
        else if (expression instanceof Array) {
            var operator = expression[0]

            if (typeof operator !== "string") {
                return this._result(operator)(expression.slice(1))
            }
            if (operator === "setq") {
                return this.env[operator](expression.slice(1))
            }
            else if (operator === "lambda") {
                return this.env[operator](expression.slice(1))
            }
            else if (typeof this.env[operator] === "undefined") {
                throw "Operation '" + operator + "' is not supported"
            }
            else {
                return this.env[operator](this._evaluateList(expression.slice(1)))
            }
        }
        else {
            return expression
        }
    }

    _evaluateList(expression) {
        var interpreter = this
        return expression.map(function (expression) {
            return interpreter._result(expression)
        })
    }
}
