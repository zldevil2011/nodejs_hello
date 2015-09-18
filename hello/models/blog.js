var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	blog_author:String, 
	blog_title:String, 
	blog_content:String,
    blog_time:Date
});

exports.blog = mongoose.model('blogs', blogSchema);