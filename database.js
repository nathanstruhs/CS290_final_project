var mongo = require('mongodb');
var server = new mongo.Server('localhost',27017,{auto_reconnect:true});
var database = new mongo.Db('users',server);

exports.findUsers = function(req,res) {
    console.log("in findUsers");
    var cursor = database.collection('users').find( ).toArray(function (err, result) {
        if(!err) {
             for(var i = 0;i < result.length; ++i) {
	            res.write(result[i].username+ " " +result[i].cwc+"<br/>");             
	        } 
        }
        res.end();
    });
};