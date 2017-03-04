var express = require('express');
var database = require('./database');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(express.static('public'));

app.get('/findUsers', database.findUsers);

app.post('/getMoves', urlencodedParser, function(req, res) {
	database.getMoves(req, res);
});

app.get('/', function (req, res) { 
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

var server = app.listen(8080, function() {
	console.log("server listening at 8080");
});