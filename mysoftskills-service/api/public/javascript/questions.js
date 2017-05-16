var answersList = [];

$(document).ready(function () {

    var myArr = [];

    $("#sltQuestion1").on('change', function () {
        var amigo = $(this).val();
        alert("soy el primero" + amigo);
    });

    $("#sltQuestion2").on('change', function () {
        var amigo = $(this).val();
        alert("soy el segundo" + amigo);
    });

    $("#sltQuestion3").on('change', function () {
        var amigo = $(this).val();
        alert("soy el tercero" + amigo);
    });

    $("#sltQuestion4").on('change', function () {
        var amigo = $(this).val();
        alert("soy el cuarto" + amigo);
    });

    $("#sltQuestion5").on('change', function () {
        var amigo = $(this).val();
        alert("soy el quinto" + amigo);
    });

    $("#sltQuestion6").on('change', function () {
        var amigo = $(this).val();
        alert("soy el sexto" + amigo);
    });


    $('#btnResults').click(function (e) {
        e.preventDefault();

        alert("hola");

        $("#ulQuestions p").each(function () {
            alert("jajaj");
            // console.log("AHORA VEAMOS "+ " <br/>");
            // myArr.push($(this).html());
        });
        // var firstName = document.getElementById("inputFirstName").value;
        // var lastName = document.getElementById("inputLastName").value;
        // var email = document.getElementById("inputEmail").value;
        // var password = document.getElementById("inputPassword").value;
        // if (email.length === 0) {
        //     alert("Enter a EMAIL");
        // } else {
        //     var productRequest = {};
        //     productRequest.firstName = firstName;
        //     productRequest.lastName = lastName;
        //     productRequest.email = email;
        //     productRequest.password = password;
        //     $.ajax({
        //         type: 'POST',
        //         data: JSON.stringify(productRequest),
        //         contentType: 'application/json',
        //         url: '/signup',
        //         beforeSend: function () {
        //             //loading
        //         },
        //         success: function (response, textStatus, jqXHR) {
        //             console.log("response signup" + response.status);
        //             if (response.status == "SUCCESS") {
        //                 window.alert("Accesos CORRECTOS");
        //                 window.location.href = 'http://localhost:8123/menu';
        //                 // var productResponse = response.product;
        //                 // document.getElementById('lblProductName').innerHTML = productResponse.Description;
        //                 // document.getElementById('pProductRetailPrice').innerHTML = productResponse.RetailPrice;
        //                 // document.getElementById('pProductSKU').innerHTML = productResponse.SKU;
        //             } else {
        //                 window.alert("Accesos incorrectos");
        //                 window.location.href = '/menu';
        //             }
        //         },
        //         error: function (jqXHR, statusCode, errorThrown) {
        //             console.log(jqXHR.responseJSON.message, errorThrown);
        //             window.alert(jqXHR.responseJSON.message);
        //         }
        //     });
        // }
    });

});
