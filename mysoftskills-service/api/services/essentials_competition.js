var express = require('express');
var router = express.Router();

var DataBaseHandler = require("../config/DataBaseHandler");
var dataBaseHandler = new DataBaseHandler();

var connection = dataBaseHandler.createConnection();

router.post('/essentials_competition', function (req, res, next) {

    console.log("HOLA EDITH " + req.body.careerId);
    connection.query('CALL sp_GetCompetitionByCareerId(?);', [req.body.careerId], function (error, result, fields) {
        if (error) throw error;

        let competitionsResponse = result[0];

        console.log("----------RESULTADOS OBTENIDOS ------------");
        console.log(competitionsResponse);

        if (competitionsResponse.length == 0) {
            res.status(404).send({
                status: "ERROR",
                message: "No hay competencias para esa carrera"
            });
        } else {
            res.status(200).send({
                status: "SUCCESS",
                message: "Competitions were found",
                data: competitionsResponse
            });
        }
    });
});

module.exports = router;