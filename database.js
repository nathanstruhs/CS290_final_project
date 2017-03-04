var mongo = require('mongodb');
var server = new mongo.Server('localhost',27017,{auto_reconnect:true});
var database = new mongo.Db('rps',server);

database.open(function(err,db) {    
    if(!err) {        
        console.log("Connected to 'rps' database");
        db.collection('users',{strict:true},function(err,collection){
            if(err) { 
                console.log("The users collection doesn't exist");
            }
        })
    } else {
        console.log("Looks like a db error."+ err);
    }
})

exports.findUsers = function(req,res) {
    console.log("in findUsers");
    var cursor = database.collection('users').find( ).toArray(function (err, result) {
        if(!err) {
             for(var i = 0;i < result.length; ++i) {
                if (i != result.length - 1) {
	               res.write(result[i].username+ " " +result[i].cwc + "\n");    
                } else {
                    res.write(result[i].username+ " " +result[i].cwc); 
                }         
	        } 
        } else {
            console.log(err);
        }
        res.end();
    });
};