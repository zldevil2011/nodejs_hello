var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('hello', mongodbServer);

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require("../models/user").user;
var blog = require("../models/blog").blog;
// var blog = require("../models/blog").blog_new

//mongoose.connect('mongodb://localhost/hello');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res){
    console.log("user registering");
    var query_doc = {username:req.body.register_username, password:req.body.register_password};
    console.log(query_doc);
    //res.send({"register_result":"success"});
    db.open(function(err, db){
        console.log("register new user to insert into table for user");
        if(!err){
            db.createCollection('users', {safe:true}, function(err, collection){
                if(!err){
                    collection.insert(query_doc, {safe:true}, function(err, result){
                        console.log("the" + req.body.register_username + "register success");
                        res.send({"register_result":"success"});
                    });
                }else{
                    console.log(err);
                }
            });
        }else{
            console.log(err);
        }
    });
});

module.exports = router;
