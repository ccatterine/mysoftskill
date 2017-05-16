
var express = require('express');
var router = express.Router();

var DataBaseHandler = require("../config/DataBaseHandler");
var dataBaseHandler = new DataBaseHandler();

var connection = dataBaseHandler.createConnection();

router.get("/", function (req, res, next) {
    res.render("index");
});
router.get("/graph", function (req, res, next) {
    res.render("graphresult");
});

router.get("/result", function (req, res, next) {
    res.render("finalgraphs");
});
// router.post("/profile", function (req, res, next) {
//     console.log('aaaaaaaaaaaa'+req.session.user_id);
//     connection.query('CALL sp_GetUserById(?);', req.session.user_id, function (err, result) {
//         if (err) {
//             return connection.rollback(function () {
//                 throw err;
//             });
//         }
//
//         let userResponse = result[0];
//        console.log(userResponse[0]);
//         if (userResponse.length == 0) {
//             res.status(404).send({
//                 status: "ERROR",
//                 message: "User doesn't exist"
//             });
//         } else {
//             req.session.user_id = userResponse[0].userId;
//             req.session.user_firsname = userResponse[0].firstName;
//             req.session.user_lastname = userResponse[0].lastName;
//             req.session.user_email = userResponse[0].email;
//             req.session.user_ciclo = userResponse[0].studyCycleId;
//
//             res.render("profile",{
//                 fname : req.session.user_firsname,
//                 lname : req.session.user_lastname,
//                 email : req.session.user_email,
//                 cycle : req.session.user_ciclo,
//             });
//
//         }
//     });
// });

router.get("/essentials_competition", function (req, res, next) {
    console.log("carlos");

    connection.query('CALL sp_GetCareer();', function (err, result, fields) {
        if (err) {
            return connection.rollback(function () {
                throw err;
            });
        }

        let careers = { careers: result[0]};

        console.log(careers);

        res.render("essentials_competition", careers);

    });
});


module.exports = router;