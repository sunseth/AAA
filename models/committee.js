var mongoose = require('mongoose');

var committeeSchema = mongoose.Schema({
	name : String,
	info : String,
	projects : [String]
});

module.exports = mongoose.model('Committee', committeeSchema);