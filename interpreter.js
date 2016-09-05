class Lexer {
    constructor(string) {
        this.string = string
    }

    tokens() {
        return this._castNumbersToFloats(
            this._removeEmptyTokens(
                this.string.
                    replace(/\(/g, ' ( ').
                    replace(/\)/g, ' ) ').
                    split(/\s/)
            )
        )
    }

    _removeEmptyTokens(tokens) {
        return _.filter(tokens, function (token) {
            return !token.match(/^\s*$/)
        })
    }

    _castNumbersToFloats(tokens) {
        return _.map(tokens, function (token) {
            if (token.match(/^\d+(\.\d+)?$/)) {
                return parseFloat(token)
            }
            else {
                return token
            }
        })
    }
}
