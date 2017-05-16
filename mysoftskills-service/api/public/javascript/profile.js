$(document).ready(function(){

    $('#btnPrueba').click(function (e) {
        e.preventDefault();
        var firstName = document.getElementById('txtFirstName').value;
        var lastName = document.getElementById('txtLastName').value;
        var userRequest = {};
        userRequest.firstName = firstName;
        userRequest.lastName = lastName;
        $.ajax({
            type: 'PUT',
            data: JSON.stringify(userRequest),
            contentType: 'application/json',
            url: '/profile',
            beforeSend: function () {
                //loading
            },
            success: function (response, textStatus, jqXHR) {
                alert("UPDATED USER");
            },
            error: function (jqXHR, statusCode, errorThrown) {
                console.log(jqXHR.responseJSON.message, errorThrown);
                window.alert(jqXHR.responseJSON.message);
            }
        });



    });

    $('.parallax').parallax();
    Materialize.updateTextFields();


});




