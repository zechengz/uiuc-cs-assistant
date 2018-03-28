module.exports = function (app, router) {
	// add local api routes here
	app.use ('/api/user', require ('./user.js'));
	app.use ('/api/class', require ('./class.js'));
	app.use ('/api/field', require ('./field.js'));
}