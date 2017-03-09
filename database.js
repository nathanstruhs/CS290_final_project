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
            result.sort(function(a, b) { return b.cwc - a.cwc });
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

exports.getMoves = function(req, res) {
    console.log("Getting moves");

    var computer_move = req.body.computer_move;
    var player_move = req.body.player_move;
    var rock = 'url("http://localhost:8080/images/rock.png")';
    var paper = 'url("http://localhost:8080/images/paper.jpeg")';
    var scissors = 'url("http://localhost:8080/images/scissors.png")';

    if (computer_move == player_move) {
        res.send("TIE!");
    } else if (player_move == rock && computer_move == scissors) {
        res.send("You win");
    }  else if (player_move == paper && computer_move == rock) {
        res.send("You win");
    }  else if (player_move == scissors && computer_move == paper) {
        res.send("You win");
    } else {
        res.send("Computer wins")
    }
}

exports.addUser = function(req, res) {
    console.log("Adding user");

    var new_user = {};
    new_user.username = req.body.username;
    new_user.password = req.body.password;
    new_user.cwc = 0;

    database.collection('users',function(err,collection){
        collection.insert(new_user , {safe :true}, function(err, result) {
            if (err) {
                console.log("Error"+err);
            } else {
                console.log('Success: ' + JSON.stringify(result));
                res.send("Success");
            }
        });
    });
}

exports.validateUser = function(req, res) {
    console.log("Validating user..");
    var username = req.body.username;
    var password = req.body.password;
    console.log(username+":"+password);

    database.collection('users', function(err, collection) {
        collection.findOne({ 'username': username }, function(err, item) {
            if (!err && item!=null) {
                if (item.password != password) {
                    console.log("failure");
                    res.send("false");
                    res.end();
                } else {
                    console.log("succ");
                    res.send("true");
                    res.end();
                }
            } else {
                console.log("ERROR: " + err);
            }
        });
    });
}











