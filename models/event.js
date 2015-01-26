var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	img : String,
	name : String,
	date : String,
	info : String
});

module.exports = mongoose.model('Event', eventSchema);