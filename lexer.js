class LispString {
  constructor(string) {
    this.string = string
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
    return tokens.filter(function (token) {
      return !token.match(/^\s*$/)
    })
  }

  _removeDoubleQuotesFromStrings(tokens) {
    return tokens.map(function (token) {
      if (token.match && token.match(/^".*"$/)) {
        return new LispString(token.replace(/^"/, '').replace(/"$/, ''))
      }
      else {
        return token
      }
    })
  }

  _castNumbersToFloats(tokens) {
    return tokens.map(function (token) {
      if (token.match(/^\d+(\.\d+)?$/)) {
        return parseFloat(token)
      }
      else {
        return token
      }
    })
  }
}
