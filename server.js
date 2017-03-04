var express = require('express');
var app = express();

app.get('/', function (req, res) { 
	res.send('Hello Bend. <br/> Use POSTMAN and POST to me. I dare you!'); 
})

app.post('/', function (req, res) { 
	res.send('Hello Portland'); 
})

var server = app.listen(8080, function() {
	console.log("server listening at 8080");
});