// var tokens = new Lexer(`
//                        (ready
//                         ($ document)
//                         (lambda ()
//                          (click
//                           ($ ".button")
//                           (lambda (event)
//                            (toggleClass ($ "h1") "red")
//                           )
//                          )
//                         )
//                        )
//                        `).tokens()
var tokens = new Lexer(`
(click
  ($ ".button")
  (lambda
    (event)
    (toggleClass ($ "h1") "red")
  )
)
                       `).tokens()
// var tokens = new Lexer('(log console "Hello, world")').tokens()
var expressions = new Parser(tokens).expression()
new Interpreter(expressions, environment, window).result()

// new Interpreter(new Parser(new Lexer('($ ".button")').tokens()).expression(), window).result()
// new Interpreter(new Parser(new Lexer('(toggleClass ($ "h1") "red")').tokens()).expression(), window).result()

// new Interpreter(new Parser(new Lexer('(toggleClass ($ "h1") "red")').tokens()).expression(), environment, window).result()
// [<h1 class=​"red">​JavaScript Lisp Interpreter Test​</h1>​]

// var global = this
// global["$"](document).ready(function () {
//     global["$"](".button").click(function (event) {
//         global["$"]("h1").toggleClass("red")
//     });
// })

// $(document).ready(function () {
//     $(".button").click(function (event) {
//         $("h1").toggleClass("red")
//     });
// })
