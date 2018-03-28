var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');


//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://yumochi2:ZiQiangBuXi42@ds115436.mlab.com:15436/cs498rkfinal';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

////////// My code is different here
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(express.static('../../../public/'));
app.use(express.static('../../assets/'));
app.use(express.static('./bootstrap-4.0.0-beta.2-dist/'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.route('/home').get(function(req, res) {
  return res.sendFile(path.join(__dirname, '../../index.html'));
});
app.route('/status').get(function(req, res) {
  return res.sendFile(path.join(__dirname, '../../index.html'));
});


// view engine setup
////////// My code is different here
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}))
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
    secret: 'work hard',
    saveUninitialized: true,
    resave: true
}));

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return{
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// connect Flash
app.use(flash())

// Global vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

// app.use('/', index);
app.use('/users', users);


module.exports = app;
