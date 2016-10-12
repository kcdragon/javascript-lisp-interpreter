var builtInLispFunctions = {}
builtInLispFunctions["+"] = function (expression) {
  return expression[0] + expression[1]
}
builtInLispFunctions["-"] = function (expression) {
  return expression[0] - expression[1]
}
builtInLispFunctions["*"] = function (expression) {
  return expression[0] * expression[1]
}
builtInLispFunctions["/"] = function (expression) {
  return expression[0] / expression[1]
}
builtInLispFunctions["eql"] = function (expression) {
  return expression[0] == expression[1]
}
builtInLispFunctions["and"] = function (expression) {
  return expression[0] && expression[1]
}
builtInLispFunctions["or"] = function (expression) {
  return expression[0] || expression[1]
}
builtInLispFunctions["not"] = function (expression) {
  return !expression[0]
}
builtInLispFunctions["list"] = function (expression) {
  return expression
}
builtInLispFunctions["car"] = function (expression) {
  return expression[0][0]
}
builtInLispFunctions["cdr"] = function (expression) {
  return expression[0].slice(1)
}
builtInLispFunctions["setq"] = function (expression) {
  builtInLispFunctions[expression[0]] = new Interpreter([expression[1]]).result()
}
builtInLispFunctions["lambda"] = function (expression, environment = builtInLispFunctions) {
  var lambdaArgumentNames = expression[0]

  return function (args) {
    var localEnvironment = _.clone(environment)

    _.zip(lambdaArgumentNames, args).forEach(argumentNameValuePair => {
      var argumentName = argumentNameValuePair[0]
      var argumentValue = argumentNameValuePair[1]
      localEnvironment[argumentName] = argumentValue
    })

    return new Interpreter([expression[1]], localEnvironment).result()
  }
}

class Interpreter {
  constructor(expressions, environment = builtInLispFunctions) {
    this.expressions = expressions
    this.environment = environment
  }

  result() {
    return this.expressions.map(
      expression => this._result(expression)
    )[this.expressions.length - 1]
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
    return !this._expressionIsList(expression)
  }

  _expressionIsList(expression) {
    return expression instanceof Array
  }

  _resultOfAtom(expression) {
    if (this._isStringSymbol(expression)) {
      return this.environment[expression]
    }
    else if (expression instanceof LispString) {
      return expression.string
    }
    else {
      return expression
    }
  }

  _resultOfList(expression) {
    var operator = expression[0]
    var operatorFunction = this._operatorFunction(operator)

    if (typeof operatorFunction === "undefined") {
      this._throwUnknownOperatorError(operator);
    }

    var args;
    if (this._delayArgumentInterpretation(operator)) {
      args = expression.slice(1)
    }
    else {
      args = this._evaluateList(expression.slice(1))
    }

    return operatorFunction(args, this.environment)
  }

  _operatorFunction(operator) {
    if (this._isStringSymbol(operator)) {
      return this.environment[operator]
    }
    else if (this._expressionIsList(operator)) {
      return this._result(operator)
    }
  }

  _throwUnknownOperatorError(operator) {
    throw "Operation '" + operator + "' is not supported"
  }

  _delayArgumentInterpretation(operator) {
    return operator === "setq" || operator === "lambda"
  }

  _evaluateList(expression) {
    return expression.map(
      expression => this._result(expression)
    )
  }

  _isStringSymbol(value) {
    return (typeof value) === "string"
  }
}
