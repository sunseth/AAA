var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash    = require('connect-flash');
var configDB = require('./config/database.js');

var routes = require('./routes/index');
var passportRoute = require('./routes/passportRouting');
var users = require('./routes/users');

var app = express();
app.set('port', process.env.PORT || 5000);

//Mongoose DB connection
var opts = {
    server: {
        socketOptions: {
            keepAlive : 1
        }
    }
};
mongoose.connect(configDB.url, opts);
require('./config/passport')(passport); // pass passport for configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(compression({threshold: 512}));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'koreanBBQ' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routing for admin page
passportRoute.passPassport(app, passport);
passportRoute.adminAJAX(app, __dirname);
// routing for main app pages
app.use('/', routes);
app.use('/events', routes);
app.use('/families', routes);
app.use('/committees', routes);
app.use('/cabinet', routes);
app.use('/media', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port'));
});

module.exports = app;
