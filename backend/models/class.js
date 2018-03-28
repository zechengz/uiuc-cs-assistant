var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
	name: {type: String, require: true},
	avatar: {type: String, require: true},
	description: {type: String, require: true},
	field: {type: String, require: true},
	professors: [{name: String, semester: String}],
	avgGPA: {type: Number, require: true},
	followers: [{type: String}],
	size: {type: Number, require: true},
	hotness: {type: Number, require: true},
	alumniReq: [{id: String, score: Number}],
	
	dateCreated: {type: Date, default: Date.now}
	// more to add
});

module.exports = mongoose.model('Class', classSchema);
