/**
 * Created by SMaddikonda on 3/4/2017.
 */

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require statements for the server module.
var port = process.env.PORT || 3000;
console.log("Inside Server");
require ("./server/app.js")(app);

app.listen(port);
