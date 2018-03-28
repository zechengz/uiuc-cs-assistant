const fieldCollection = require ('../models/field.js');
const express = require ('express');
const router = express.Router ();

// server messages
const serverErrorMsg = 'Internal Server Error';
const notFoundMsg = 'Not Found';
const invalidPasswordMsg = 'Invalid Password';
const badRequestMsg = 'Bad Request';

router.get ("/", function (req, res) {
	if (req.query.partialName === undefined) {
		// return all classes
		fieldCollection.find ({}, function (err, cls) {
			if (err) {
				console.log (err);
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				if (cls !== null) {
					return res.status (200).send ({
						message: 'OK',
						data: cls
					});
				} else {
					return res.status (404).send ({
						message: notFoundMsg,
						data: null
					});
				}
			}
		});
	} else {
		// using partial name to find autocomplete suggestion case
		fieldCollection.find ({
			"name": {
				"$regex": req.query.partialName,
				"$options": "i"
			}
		}, function (err, cls) {
			if (err) {
				console.log (err);
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				if (cls !== null) {
					return res.status (200).send ({
						message: 'OK',
						data: cls
					});
				} else {
					return res.status (404).send ({
						message: notFoundMsg,
						data: null
					});
				}
			}
		});
	}
});

router.post ("/", function (req, res) {
	var nClass = Object.assign ({}, req.body);
	fieldCollection.create (nClass, function (err, result) {
		if (err) {
			console.log (err);
			return res.status (500).send ({
					message: serverErrorMsg,
					data: null
			});
		} else {
			return res.status (201).send ({
				message: 'OK',
				data: result
			});
		}
	});
});

module.exports = router;