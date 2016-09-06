class Parser {
    constructor(tokens) {
        this.tokens = tokens
    }

    expression() {
        return this._parse(this.tokens)[0]
    }

    _parse(tokens) {
        var expression = []
        var token

        while ((token = tokens.shift()) && token != ")") {
            if (token == "(") {
                expression.push(this._parse(tokens))
            }
            else {
                expression.push(token)
            }
        }

        return expression
    }
}
