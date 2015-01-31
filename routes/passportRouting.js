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

var modelMap = {
    'Event' : Event,
    'Family' : Family,
    'Committee': Committee,
    'Cabinet': Cabinet,
    'Media': Media
}

function passPassport(app, passport){
	app.get('/login', function(req, res) {
        res.render('login.handlebars', { message: req.flash('loginMessage'), layout: false }); 
    });
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/admin',
		failureRedirect : '/login',
		failureFlash : true
	}));
    app.get('/signup', function(req, res) {
        res.render('signup.handlebars', { message: req.flash('signupMessage'), layout: false });
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
                    adminJSON['events'] = events;
                    callback();
                });
            },
            function(callback){
                Family.find({}, function(err, families){
                    if (err)
                        throw err
                    adminJSON['families'] = families;
                    callback();
                });
            },
            function(callback){
                Committee.find({}, function(err, committees){
                    if (err)
                        throw err
                    adminJSON['committees'] = committees;
                    callback();
                });
            },
            function(callback){
                Cabinet.find({}, function(err, cabinet){
                    if (err)
                        throw err
                    adminJSON['cabinet'] = cabinet;
                    callback();
                });
            },
            function(callback){
                Media.find({}, function(err, media){
                    if (err)
                        throw err
                    adminJSON['media'] = media;
                    callback();
                });
            }], function(){
                adminJSON['layout'] = false;
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

function adminAJAX(app, dir){
    app.post('/admin', function(req, res){
        var submitType = req.query.submission;
        var form = new formidable.IncomingForm();
        var responseObj;

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
                        responseObj = {
                            img : cssImgPath,
                            name : fields.name,
                            date : fields.date,
                            info : fields.info
                        }
                        Event.create(responseObj);
                        res.json(JSON.stringify(responseObj));
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
                var arr = [];

                for (var i in parents){
                    var str = parents[i].trim();
                    arr.push({parent: str});
                }

                fs.rename(tmpPath, targetPath, function(err){
                    if(err){
                        throw err;
                    } else {
                        responseObj = {
                            name : fields.name,
                            img : cssImgPath,
                            parents : arr,
                            info : fields.info
                        }
                        Family.create(responseObj);
                        res.json(JSON.stringify(responseObj));
                    }
                });
            });
        } else if(submitType == 'committee'){
            form.parse(req, function(err, fields, files){
                var projects = fields.projects;
                projects = projects.split(',');
                var arr = [];

                for(var i in projects){
                    var str = projects[i].trim();
                    arr.push({project: str});
                }
                responseObj = {
                    name : fields.name,
                    info : fields.info,
                    projects : arr
                }
                Committee.create(responseObj);
                res.json(JSON.stringify(responseObj));
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
                        responseObj = {
                            name : fields.name,
                            position: fields.position,
                            email : fields.email,
                            bio : fields.bio,
                            img : cssImgPath
                        }
                        Cabinet.create(responseObj);
                        res.json(JSON.stringify(responseObj));
                    }
                });
            });
        } else if(submitType == 'media'){
            form.parse(req, function(err, fields, files){
                var embedLink = 'https://www.youtube.com/embed/' + fields.url;
                responseObj = {
                    name : fields.name,
                    youtubeURL : embedLink
                }
                Media.create(responseObj);
                res.json(JSON.stringify(responseObj));
            });
        }
    });
    app.delete('/admin', function(req, res){
        modelMap[req.body.model].find({name: req.body.name}).remove().exec();
        res.json({success:true});
    });
};

exports.passPassport = passPassport
exports.adminAJAX = adminAJAX;