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

function events(req, res){
	res.json(sample);
}

function families(req, res) {
	res.json(sample1);
};

function passPassport(app, passport){
	app.get('/login', function(req, res) {
        res.render('login.handlebars', { message: req.flash('loginMessage') }); 
    });
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/admin',
		failureRedirect : '/login',
		failureFlash : true
	}));
    app.get('/signup', function(req, res) {
        res.render('signup.handlebars', { message: req.flash('signupMessage') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
    	successRedirect : '/admin',
    	failureRedirect : '/signup',
    	failureFlash : true
    }));
	app.get('/admin', isLoggedIn, function(req, res){
		res.render('admin.handlebars', {

		});
	});

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
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
exports.events = events;