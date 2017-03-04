var express = require('express');
var database = require('./database');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) { 
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

var server = app.listen(8080, function() {
	console.log("server listening at 8080");
});