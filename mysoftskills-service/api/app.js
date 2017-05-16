var express = require("express");
var bodyParser = require('body-parser');
var session = require("express-session");

var menuSession = require("./middlewares/session_menu");
var index = require('./routes/index');
var auth = require('./routes/auth');
var menu = require('./routes/menu');
var questions = require('./routes/questions');
var prueba = require('./routes/prueba');
var ess_com_service= require('./services/essentials_competition');

var app = express();

app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use(session({
    secret: "123asdfasdf54a5s4df",
    resave: false,
    saveUninitialized: false
}));

/**
 * Renders
 */
app.use('/menu', menuSession);
app.use('/menu', menu);
app.use('/', auth);
app.use('/', index);
app.use('/', questions);
app.use('/prueba', prueba);

/**
 * Services
 */
app.use('/', ess_com_service);

app.listen(8123);