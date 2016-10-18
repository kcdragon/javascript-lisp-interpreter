function newBuiltInLispFunctions() {
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
  builtInLispFunctions["if"] = function (expression) {
    var conditional = expression[0]
    if (conditional) {
      return expression[1]
    }
    else {
      return expression[2]
    }
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
  builtInLispFunctions["setq"] = function (expression, environment) {
    environment[expression[0]] = new Interpreter([expression[1]], environment).result()
  }
  builtInLispFunctions["lambda"] = function (expression, environment) {
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
  return builtInLispFunctions
}
