class Interpreter {
    constructor(expression) {
        this.expression = expression
    }

    result() {
        return this._result(this.expression)
    }

    _result(expression) {
        var interpreter = this

        if (!(expression instanceof Array)) {
            return expression
        }

        if (expression[0] == "+") {
            return expression.slice(1).reduce(function (sum, operand) {
                return sum + interpreter._result(operand)
            }, 0)
        }
        else if (expression[0] == "-") {
            return expression.slice(2).reduce(function (result, operand) {
                return result - interpreter._result(operand)
            }, interpreter._result(expression[1]))
        }
        else if (expression[0] == "*") {
            return expression.slice(1).reduce(function (result, operand) {
                return result * interpreter._result(operand)
            }, 1)
        }
        else if (expression[0] == "/") {
            return expression.slice(2).reduce(function (result, operand) {
                return result / interpreter._result(operand)
            }, interpreter._result(expression[1]))
        }
        else if (expression[0] == "eql") {
            return this._result(expression[1]) == this._result(expression[2])
        }
        else {
            throw "Operation '" + expression[0] + "' is not supported"
        }
    }
}
