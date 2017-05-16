var express = require('express');
var router = express.Router();

var DataBaseHandler = require("../config/DataBaseHandler");
var dataBaseHandler = new DataBaseHandler();

var connection = dataBaseHandler.createConnection();

router.get("/signin", function (req, res, next) {
    if (!req.session.user_id) {
        res.render("signin", {userLogged: false});
    } else {
        res.render("signin", {userLogged: true});
    }
});
router.post("/profile", function (req, res, next) {
    console.log('ID user =  '+req.session.user_id);
    connection.query('CALL sp_GetUserById(?);', req.session.user_id, function (err, result) {
        if (err) {
            return connection.rollback(function () {
                throw err;
            });
        }

        let userResponse = result[0];
        console.log(userResponse[0]);
        if (userResponse.length == 0) {
            res.status(404).send({
                status: "ERROR",
                message: "User doesn't exist"
            });
        } else {
            req.session.user_id = userResponse[0].userId;
            req.session.user_firsname = userResponse[0].firstName;
            req.session.user_lastname = userResponse[0].lastName;
            req.session.user_email = userResponse[0].email;
            req.session.user_ciclo = userResponse[0].studyCycleId;

            res.render("profile",{
                fname : req.session.user_firsname,
                lname : req.session.user_lastname,
                email : req.session.user_email,
                cycle : req.session.user_ciclo,
            });

        }
    });
});
router.post("/signin", function (req, res, next) {
    console.log(req.body);

    connection.beginTransaction(function (err) {
        if (err) {
            throw err;
        }

        connection.query('CALL sp_GetUserByEmail(?);', req.body.email, function (err, result) {
            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }

            let userResponse = result[0];
            console.log(userResponse[0]);
            if (userResponse.length == 0) {
                res.status(404).send({
                    status: "ERROR",
                    message: "User doesn't exist"
                });
            } else {
                req.session.user_id = userResponse[0].userId;
                res.redirect("menu");
            }
        });
    });
});

router.get("/signup", function (req, res, next) {
    res.render("signup", {title: "REGISTRO"});
});



router.post("/signup", function (req, res, next) {

    let sqlQuery = "INSERT INTO USER (firstName, lastName, userImage, email, token, gender, " +
        "studyCycleId, password, creationDate, updateDate) VALUES (?,?,?,?,?,?,?,?,?,?);";
    connection.query(sqlQuery,
        [
            req.body.firstName,
            req.body.lastName,
            '',
            req.body.email,
            '',
            'M',
            1,
            req.body.password,
            null,
            null
        ],
        function (error, result, fields) {
            if (error) {
                res.status(404).send({
                    status: "ERROR",
                    message: "USUARIO YA EXISTE EN BASE DE DATOS",
                    technicalMessage: error
                });
                return;
            }

            console.log("1---------------------------");
            console.log(result);
            if (result.affectedRows == 1) {
                req.session.user_id = result.insertId;
                res.redirect("menu");
            } else {
                res.status(404).send({
                    status: "ERROR",
                    message: "An error happened"
                });
            }
        });
});

router.put("/profile", function (req, res, next) {
    console.log(req.body);
    connection.query('CALL sp_PutUserById(?,?,?);', [req.session.user_id, req.body.firstName, req.body.lastName], function (err, result) {
        if (err) {
            return connection.rollback(function () {
                throw err;
            });
        }
        let userResponse = result.affectedRows;
        console.log("FILAS AFECTADAS" + userResponse);
        if (userResponse.affectedRows == 0) {
            res.status(404).send({
                status: "ERROR",
                message: "User doesn't exist"
            });
        } else {
            res.status(200).send({
                status: "SUCCESS",
                message: "User Modified"
            });
        }
    });
});

module.exports = router;

