var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userScheMa = new Schema({
	username:String,
	password:String
});
exports.user = mongoose.model('users', userScheMa);
