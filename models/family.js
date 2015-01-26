var mongoose = require('mongoose');

var familySchema = mongoose.Schema({
	name : String,
	img : String,
	parents : [String],
	info : String
});

module.exports = mongoose.model('Family', familySchema);