var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	eventImg: String,
	eventTitle: String,
	eventDate: String,
	eventDescription: String
});

module.exports = mongoose.model('Event', eventSchema);