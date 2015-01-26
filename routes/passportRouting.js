var express = require('express');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var async = require('async');

var Event = require('../models/event.js');
var Family = require('../models/family.js');
var Committee = require('../models/committee.js');
var Cabinet = require('../models/cabinet.js');
var Media = require('../models/media.js');

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
        var adminJSON = {};
        async.series([
            function(callback){
                Event.find({}, function(err, events){
                    if (err)
                        throw err
                    events.map(function(event){
                        return event['name'];
                    });
                    adminJSON['events'] = events;
                    callback();
                });
            },
            function(callback){
                Family.find({}, function(err, families){
                    if (err)
                        throw err
                    families.map(function(family){
                        return family['name'];
                    });
                    adminJSON['families'] = families;
                    callback();
                });
            },
            function(callback){
                Committee.find({}, function(err, committees){
                    if (err)
                        throw err
                    committees.map(function(committee){
                        return committee['name'];
                    });
                    adminJSON['committees'] = committees;
                    callback();
                });
            },
            function(callback){
                Cabinet.find({}, function(err, cabinet){
                    if (err)
                        throw err
                    cabinet.map(function(member){
                        return member['name'];
                    });
                    adminJSON['cabinet'] = cabinet;
                    callback();
                });
            },
            function(callback){
                Media.find({}, function(err, media){
                    if (err)
                        throw err
                    media.map(function(video){
                        return video['name'];
                    });
                    adminJSON['media'] = media;
                    callback();
                });
            }], function(){
                res.render('admin.handlebars', adminJSON);
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

function adminPost(app, dir){
    app.post('/admin', function(req, res){
        var submitType = req.query.submission;
        var form = new formidable.IncomingForm();

        if(submitType == 'event'){
            var uploadPath = path.join(dir, 'public', 'images', 'event-photos');
            form.parse(req, function(err, fields, files){
                if (err){
                    return res.redirect(303, '/error');
                }
                var photo = files.photo;
                var tmpPath = photo.path;
                var targetPath = path.join(uploadPath, photo.name);
                var cssImgPath = '/images/event-photos/' + photo.name;
                fs.rename(tmpPath, targetPath, function(err){
                    if(err){
                        throw err
                    } else {
                        Event.create({
                        img : cssImgPath,
                        name : fields.name,
                        date : fields.date,
                        info : fields.info
                    });
                    }
                });
            });
        } else if(submitType == 'family'){
            var uploadPath = path.join(dir, 'public', 'images', 'family-photos');
            form.parse(req, function(err, fields, files){
                if (err){
                    return res.redirect(303, '/error');
                }
                var photo = files.photo;
                var tmpPath = photo.path;
                var targetPath = path.join(uploadPath, photo.name);
                var cssImgPath = '/images/family-photos/' + photo.name;

                var parents = fields.parents;
                parents = parents.split(',');
                parents.map(function(el){
                    return el.trim();
                });
                fs.rename(tmpPath, targetPath, function(err){
                    if(err){
                        throw err;
                    } else {
                        Family.create({
                        name : fields.name,
                        img : cssImgPath,
                        parents : parents,
                        info : fields.info
                    });
                    }
                });
            });
        } else if(submitType == 'committee'){
            form.parse(req, function(err, fields, files){
                var projects = fields.projects;
                projects = projects.split(',');
                projects.map(function(el){
                    return el.trim();
                });
                Committee.create({
                    name : fields.name,
                    info : fields.info,
                    projects : projects
                });
            });
        } else if(submitType == 'cabinet'){
            var uploadPath = path.join(dir, 'public', 'images', 'cabinet-photos');
            form.parse(req, function(err, fields, files){
                if (err){
                    return res.redirect(303, '/error');
                }
                var photo = files.photo;
                var tmpPath = photo.path;
                var targetPath = path.join(uploadPath, photo.name);
                var cssImgPath = '/images/cabinet-photos/' + photo.name;

                fs.rename(tmpPath, targetPath, function(err){
                    if(err){
                        throw err;
                    } else {
                        Cabinet.create({
                        name : fields.name,
                        position: fields.position,
                        email : fields.email,
                        bio : fields.bio,
                        img : cssImgPath
                    });
                    }
                });
            });
        } else if(submitType == 'media'){
            form.parse(req, function(err, fields, files){
                Media.create({
                    name : fields.name,
                    youtubeURL : fields.url
                });
            });
        }
        
        res.redirect(303, '/admin');
    });
}

exports.passPassport = passPassport
exports.adminPost = adminPost;