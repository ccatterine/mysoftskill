$(document).ready(function () {

    $('#btnPrueba').click(function (e) {
        e.preventDefault();
        alert("hola");
        var userName = document.getElementById('txtUserName').value;
        window.alert(userName);
    });
});