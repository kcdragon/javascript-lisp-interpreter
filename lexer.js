class LispString {
    constructor(string) {
        this.string = string
    }

    string() {
        return this.string
    }
}

class Lexer {
    constructor(string) {
        this.string = string
    }

    tokens() {
        return this._removeDoubleQuotesFromStrings(
            this._castNumbersToFloats(
                this._removeEmptyTokens(
                    this.string.
                        replace(/\(/g, ' ( ').
                        replace(/\)/g, ' ) ').
                        match(/("\S*\s+\S*"|\S+)/g)
                )
            )
        )
    }

    _removeEmptyTokens(tokens) {
        return _.filter(tokens, function (token) {
            return !token.match(/^\s*$/)
        })
    }

    _removeDoubleQuotesFromStrings(tokens) {
        return _.map(tokens, function (token) {
            if (token.match && token.match(/^".*"$/)) {
                return new LispString(token.replace(/^"/, '').replace(/"$/, ''))
            }
            else {
                return token
            }
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
