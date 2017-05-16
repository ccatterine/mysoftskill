/**
 * Created by Carlos Leonardo Camilo Vargas HUuamán on 12/10/16.
 */

$(window).load(function () {
    onInit();
});

var listProductTemp = [];
var listCustomerTemp = [];

var customerID = 0;

var skuTemp = 0;

$(document).ready(function () {
    $('.modal').modal();

    document.getElementById('lblDate').innerHTML = '14/12/2016';


    $('#btnSearch').click(function (e) {
        e.preventDefault();
        var sku = document.getElementById("inputProduct").value;
        if (sku.length === 0) {
            alert("Enter a SKU");
        } else {
            var productRequest = {};
            productRequest.sku = sku;
            $.ajax({
                type: 'POST',
                data: JSON.stringify(productRequest),
                contentType: 'application/json',
                url: '/product',
                beforeSend: function () {
                    //loading
                },
                success: function (response, textStatus, jqXHR) {
                    console.log("response login" + response.status);
                    if (response.status == "SUCCESS") {
                        var productResponse = response.product;
                        document.getElementById('lblProductName').innerHTML = productResponse.Description;
                        document.getElementById('pProductRetailPrice').innerHTML = productResponse.RetailPrice;
                        document.getElementById('pProductSKU').innerHTML = productResponse.SKU;
                    } else {
                        window.alert("Accesos incorrectos");
                    }
                },
                error: function (jqXHR, statusCode, errorThrown) {
                    console.log(jqXHR.responseJSON.message, errorThrown);
                    window.alert(jqXHR.responseJSON.message);
                }
            });
        }
    });

    $('#btnAddProduct').click(function (e) {
        e.preventDefault();

        var description = document.getElementById('lblProductName').textContent;
        var retailPrice = parseInt(document.getElementById('pProductRetailPrice').textContent);
        var sku = parseInt(document.getElementById('pProductSKU').textContent);

        if (sku.length === 0) {
            alert("Enter a SKU");
        } else {
            var item = {};
            item.sku = sku;
            item.description = description;
            item.cantidad = 1;
            item.retailPrice = retailPrice;
            item.total = item.cantidad * item.retailPrice;
            addProduct(item);
            refreshProductList();
        }
    });

    function addProduct(literalObjc) {
        listProductTemp.push(literalObjc);
    }

    function refreshProductList() {
        var tbodyEl = $('#tbodyProduct');
        tbodyEl.html('');
        for (i = 0; i < listProductTemp.length; i++) {
            var item = listProductTemp[i];
            var rows = '';

            rows += "<tr><td style='color:green' class='skuId'>" + item.sku + "</td><td>" + item.description +
                "</td><td><button class='btn waves-effect waves-light red' id='btnQuantity'>" + item.cantidad + "</button></td><td>" + item.retailPrice +
                "</td><td>" + (item.total) + "</td><td><button class='btn waves-effect waves-light red' id='btnDelete'> DELETE </button></td></tr>";
            tbodyEl.append(rows);
        }

        refreshTotal();
    }

    function refreshTotal() {
        var totalAmount = 0;
        for (i = 0; i < listProductTemp.length; i++) {
            var item = listProductTemp[i];
            console.log(item.total);
            totalAmount += item.total;
        }
        document.getElementById('lblTotalAmount').innerHTML = totalAmount;
    }

    $('#tableProduct').on('click', '#btnDelete', function () {
        var rowEl = $(this).closest('tr');
        var skuId = rowEl.find('.skuId').text();

        for (i = 0; i < listProductTemp.length; i++) {
            if (skuId == listProductTemp[i].sku) {
                listProductTemp.splice(i, 1);
                refreshProductList();
            }
        }
    });

    $('#tableProduct').on('click', '#btnQuantity', function () {

        var rowEl = $(this).closest('tr');
        var skuId = rowEl.find('.skuId').text();
        skuTemp = skuId;
        $('#modalQuantity').modal('open');

    });

    $('#btnQuantityModal').click(function (e) {
        e.preventDefault();
        var quantity = parseInt(document.getElementById("inputQuantity").value);
        for (i = 0; i < listProductTemp.length; i++) {
            if (skuTemp == listProductTemp[i].sku) {
                listProductTemp[i].cantidad = quantity;
                listProductTemp[i].total = listProductTemp[i].cantidad * listProductTemp[i].retailPrice;
                refreshProductList();
            }
        }
        $('#modalQuantity').modal('close');
    });

    $('#btnCustomer').click(function (e) {
        e.preventDefault();
        $('#modalSearchCustomer').modal('open');
    });

    $('#btnNewCustomer').click(function (e) {
        e.preventDefault();
        $('#modalRegisterCustomer').modal('open');
    });

    $('#btnRegisterCustomer').click(function (e) {
        e.preventDefault();
        var firstName = document.getElementById('lblMdlCustomerName').value;
        var lastName = document.getElementById('lblMdlCustomerLastName').value;
        var dni = document.getElementById('lblMdlCustomerDNI').value;
        var email = document.getElementById('lblMdlCustomerEmail').value;

        var customerRequest = {};

        customerRequest.statusCode = 'A';
        customerRequest.gender = 'M';
        customerRequest.firstName = firstName;
        customerRequest.lastName = lastName;
        customerRequest.dni = dni;
        customerRequest.email = email;
        customerRequest.creationDate = '2016-05-01 17:05:12';
        customerRequest.createdBy = 'CarlitosDroid';

        $.ajax({
            type: 'POST',
            data: JSON.stringify(customerRequest),
            contentType: 'application/json',
            url: '/customer',
            beforeSend: function () {
                //loading
            },
            success: function (response, textStatus, jqXHR) {
                console.log("response login" + response.status);
                if (response.status == "SUCCESS") {
                    console.log(response);


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


    $('#btnSearchCustomer').click(function (e) {
        e.preventDefault();
        var firstName = document.getElementById("inputCustomer").value;
        var customerRequest = {};
        customerRequest.firstName = firstName;

        $.ajax({
            type: 'GET',
            url: '/customer/' + firstName,
            beforeSend: function () {
                //loading
            },
            success: function (response, textStatus, jqXHR) {
                console.log("response login" + response.status);
                listCustomerTemp = [];
                if (response.status == "SUCCESS") {
                    console.log(response[0]);
                    response.customers.forEach(function (customer) {
                        addCustomer(customer);
                    });
                    refreshCustomerList();
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

    function addCustomer(literalObjc) {
        listCustomerTemp.push(literalObjc);
    }

    function refreshCustomerList() {
        var tbodyCustomer = $('#tbodyCustomer');
        tbodyCustomer.html('');
        for (i = 0; i < listCustomerTemp.length; i++) {
            var customerObj = listCustomerTemp[i];
            var rows = '';
            rows += "<tr><td style='color:dodgerblue' class='customerId'>" + customerObj.CustomerNo +
                "</td><td class='firstName'>" + customerObj.FirstName +
                "</td><td class='lastName'>" + customerObj.LastName +
                "</td><td class='dni'>" + customerObj.dni +
                "</td><td><button class='btn waves-effect waves-light red' id='btnCustomerSelected'>Seleccionar</button></td></tr>";
            tbodyCustomer.append(rows);
        }
    }

    $('#tableCustomer').on('click', '#btnCustomerSelected', function () {

        var rowEl = $(this).closest('tr');
        var customerId = rowEl.find('.customerId').text();

        customerID = customerId;

        for (i = 0; i < listCustomerTemp.length; i++) {
            if (customerId == listCustomerTemp[i].CustomerNo) {


            }
        }

        var customerId = rowEl.find('.customerId').text();
        var firstName = rowEl.find('.firstName').text();
        var lastName = rowEl.find('.lastName').text();
        var dni = rowEl.find('.dni').text();

        alert("hola " + customerId + " . - " + firstName + " - " + lastName + " - " + dni);

        document.getElementById('lblFirstName').innerHTML = firstName;
        document.getElementById('lblLastName').innerHTML = lastName;
        document.getElementById('lblDNI').innerHTML = dni;
        document.getElementById('lblAddress').innerHTML = 'Av. Siempre viva';
        document.getElementById('lblTelephone').innerHTML = 945678977;


        /*document.getElementById('last_name').innerHTML = totalAmount;
         document.getElementById('inputCustomer').innerHTML = totalAmount;
         document.getElementById('inputCustomer').innerHTML = totalAmount;
         */
        $('#modalSearchCustomer').modal('close');


        // for (i = 0; i < listaProductTemp.length; i++) {
        //     if (customerId == listProductTemp[i].sku) {
        //         listProductTemp.splice(i, 1);
        //         refreshProductList();
        //     }
        // }
    });


    $('#btnPayment').click(function (e) {
        e.preventDefault();
        $('#modalPayment').modal('open');

        var totalAmount = document.getElementById('lblTotalAmount').textContent;

        document.getElementById('lblTotalPayment').innerHTML = totalAmount;

    });


    $('#btnCalulateSale').click(function (e) {
        e.preventDefault();
        var totalAmount = parseInt(document.getElementById('lblTotalAmount').textContent);
        var takeAmount = document.getElementById('lblGiveAmount').value;
        var giveAmount = totalAmount - takeAmount;

        if(takeAmount > totalAmount){
            document.getElementById('lblGivedAmount').innerHTML = giveAmount;
        }else{
            alert("Monto debe pago debe ser mayoor");
        }
    });


    $('#btnRegisterSale').click(function (e) {
        e.preventDefault();

        var totalAmount = parseInt(document.getElementById('lblTotalAmount').textContent);
        var takeAmount = document.getElementById('lblGiveAmount').value;
        var giveAmount = totalAmount - takeAmount;

        if(customerID ==0){
            alert("ingrese empleado");

        }else{
            if(takeAmount > totalAmount){

                var salesRequest = {};

                salesRequest.header = {};
                salesRequest.header.receiptId = "";
                salesRequest.header.receiptNo = 10000021;
                salesRequest.header.salesDate = '2011-12-18 13:17:17';
                salesRequest.header.customerNo = customerID;
                salesRequest.header.subTotal = 120.00;
                salesRequest.header.subTotalWithTax = 125.00;
                salesRequest.header.amountTotal = 125.00;

                salesRequest.detail = [];

                listProductTemp.forEach(function (productTemp) {
                    var detailProduct = {};
                    detailProduct.receiptId = "";
                    detailProduct.lineNo = 1;
                    detailProduct.customerNo = customerID;
                    detailProduct.salesDate = '2011-12-18 13:17:17';
                    detailProduct.sku = productTemp.sku;
                    detailProduct.qty = productTemp.cantidad;
                    detailProduct.clerk = 'Calin';
                    detailProduct.retailPriceWTax = productTemp.retailPrice;
                    detailProduct.extRetailPriceWTax = productTemp.total;
                    detailProduct.taxPercent = 18.00;
                    detailProduct.taxAmount = 32.00;
                    detailProduct.lineDescription = productTemp.description;

                    salesRequest.detail.push(detailProduct);
                });

                salesRequest.tender = {};
                salesRequest.tender.receiptId = "";
                salesRequest.tender.takeAmount = takeAmount;
                salesRequest.tender.giveAmount = giveAmount;

                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(salesRequest),
                    contentType: 'application/json',
                    url: '/receipt',
                    beforeSend: function () {
                        //loading
                    },
                    success: function (response, textStatus, jqXHR) {
                        console.log("response receipt" + response.status);
                        if (response.status == "SUCCESS") {
                            listCustomerTemp = [];
                            var tbodyEl = $('#tbodyProduct');
                            tbodyEl.html('');

                            document.getElementById('lblTotalAmount').innerHTML = "0.00";

                            alert("Se realizo la venta");

                            $('#modalPayment').modal('close');

                        } else {
                            window.alert("Accesos incorrectos");
                        }
                    },
                    error: function (jqXHR, statusCode, errorThrown) {
                        console.log(jqXHR.responseJSON.message, errorThrown);
                        window.alert(jqXHR.responseJSON.message);
                    }
                });

            }else{

                alert("Monto debe pago debe ser mayoor");

            }
        }
    });
});
