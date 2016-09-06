class Interpreter {
    constructor(expression) {
        this.expression = expression
    }

    result() {
        if (this.expression[0] == "+") {
            return this.expression.slice(1).reduce(function (sum, operand) {
                return sum + operand
            }, 0)
        }
        else if (this.expression[0] == "-") {
            return this.expression.slice(2).reduce(function (result, operand) {
                return result - operand
            }, this.expression[1])
        }
        else if (this.expression[0] == "*") {
            return this.expression.slice(1).reduce(function (result, operand) {
                return result * operand
            }, 1)
        }
        else if (this.expression[0] == "/") {
            return this.expression.slice(2).reduce(function (result, operand) {
                return result / operand
            }, this.expression[1])
        }
        else {
            throw "Operation " + this.expression[0] + " is not supported"
        }
    }
}
