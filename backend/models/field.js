var mongoose = require('mongoose');

var fieldSchema = mongoose.Schema({
	name: {type: String, require: true},
	fieldImg: {type: String, require: true},
	courses: [String],
	hotness: Number,
	alumniReq: [{id: String}],
	follower: [String], // list of user id
	experts: [String], // list of user id
	// more to add

	dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Field', fieldSchema);