var mongoose = require('mongoose');

var committeeSchema = mongoose.Schema({
	name : String,
	info : String,
	projects : Object
});

module.exports = mongoose.model('Committee', committeeSchema);