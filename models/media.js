var mongoose = require('mongoose');

var mediaSchema = mongoose.Schema({
	name : String,
	youtubeURL : String
});

module.exports = mongoose.model('Media', mediaSchema);