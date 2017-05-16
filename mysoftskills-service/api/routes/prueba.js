var express = require('express');
var router = express.Router();

var DataBaseHandler = require("../config/DataBaseHandler");
var dataBaseHandler = new DataBaseHandler();

var connection = dataBaseHandler.createConnection();

router.get("/signup", function (req, res, next) {
    res.render("prueba", {title: "REGISTRO"});

});

router.get("/", function (req, res, next) {
    res.render("prueba", {title: "REGISTRO"});

});

router.get("/signupp", function (req, res, next) {
    // res.render("prueba", {title: "REGISTRO"});
    //
    //

                // res.status(201).send({
                //     status: "SUCCESS",
                //     message: "jajajjajaa"
                // });
    connection.query('CALL sp_GetUserByEmail(?);',
        [
            'carlos'
        ],
        function (error, result, fields) {
            if (error) throw error;

            console.log(result[0]);
            if (result[0].length > 0) {
                // req.session.user_id = result.insertId;
                // res.redirect("menu");
                res.status(201).send({
                    status: "SUCCESS",
                    message: "Get suer",
                    data : result[0]
                });
            } else {
                res.status(404).send({
                    status: "ERROR",
                    message: "An error happened"
                });
            }
        });

});

router.post("/signup", function (req, res, next) {

    connection.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        console.log("1---------------------------");
    connection.query('CALL sp_GetUserByEmail(?);', ['cyntia@gmail.com'], function (err, result) {
        if (err) {
            return connection.rollback(function () {
                throw err;
            });
        }
        console.log(result);
        console.log("2---------------------------");
        if (result[0].length == 0) {
    let sqlQuery = "INSERT INTO USER (firstName, lastName, userProfileImage, email, token, gender, " +
        "studyCycleId, password, creationDate, updateDate) VALUES (?,?,?,?,?,?,?,?,?,?);";
    connection.query(sqlQuery,
        [
            'carlos',
            'carlos',
            '',
            'carlos@gmail.com',
            '',
            '',
            1,
            'carlos',
            '2016-05-01 17:05:12',
            '2016-05-01 17:05:12'
        ],
        function (error, result, fields) {
            if (error) throw error;

            console.log(result);
            if (result.affectedRows == 1) {
                // req.session.user_id = result.insertId;
                res.redirect("menu");
                // res.status(201).send({
                //     status: "SUCCESS",
                //     message: "User added successful"
                // });
            } else {
                res.status(404).send({
                    status: "ERROR",
                    message: "An error happened"
                });
            }
        });

    }
    else {
        res.status(404).send({
            status: "SUCCESS",
            statusCode: 301,
            message: "User already exist "
        });
    }
    });
    });

});

module.exports = router;