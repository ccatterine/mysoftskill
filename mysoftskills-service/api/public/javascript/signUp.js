$(window).load(function(){
    onInit();
});
$(document).ready(function(){
    $('.slider').slider();
});
$(document).ready(function(){
    $('.parallax').parallax();
});

$('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    }
);

//
//
// $(document).ready(function () {
//     $('#btnRegister').click(function (e) {
//         e.preventDefault();
//
//         alert("hola");
//         var firstName = document.getElementById("inputFirstName").value;
//         var lastName = document.getElementById("inputLastName").value;
//         var email = document.getElementById("inputEmail").value;
//         var password = document.getElementById("inputPassword").value;
//         if (email.length === 0) {
//             alert("Enter a EMAIL");
//         } else {
//             var productRequest = {};
//             productRequest.firstName = firstName;
//             productRequest.lastName = lastName;
//             productRequest.email = email;
//             productRequest.password = password;
//             $.ajax({
//                 type: 'POST',
//                 data: JSON.stringify(productRequest),
//                 contentType: 'application/json',
//                 url: '/signup',
//                 beforeSend: function () {
//                     //loading
//                 },
//                 success: function (response, textStatus, jqXHR) {
//                     console.log("response signup" + response.status);
//                     if (response.status == "SUCCESS") {
//                         window.alert("Accesos CORRECTOS");
//                         window.location.href = 'http://localhost:8123/menu';
//                         // var productResponse = response.product;
//                         // document.getElementById('lblProductName').innerHTML = productResponse.Description;
//                         // document.getElementById('pProductRetailPrice').innerHTML = productResponse.RetailPrice;
//                         // document.getElementById('pProductSKU').innerHTML = productResponse.SKU;
//                     } else {
//                         window.alert("Accesos incorrectos");
//                         window.location.href = '/menu';
//                     }
//                 },
//                 error: function (jqXHR, statusCode, errorThrown) {
//                     console.log(jqXHR.responseJSON.message, errorThrown);
//                     window.alert(jqXHR.responseJSON.message);
//                 }
//             });
//         }
//     });
//
// });




