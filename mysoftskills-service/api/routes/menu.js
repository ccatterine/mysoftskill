var express = require('express');
var router = express.Router();

var DataBaseHandler = require("../config/DataBaseHandler");
var dataBaseHandler = new DataBaseHandler();

var connection = dataBaseHandler.createConnection();

router.get("/", function (req, res, next) {
    console.log("SESSION.USERID " + req.session.user_id);
    connection.query('CALL sp_GetUserById(?);', req.session.user_id, function (err, result) {
        if (err) {
            throw err;
        }

        console.log("2---------------------------");
        console.log(result[0]);
        res.render("menu", { email: result[0][0].email});
    });
});

module.exports = router;