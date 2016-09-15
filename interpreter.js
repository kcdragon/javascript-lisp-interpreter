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
    constructor(expression, env = environment, global = this) {
        this.expression = expression
        this.env = env
        this.global = global
    }

    result() {
        var interpreter = this
        return this.expression.map(function (expression) {
            return interpreter._result(expression)
        })[this.expression.length - 1]
    }

    _result(expression) {
        if (this._expressionIsAtom(expression)) {
            return this._resultOfAtom(expression)
        }
        else {
            return this._resultOfList(expression)
        }
    }

    _expressionIsAtom(expression) {
        return !(expression instanceof Array)
    }

    _resultOfAtom(expression) {
        if (typeof expression === "string") {
            return this.env[expression]
        }
        else {
            return expression
        }
    }

    _resultOfList(expression) {
        var operator = expression[0]
        var operatorFunction = this._operatorFunction(operator)

        if (this._delayArgumentInterpretation(operator)) {
            return operatorFunction(expression.slice(1))
        }
        else if (typeof operatorFunction === "undefined") {

            var object = expression[1],
                caller,
                args;

            if (this._isGlobalJavaScriptFunction(operator) || this._isGlobalJavaScriptObject(object)) {

                if (this._isGlobalJavaScriptFunction(operator)) {
                    caller = this.global[operator]
                    object = null
                    args = this._evaluateList(expression.slice(1))
                }
                else {
                    caller = this.global[object][operator]
                    object = this.global[object]
                    args = this._evaluateList(expression.slice(2))
                }

                return caller.apply(object, args)
            }
            else {
                throw "Operation '" + operator + "' is not supported"
            }
        }
        else {
            return operatorFunction(this._evaluateList(expression.slice(1)))
        }
    }

    _operatorFunction(operator) {
        if (typeof operator !== "string") {
            return this._result(operator)
        }
        else {
            return this.env[operator]
        }
    }

    _delayArgumentInterpretation(operator) {
        return typeof operator !== "string" ||
            operator === "setq" ||
            operator === "lambda"
    }

    _isGlobalJavaScriptFunction(operator) {
        return typeof this.global[operator] !== "undefined"
    }

    _isGlobalJavaScriptObject(object) {
        return typeof this.global[object] !== "undefined"
    }

    _evaluateList(expression) {
        var interpreter = this
        return expression.map(function (expression) {
            return interpreter._result(expression)
        })
    }
}
