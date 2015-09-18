var mongodb = require('mongodb');
var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('hello', mongodbServer);

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require("../models/user").user;
var blog = require("../models/blog").blog;

mongoose.connect('mongodb://localhost/hello');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.url!=="/favicon.ico"){
		console.log(req.url);
		res.render('index', { title: 'Express__test—HTML' });
	}
});

/* login */
router.get('/login', function(req, res){
    console.log("user click to login the account");
    if(req.session.user){
        res.send("session hava saved" + req.session.user);
    }else{
        req.session.user = 1;
        res.send("initial" + req.session.user);
    }

	//res.render('login', { title : 'login'});
});

/* logout */
router.get('/logout', function(req, res){
	res.render('logout', { title : 'logout' })
});

/* blog_list */
router.get('/blog_list', function(req, res){
	(function(){
		blog.find({}, function(err, doc){
			if(!err){
                if(req.session.user){
                    console.log("we hava session");
                    res.render("blog_list", {blogs:doc, login_status:"login", title: "Our Blog",user: req.session.user});
                }else {
                    res.render("blog_list", {blogs:doc, login_status:"logout", title: "Our Blog",user: req.session.user});
                }
			}else{
				console.log("failed to get blog list");
			}	
		});
	})({});
});

/* blog */
router.get('/blog/:id', function(req, res){
	var blog_id = req.param('id');
	var the_blog;
	var query_doc = {_id:blog_id};
	(function(){
		blog.find(query_doc, function(err, doc){
			if(!err){
				the_blog = doc;
			}else{
				console.log("failed to get the blog");
			}
		});
	})(query_doc);
	(function(){
		blog.find({}, function(err, doc){
			if(!err){
                if(req.session.user){
                    console.log("we hava session");
                    res.render("blog", {blogs:doc, title: the_blog[0].blog_title, blog: the_blog[0], login_status:"login",user: req.session.user});
                }else {
                    res.render("blog", {blogs:doc, title: the_blog[0].blog_title, blog: the_blog[0], login_status:"logout"});
                }
				//console.log(the_blog);
			}else{
				res.send("Sorry, The Blog was not found");
			}
		});
	})({});

});

// edit_blog
router.get('/edit_blog', function(req, res){
    if(req.session.user){
        console.log("we hava session");
        res.render('edit_blog', { title : '创建新的博客', login_status:"login",user: req.session.user});
    }else {
        res.render('edit_blog', { title : '创建新的博客' , login_status:"logout"});
    }
});
// Save blog
router.post('/save_blog', function(req, res){
	console.log("save_blog");
    var author = "admin";
    if(req.session.user){
        console.log("we hava session");
        author = req.session.user.username;
    }
	var query_doc = {blog_author: author, blog_title:req.body.blog_title, blog_content:req.body.blog_body, blog_time:new Date()};

	db.open(function(err, db){
		console.log("try to open mongodb");
		if(!err){
			db.createCollection('blogs', {safa:true}, function(err, collection){
				if(err){
					console.log(err);
				}else{
					collection.insert(query_doc, {safe:true}, function(err, result){
						console.log("here_test_tag");
						//console.log(result);
                        console.log("we finished");
	                    res.send({"save_status":"success"});
					});
					//更新数据
                   // collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
                   //     console.log(result);
                   // });
                   // 删除数据
                   // collection.remove({title:'hello'},{safe:true},function(err,result){
                   //      console.log(result);
                   //  });
				}
			});
		}else{
			console.log(err);
		}
	})
});

//query_blog redirect to query_page
router.get('/query_blog', function(req, res){

    var query_doc = {blog_title: new RegExp(req.query.blog_key)};
    console.log(query_doc);
    var login_result = "logout", user = null;
    if(req.session.user){
        login_result = "login";
        user = req.session.user;
    }

    (function(){
        blog.find(query_doc, function(err, doc){
            if(!err){
                //console.log(doc);
                res.render('query_blog', {blogs:doc, login_status:login_result ,user: user});
            }else{
                res.send("query failed");
            }
        });
    })(query_doc);
});

//query_blog by key
router.post('/query_blog', function(req, res){
    console.log("query blog by key word");
    var query_doc = {blog_title: new RegExp(req.body.key)};
    (function(){
        blog.find(query_doc, function(err, doc){
            if(!err){
                console.log(doc);
                //res.send({"query_result":"success"});
                if(req.session.user){
                    console.log("we hava session");
                    //res.redirect("/blog_list");
                    res.render("blog_list", {blogs:doc, login_status:"login", title: "Our Blog",user: req.session.user});
                }else {
                    res.render("blog_list", {blogs:doc, login_status:"logout", title: "Our Blog",user: req.session.user});
                }
            }else{
                console.log("failed to query");
                res.send({"query_result":"error"});
            }
        });
    })(query_doc);

});

/* search blog precise */
router.post('/search_blog_d', function(req, res){
	console.log("get info: ");
	console.log(req.body.blog_author);
	console.log(req.body.blog_title);
	var query_doc = {blog_author:req.body.blog_author};
	console.log(query_doc);
	(function(){
		console.log(query_doc);
		blog.find(query_doc, function(err, doc){
			console.log(query_doc);
			if(!err){
				console.log(doc);
    			console.log(doc[0]);
    			console.log(doc[0].blog_author);
				console.log("fine, it is here");
                if(req.session.user){
                    console.log("we hava session");
                    res.render('blog', {blog: doc, title:"blog_info", login_status:"login",user: req.session.user});
                }else {
                    res.render('blog', {blog: doc, title:"blog_info", login_status:"logout"});
                }
			}else{
				console.log("failed to count");
			}
		});
	})(query_doc);
});

/* homepage */
router.post('/homepage', function(req, res){
	var query_doc = {username:req.body.userid, password:req.body.password};
	console.log(query_doc);
	(function(){
		user.count(query_doc, function(err, doc){
			console.log(doc);
			if(doc == 1){
				console.log(query_doc.userid + ":login success in " + new Date());
				res.render('homepage', { title : 'homepage'});
			}else{
				console.log(query_doc.userid + ": login failed in " + new Date());
                res.redirect('/');
			}
		});
	})(query_doc);
});

router.get('/test', function(req, res){
	res.send('test welcome');
});
module.exports = router;
