class Parser {
    constructor(tokens) {
        this.tokens = tokens
    }

    expression() {
        var expressions = []
        while (this.tokens.length !== 0) {
            var expression = this._parse(this.tokens, 0)[0]
            expressions.push(expression)
        }
        return expressions
    }

    _parse(tokens, depth) {
        var expression = []
        var token

        while ((token = tokens.shift()) && token != ")") {
            if (token == "(") {
                expression.push(this._parse(tokens, depth + 1))
            }
            else {
                expression.push(token)
            }

            if (depth === 0) {
                break
            }
        }

        return expression
    }
}
