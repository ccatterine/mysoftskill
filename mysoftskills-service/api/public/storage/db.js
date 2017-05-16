//DATABASE NAME
var localDB = 'RCS';

//DEFINE OUR TABLES
var TABLE_USER = "USER";
var TABLE_USER_FUNCTION = "USER_FUNCTION";

//DEFINE OUR FIELDS
var KEY_USER_ID = "id";
var KEY_USER_FIRSTNAME = "ip";
var KEY_USER_LASTNAME = "port";
var KEY_USER_PIN = "urlBase";
var KEY_USER_EMPLOYEECODE = "alias";

var KEY_USER_FUNCTION_CODE = "code";
var KEY_USER_FUNCTION_NAME = "name";

function onInit(){
    try {
        if (!window.openDatabase) {
            console.log("No soporta BD");
        }
        else {
            initDB();
            createTables();
        }
    }
    catch (e) {
        if (e == 2) {
            console.log("Versión de base de datos invalida");
        }
        else {
            console.log("Error de desconexión: " + e + ".");
        }
        return;
    }
}

function initDB(){
    var shortName = 'CHIRINOSDB';
    var version = '1.0';
    var displayName = 'ERP CHIRINOS';
    var maxSize = 10240; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}


function createTables(){//creo mis 4 tablas

    var tableUser = "CREATE TABLE " +TABLE_USER + " ( "
        + KEY_USER_ID + " INTEGER , " + KEY_USER_FIRSTNAME + " TEXT, "
        + KEY_USER_LASTNAME + " TEXT, " +KEY_USER_PIN + " TEXT, "
        +KEY_USER_EMPLOYEECODE+" TEXT ) ";

    var tableUserFunctions = "CREATE TABLE "+TABLE_USER_FUNCTION + " ( "
        + KEY_USER_FUNCTION_CODE + " INTEGER , " + KEY_USER_FUNCTION_NAME+" TEXT ) ";

    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(tableUser, [], nullDataHandler, errorHandler);
            console.log("Tabla URL status: OK.");
        });
    }
    catch (e) {
        console.log("Error creando Tabla URL " + e + ".");
        return;
    }

    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(tableUserFunctions, [], nullDataHandler, errorHandler);
            console.log("Tabla CONFIGURATION status: OK.");
        });
    }
    catch (e) {
        console.log("Error creando Tabla CONFIGURATION " + e + ".");
        return;
    }

}

errorHandler = function(transaction, error){//THIS VARIABLE IS FOR OUR TRANSACTION.EXECUTESQL IN OUR METHOD CREATETABLE
    console.log("Error: " + error.message);
    return true;
};

nullDataHandler = function(transaction, results){//THIS VARIABLE IS FOR OUR TRANSACTION.EXECUTESQL IN OUR METHOD CREATETABLE
};


function addUser(id, firstName, lastName, pin, employeeCode){//aqui se hace uin insert
    var query = "INSERT INTO "+TABLE_USER + " ( " + KEY_USER_ID + " , " + KEY_USER_FIRSTNAME
        + " , " + KEY_USER_LASTNAME + ", " + KEY_USER_PIN + " , "+KEY_USER_EMPLOYEECODE +") VALUES (?,?,?,?,?);";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [id, firstName, lastName, pin, employeeCode], function(transaction, results){
                console.log("Insert realizado configuration, id: " + results.insertId);
                window.location.href = "menu";
            }, errorHandler);
        });
    }catch (e) {
        console.log("Error addData " + e + ".");
    }
}

function addUserFunction(code, name){
    var query = "INSERT INTO "+TABLE_USER_FUNCTION + " ( " + KEY_USER_FUNCTION_CODE + " , " + KEY_USER_FUNCTION_NAME+") VALUES (?,?);";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [id, firstName, lastName, pin, employeeCode], function(transaction, results){
                console.log("Insert realizado configuration, id: " + results.insertId);

            }, errorHandler);
        });
    }catch (e) {
        console.log("Error addData " + e + ".");
    }
}

function getUser(){

    var query = "SELECT "+KEY_USER_FIRSTNAME+" AS cantidad FROM "+TABLE_USER;
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){

                console.log(results.rows.item(0));

                // if(config>"0"){
                //
                //     window.location = "menu.html";
                // }else{
                //
                //     window.location = "login.html";
                // }

            }, function(transaction, error){
                console.log("Error: " + error.code + "<br>Mensage: " + error.message);
            });
        });
    }
    catch (e) {
        console.log("Error getConfiguration " + e + ".");
    }
}

// function getUser(url){
//
//     var config ="";
//     var query = "SELECT "+KEY_REMEMBER+" AS cantidad FROM "+TABLE_CONFIGURATION;
//     try {
//         localDB.transaction(function(transaction){
//             transaction.executeSql(query, [], function(transaction, results){
//                 config = results.rows.item(0).cantidad;
//                 if(config>"0"){
//
//                     window.location = "menu.html";
//                 }else{
//
//                     window.location = "login.html";
//                 }
//
//             }, function(transaction, error){
//                 console.log("Error: " + error.code + "<br>Mensage: " + error.message);
//             });
//         });
//     }
//     catch (e) {
//         console.log("Error getConfiguration " + e + ".");
//     }
//
//     return config;
// }