const express = require ('express');
const router = express.Router();
const path = require ('path');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const reload = require('reload');

// create express app
const app = express ();
app.server = require('http').createServer(app);

var io = require('socket.io')(app.server);

// body parser set up
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// MongoDB setup
const connections = require ('./backend/config/config.js');
mongoose.connect (connections.mongodb_url, {useMongoClient: true});


// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);


// use static folder
app.use (express.static ('public'));
app.use (express.static ('public/assets'));

/*
	endpoints
*/
/*
app.get ('/user', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

app.get ('/class_profile', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});
*/

app.get ('/profile', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

app.get ('/settings', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

// for test purpose
app.get ('/user_profile', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

app.get ('/status', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

app.get ('/login', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

app.get ('/register', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

app.get ('/track', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

app.get ('/', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

// Deprecated: switch to connection pool
// try to maintain mysql connections
// NOTE: mysql connection will timeout when idle
// const mysqldb = require('./backend/lib/mysqldb');
// setInterval(function () {
//     mysqldb.query('SELECT 1');
// }, 5000);

require ('./backend/routes')(app, router);

var port = 55555;

// listen on server port
app.server.listen (port, function() {
	console.log ("Server is running on localhost:" + port + "/");
});

var name = null;
io.on('connection', (socket) => {
  if (name === null) {
    socket.emit('refresh', 'refresh');
    name = socket.id;
  }
});

// reload(app);
