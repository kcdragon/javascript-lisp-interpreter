// (ready ($ document (lambda []
//                     (click ($ ".button") (lambda [event]
//                                           (toggleClass ($ "h1") "red")
//                                          )
//                     )
//                    )
//        )
// )

$(document).ready(function () {
    $(".button").click(function (event) {
        $("h1").toggleClass("red")
    });
})
