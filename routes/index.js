var express = require('express');
var router = express.Router();

var Event = require('../models/event.js');
var Family = require('../models/family.js');
var Committee = require('../models/committee.js');
var Cabinet = require('../models/cabinet.js');
var Media = require('../models/media.js');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('home', { layout : false });
});

/* GET login page. */
router.get('/login', function(req, res) {
	res.render('login', { layout: false });
});

/* GET events page. */
router.get('/events', function(req, res){
	var jsonEvents = {};
	Event.find({}, function(err, events){
		if (err){
			throw err;
		}
        jsonEvents['events'] = events;
        jsonEvents['title'] = 'Events';
        res.render('events.handlebars', jsonEvents);
	});
});

/* GET families page. */
router.get('/families', function(req, res) {
	var jsonFamilies = {};
	Family.find({}, function(err, families){
		if (err){
			throw err;
		}
        jsonFamilies['families'] = families;
        jsonFamilies['title'] = 'Families';
        // jsonFamilies['layout'] = 'main.handlebars';
        res.render('families.handlebars', jsonFamilies);
	});
});

/* GET committees page. */
router.get('/committees', function(req, res) {
	var jsonCommittees = {};
	Committee.find({}, function(err, committees){
		if (err){
			throw err;
		}
        jsonCommittees['committees'] = committees;
        jsonCommittees['title'] = 'Committees';
        res.render('committees.handlebars', jsonCommittees);
	});
});

/* GET cabinet page. */
router.get('/cabinet', function(req, res) {
	var jsonCabinet = {};
	Cabinet.find({}, function(err, cabinet){
		if (err){
			throw err;
		}
        jsonCabinet['cabinet'] = cabinet;
        jsonCabinet['title'] = 'Cabinet';
        res.render('cabinet.handlebars', jsonCabinet);
	});
});

/* GET media page. */
router.get('/media', function(req, res) {
	var jsonMedia = {};
	Media.find({}, function(err, media){
		if (err){
			throw err;
		}
        jsonMedia['media'] = media;
        jsonMedia['title'] = 'Media';
        res.render('media.handlebars', jsonMedia);
	});
});

module.exports = router;