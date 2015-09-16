var logger = require('./../app.js').logger;
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

router.get('/a', function(req, res, next) {
  res.send('aaaaaaaaaaaa');
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

router.post('/login', function(req, res){
    //logger.info("This is an index page! -- log4js");
    console.log("user logining");
    var query_doc = {username:req.body.username, password:req.body.password};
    console.log(query_doc);
    (function(){
        user.find(query_doc, function(err, doc){
            if(!err){
                //console.log(doc);
                if(req.session.user){
                    console.log("we hava session");
                }else {
                    req.session.user = doc[0];
                    console.log(req.session.user);
                }
                console.log(doc.length);
                if(doc.length == 1) {
                    console.log("user login success");
                    res.send({"login_result": "success"});
                }else{
                    console.log("user login failed");
                    res.send(err);
                }
            }else{
                console.log("database error");
               res.send({"login_result":"error"});
            }
        });
    })(query_doc);
});


router.get('/list', function(req, res){
    var tmp = new Array();
    console.log("start get the info");
    (function(){
		blog.find({}, function(err, doc){
			if(!err){
			    //res.send(doc.length);
                var show = function(value,index,ar){
                    //console.log(value._id);
                    tmp.push(value._id);
                };
                doc.forEach(show);
                //console.log(tmp);
                console.log("test if the blogs were selected");
                (function(){
                	user.find({}, function(err, doc1){
                		if(!err){
                            console.log("before redirect");
                            if(req.session.user){
                                console.log("we hava session");
                                res.render("user_list", {users:doc1, blogs:doc, login_status:"login", user: req.session.user});
                            }else {
                                res.render("user_list", {users:doc1, blogs:doc, login_status:"logout"});
                            }
                            //res.send(doc);
                		}else{
                			res.send("Sorry, The Users was not found");
                		}
                	});
                })({});
			}else{
				res.send("Sorry, The Blog was not found");
			}
		});
    })({});
    console.log("1111111111111111111111dddddd");
    //res.send(tmp);
});


module.exports = router;
