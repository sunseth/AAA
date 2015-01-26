var mongoose = require('mongoose');

var cabinetSchema = mongoose.Schema({
	name : String,
	position : String,
	email: String,
	bio : String,
	img : String
});

module.exports = mongoose.model('Cabinet', cabinetSchema);