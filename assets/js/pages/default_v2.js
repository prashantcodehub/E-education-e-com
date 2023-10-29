$(document).ready(function() {

    $(document.body).on("click", ".btnSubscribe", function(e) {
        e.preventDefault();
        var email = $("#sub-email").val();
        if (email == "") {
            Snackbar.show({
                pos: 'top-right',
                text: 'Oops! Enter an email address.',
                actionTextColor: '#fff',
                backgroundColor: '#ea1c1c'
            });
        }
        if (email.length > 150) {
            Snackbar.show({
                pos: 'top-right',
                text: 'Oops! Entered email address is invalid.',
                actionTextColor: '#fff',
                backgroundColor: '#ea1c1c'
            });
        }
        if (!ValidateEmail(email)) {
            Snackbar.show({
                pos: 'top-right',
                text: 'Oops! Entered email address is invalid.',
                actionTextColor: '#fff',
                backgroundColor: '#ea1c1c'
            });
        }
        if (email != "" && email.length < 150) {
            $.ajax({
                type: 'POST',
                url: "Default.aspx/EmailSubscribes",
                data: "{email:'" + email + "'}",
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                async: false,
                success: function(data2) {
                    if (data2.d.toString() == "Success") {
                        $("#sub-email").val("");
                        Snackbar.show({
                            pos: 'top-right',
                            text: 'Subscribed successfully.',
                            actionTextColor: '#fff',
                            backgroundColor: '#008a3d'
                        });;

                    } else if (data2.d.toString() == "Invalid") {
                        Snackbar.show({
                            pos: 'top-right',
                            text: 'Oops! Entered email address is invalid.',
                            actionTextColor: '#fff',
                            backgroundColor: '#ea1c1c'
                        });

                    } else {
                        Snackbar.show({
                            pos: 'top-right',
                            text: 'Oops! Something went wrong. Please try after some time',
                            actionTextColor: '#fff',
                            backgroundColor: '#ea1c1c'
                        });
                    }
                }
            });
        }


    });



});

function ValidateEmail(email) {
    var expr = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return expr.test(email);
};