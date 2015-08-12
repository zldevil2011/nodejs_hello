var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require("../models/user").user
var blog = require("../models/blog").blog

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
	res.render('login', { title : 'login'});
});

/* logout */
router.get('/logout', function(req, res){
	res.render('logout', { title : 'logout' })
});

router.post('/view_blog', function(req, res){
	console.log("get info: ");
	console.log(req.body.blog_author);
	console.log(req.body.blog_title);
	var query_doc = {author:req.body.blog_author, title:req.body.blog_title};
	// var query_doc = {userid:req.body.blog_title, password:req.body.blog_body};
	console.log(query_doc);
	(function(){
		console.log(query_doc);
		// console.log(blog.find());
		blog.find(query_doc, function(err, doc){
			console.log(query_doc);
			if(!err){
				console.log(doc);
    			console.log(doc[0]);
    			console.log(doc[0].author);
				console.log("fine, it is here");
				res.render('blog', {blog: doc, title:"blog_info"});
			}else{
				console.log("failed to count");
			}
		});
	})(query_doc);
});

/* homepage */
router.post('/homepage', function(req, res){
	var query_doc = {userid:req.body.userid, password:req.body.password};
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

// edit_blog
router.get('/edit_blog', function(req, res){
	res.render('edit_blog', { title : '创建新的博客' })
});
// Save blog
router.post('/save_blog', function(req, res){
	console.log("save_blog");
	var query_doc = {author: "admin", title:req.body.blog_title, content:req.body.blog_body};
	console.log(query_doc);
	(function(){
		blog.insert(query_doc, {safe:true}, function(err, result) {
			if(!err){
				console.log(doc);
				return "success";
			}
			else{
				console.log("failed");
				return "failed";
			}
		});
		// blog.insert(query_doc, function(err, doc){
		// 	if(!err){
		// 		console.log(doc);
		// 		return "success";
		// 	}
		// 	else{
		// 		return "failed";
		// 	}
		// });
	})(query_doc);
});


router.get('/test', function(req, res){
	res.send('test welcome');
});
module.exports = router;
