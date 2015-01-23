var express = require('express');


var sample = {
	title: 'Events',
	events: [
		{
			eventImg: '/images/test.jpg',
			eventTitle: 'LanB4Time',
			eventDate: 'Nov 14th',
			eventDescription: 'join us for an epic lan'
		},
		{
			eventImg: '/images/test1.jpg',
			eventTitle: 'brunch',
			eventDate: 'Nov 24th',
			eventDescription: 'join us for an epic brunch'
		},
	],
};

var sample1 = {
	families : [
		{
			name : 'tripi',
		},
		{
			name : 'kkk'
		},
		{
			name : 'wargame'
		}
	]
}

/* GET home page. */
function home(req, res) {
  res.render('home.handlebars', sample);
};

/* GET login page. */
function login(req, res) {
	res.render('login.handlebars');
}

function families(req, res) {
	res.json(sample1);
};

function passPassport(app, passport){

}

// router.get('/committees', function(req, res) {
//   res.render('committees.handlebars');
// });

// router.get('/cabinet', function(req, res) {
//   res.render('cabinet.handlebars');
// });

// router.get('/media', function(req, res) {
//   res.render('media.handlebars');
// });

exports.home = home;
exports.login = login;
exports.families = families;
exports.passPassport = passPassport;