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

        if (expression[0] == "+") {
            return this._evaluateList(expression.slice(1)).reduce(function (sum, operand) {
                return sum + operand
            }, 0)
        }
        else if (expression[0] == "-") {
            return this._evaluateList(expression.slice(2)).reduce(function (result, operand) {
                return result - operand
            }, this._result(expression[1]))
        }
        else if (expression[0] == "*") {
            return this._evaluateList(expression.slice(1)).reduce(function (result, operand) {
                return result * operand
            }, 1)
        }
        else if (expression[0] == "/") {
            return this._evaluateList(expression.slice(2)).reduce(function (result, operand) {
                return result / operand
            }, this._result(expression[1]))
        }
        else if (expression[0] == "eql") {
            return this._result(expression[1]) == this._result(expression[2])
        }
        else if (expression[0] == "and") {
            return this._result(expression[1]) && this._result(expression[2])
        }
        else if (expression[0] == "or") {
            return this._result(expression[1]) || this._result(expression[2])
        }
        else if (expression[0] == "not") {
            return !this._result(expression[1])
        }
        else if (expression[0] == "list") {
            return this._evaluateList(expression.slice(1))
        }
        else if (expression[0] == "car") {
            return this._result(expression[1])[0]
        }
        else if (expression[0] == "cdr") {
            return this._result(expression[1]).slice(1)
        }
        else {
            throw "Operation '" + expression[0] + "' is not supported"
        }
    }

    _evaluateList(expression) {
        var interpreter = this
        return expression.map(function (expression) {
            return interpreter._result(expression)
        })
    }
}
