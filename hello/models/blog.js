var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	author:String, 
	title:String, 
});

exports.blog = mongoose.model('blogs', blogSchema);