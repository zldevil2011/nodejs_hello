var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adminScheMa = new Schema({
	username:String,
	password:String,
    priority:String
});
exports.admin = mongoose.model('admins', adminScheMa);
