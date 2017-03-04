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

app.post('/addUsers', urlencodedParser, function(req, res) {
	database.addUser(req, res);
});

app.get('/', function (req, res) { 
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/login.html', function (req, res) { 
	res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/signUp.html', function (req, res) { 
	res.sendFile(path.join(__dirname + '/public/signUp.html'));
});

var server = app.listen(8080, function() {
	console.log("server listening at 8080");
});