var express = require('express');
var router = express.Router();

var DataBaseHandler = require("../config/DataBaseHandler");
var dataBaseHandler = new DataBaseHandler();

var connection = dataBaseHandler.createConnection();

router.get("/questions", function (req, res, next) {
    console.log(req.query);
    connection.query('CALL sp_GetQuestionsByCompetitionId(?);', [req.query.id], function (err, result, fields) {
        if (err) {
            throw err;
        }
        let questionResponse = {
            title: req.query.title,
            questionsList: result[0]
        };
        res.render("questions", questionResponse);
    });
});

module.exports = router;