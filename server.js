/**
 * Created by SMaddikonda on 3/4/2017.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 3000;

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.use(session({
    secret: "This is a secret",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require ("./server/app.js")(app);

app.listen(port);
