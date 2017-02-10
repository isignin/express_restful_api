//app/model/member.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
	name: String,
	email: String
});

memberSchema.statics.findByName = function(name, cb) {
	return this.findOne({name: new RegExp(name, 'i')}, cb);
};

module.exports = mongoose.model('Member', memberSchema);

