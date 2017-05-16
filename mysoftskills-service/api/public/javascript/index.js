
$(window).load(function(){
    onInit();
});
$(document).ready(function(){
    $('.slider').slider();
});

$(document).ready(function(){
    $('.carousel').carousel();
});

$(document).ready(function(){
    $('.parallax').parallax();
});


$(document).ready(function () {
    $('.modal').modal();


    $('#btnLogin').click(function (e) {
        e.preventDefault();
        var pin = document.getElementById("inputPin").value;
        var userRequest = {};
        userRequest.pin = pin;

        $.ajax({
            type: 'POST',
            data: JSON.stringify(userRequest),
            contentType: 'application/json',
            url: '/menu',
            beforeSend: function () {
                //loading
            },
            success: function (response, textStatus, jqXHR) {
                console.log("response login" + response.status);
                if (response.status == "SUCCESS") {
                    //another ajax callback

                    var userResponse = response.user;
                    console.log(userResponse.EmployeeId);
                    console.log(userResponse.FirstName);
                    console.log(userResponse.LastName);
                    console.log(userResponse.Pin);
                    console.log(userResponse.EmployeeCode);

                    addUser(userResponse.EmployeeId, userResponse.FirstName,
                        userResponse.LastName, userResponse.Pin,
                        userResponse.EmployeeCode);

                } else {
                    window.alert("Accesos incorrectos");
                }
            },
            error: function (jqXHR, statusCode, errorThrown) {
                console.log(jqXHR.responseJSON.message, errorThrown);
                window.alert(jqXHR.responseJSON.message);
            }
        });
    });

});