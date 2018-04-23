const user = require ('../models/user');
const express = require ('express');
const router = express.Router ();
const mysqldb = require('../lib/mysqldb');
const sqlLoader = require('../lib/sql-loader');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10; // hashing purpose

const sql = sqlLoader.loadSqlEquiv(__filename);

// server messages
const serverErrorMsg = 'Internal Server Error';
const notFoundMsg = 'Not Found';
const duplicateEmailMsg = 'Email Address Exist';
const invalidPasswordMsg = 'Invalid Password';
const badRequestMsg = 'Bad Request';

const Promise = require('bluebird')
const PythonShell = require('python-shell');
require('babel-polyfill');

router.get('/getAdv1', async function(req, res) {
	let class_data = undefined;
	await new Promise((resolve, reject) => {
		mysqldb.query(sql.getAllClassRecord, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		})
	}).then(result => {
		console.log('We have the data.');
		var data = '';
		for (var i = 0; i < result.length; i++) {
			var str = '';
			var item = result[i];
			str += item.yearTerm + ';';
			str += item.class + ';';
			str += item.instructor + ';';
			str += item.studentNum.toString() + ';';
			str += item.aveGPA.toString() + '\n';
			data += str;
		}
		class_data = data;
	}).catch(error => {
		console.log('Error On Get Enrolled Class');
		console.error(err);
		return res.status (500).send ({
			message: serverErrorMsg,
			data: null
		});
	});
	new Promise((resolve, reject) => {
		var shell = PythonShell.run('./backend/py/hin.py', {
			args: [req.query.direction, class_data],
		}, (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
		shell.on('message', (msg) => {
			console.log(msg);
		});
	}).then((result) => {
		return res.status (200).send ({
			message: 'OK',
			data: result
		});
	}).catch((error) => {
		console.error(error);
		return res.status (500).send ({
			message: serverErrorMsg,
			data: null
		});
	});
});

router.get('/getAdv2', async function(req, res) {
	let class_data = undefined;
	await new Promise((resolve, reject) => {
		mysqldb.query(sql.getAllClassRecord, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		})
	}).then(result => {
		console.log('We have the data.');
		var data = '';
		for (var i = 0; i < result.length; i++) {
			var str = '';
			var item = result[i];
			str += item.yearTerm + ';';
			str += item.class + ';';
			str += item.instructor + ';';
			str += item.studentNum.toString() + ';';
			str += item.aveGPA.toString() + '\n';
			data += str;
		}
		class_data = data;
	}).catch(error => {
		console.log('Error On Get Enrolled Class');
		console.error(err);
		return res.status (500).send ({
			message: serverErrorMsg,
			data: null
		});
	});
	new Promise((resolve, reject) => {
		PythonShell.run('./backend/py/hin1.py', {
			args: [req.query.direction, class_data],
		}, (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	}).then((result) => {
		return res.status (200).send ({
			message: 'OK',
			data: result
		});
	}).catch((error) => {
		console.error(error);
		return res.status (500).send ({
			message: serverErrorMsg,
			data: null
		});
	});
});

router.get('/getAdv3', async function(req, res) {
	let class_data = undefined;
	await new Promise((resolve, reject) => {
		mysqldb.query(sql.getAllClassRecord, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		})
	}).then(result => {
		console.log('We have the data.');
		var data = '';
		for (var i = 0; i < result.length; i++) {
			var str = '';
			var item = result[i];
			str += item.yearTerm + ';';
			str += item.class + ';';
			str += item.instructor + ';';
			str += item.studentNum.toString() + ';';
			str += item.aveGPA.toString() + '\n';
			data += str;
		}
		class_data = data;
	}).catch(error => {
		console.log('Error On Get Enrolled Class');
		console.error(err);
		return res.status (500).send ({
			message: serverErrorMsg,
			data: null
		});
	});
	new Promise((resolve, reject) => {
		PythonShell.run('./backend/py/frequentPattern.py', {
			args: [req.query.direction, class_data],
		}, (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	}).then((result) => {
		return res.status (200).send ({
			message: 'OK',
			data: result
		});
	}).catch((error) => {
		console.error(error);
		return res.status (500).send ({
			message: serverErrorMsg,
			data: null
		});
	});
});

router.get('/getAdv4', async function(req, res) {
	let class_data = undefined;
	await new Promise((resolve, reject) => {
		mysqldb.query(sql.getAllClassRecord, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		})
	}).then(result => {
		console.log('We have the data.');
		var data = '';
		for (var i = 0; i < result.length; i++) {
			var str = '';
			var item = result[i];
			str += item.yearTerm + ';';
			str += item.class + ';';
			str += item.instructor + ';';
			str += item.studentNum.toString() + ';';
			str += item.aveGPA.toString() + '\n';
			data += str;
		}
		class_data = data;
	}).catch(error => {
		console.log('Error On Get Enrolled Class');
		console.error(err);
		return res.status (500).send ({
			message: serverErrorMsg,
			data: null
		});
	});
	new Promise((resolve, reject) => {
		PythonShell.run('./backend/py/frequentPattern1.py', {
			args: [req.query.direction, class_data],
		}, (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	}).then((result) => {
		return res.status (200).send ({
			message: 'OK',
			data: result
		});
	}).catch((error) => {
		console.error(error);
		return res.status (500).send ({
			message: serverErrorMsg,
			data: null
		});
	});
});

router.get('/allUserAvgGPA', function(req, res) {
	mysqldb.query(sql.getAllUserAvgGPA, (err, users) => {
		if (err) {
			console.log('Error On Get User Avg GPA');
			return res.status (500).send ({
				message: serverErrorMsg,
				data: null
			});
		} else {
			userList = [];
			avgGPAList = [];
			for (var i = 0; i < users.length; i++) {
				userList.push(users[i]['email']);
				avgGPAList.push(users[i]['AVG(e.gpa)']);
			}
			retObj = {userList: userList, avgGPAList: avgGPAList};
			// console.log(retObj);
			return res.status (200).send ({
				message: 'OK',
				data: retObj
			});
		}
	});
});

router.get('/trackAvgGPA', function(req, res) {
	mysqldb.query(sql.getTrackAvgGPA, (err, tracks) => {
		if (err) {
			console.log('Error On Get Track Avg GPA');
			return res.status (500).send ({
				message: serverErrorMsg,
				data: null
			});
		} else {
			trackList = [];
			avgGPAList = [];
			for (var i = 0; i < tracks.length; i++) {
				trackList.push(tracks[i].track);
				avgGPAList.push(tracks[i]['AVG(e.gpa)']);
			}
			retObj = {trackList: trackList, avgGPAList: avgGPAList};
			// console.log(retObj);
			return res.status (200).send ({
				message: 'OK',
				data: retObj
			});
		}
	});
});

// get classes for tracks
router.get('/trackCourse', function(req, res) {
 	if (req.query.track === undefined) {
 		console.log("Track must be specified");
  		return res.status (400).send ({
			message: badRequestMsg,
			data: null
		});
	} else {
		mysqldb.query(sql.getTrackClass, { u_track: req.query.track }, (err, tracks) => {
			if (err) {
				console.log('Error On Get Track Class');
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				var trackClasslist = [];
				for (var i = 0; i < tracks.length; i++) {
					trackClasslist.push(tracks[i].class);
				}
				return res.status (200).send ({
					message: 'OK',
					data: trackClasslist
				});
			}
		})
	}
});



// get user taken course
router.get('/takenCourse', function(req, res) {
 	if (req.query.email === undefined) {
 		console.log("User email must be specified");
  		return res.status (400).send ({
			message: badRequestMsg,
			data: null
		});
	} else {
		mysqldb.query(sql.getUserTakenClass, { u_email: req.query.email }, (err, classes) => {
			if (err) {
				console.log('Error On Get Enrolled Class');
				console.error(err);
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				var classlist = [];
				var gpalist = [];
				for (var i = 0; i < classes.length; i++) {
					classlist.push(classes[i].class);
					gpalist.push(classes[i].gpa)
				}
				retObj = {classes:classlist, gpa: gpalist};
				return res.status (200).send ({
					message: 'OK',
					data: retObj
				});
			}
		})
	}
});

// enter course
router.post('/course', function(req, res) {
	if (req.query.email === undefined) {
		console.log ("User email must be specified");
		return res.status (400).send ({
			message: badRequestMsg,
			data: null
		});
	} else {
		// insert to enrollment table
		mysqldb.query(sql.addClass, {
			u_email: req.query.email,
			u_class: req.body.class,
			u_gpa: req.body.gpa
		}, (err, gpa) => {
			if (err) {
				console.log('Error On Query - Insert Class GPA');
				return res.status(500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				return res.status(200).send ({
					message: 'OK',
					data: null
				});
			}
		});
	}
});

// query to display goals
router.get('/goals', function(req, res) {
	// console.log(req.query.email);
	if (req.query.email === undefined) {
		console.log ("User email must be specified");
		return res.status (400).send ({
			message: badRequestMsg,
			data: null
		});
	} else {
		mysqldb.query(sql.get_goals, { u_email: req.query.email }, (err, goals) => {
			if (err) {
				console.log('Error On Get Goals');
				console.error(err);
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				// console.log(goals);
				var goalList = [];
				for (var i = 0; i < goals.length; i++) {
					goalList.push(goals[i].message);
				}
				return res.status (200).send ({
					message: 'OK',
					data: goalList
				});
			}
		});
	}
});

// delete goal list
router.put('/goals', function(req, res) {
	console.log('Delete User Message');
	console.log(req.query.email);
	if (req.query.email === undefined) {
		console.log ("User email must be specified");
		return res.status (400).send ({
			message: badRequestMsg,
			data: null
		});
	} else {
		mysqldb.query(sql.deleteRow, {
			u_email: req.query.email,
			u_message: req.body.message
		}, (err, goals) => {
			if (err) {
				console.log('Error On Get Goals');
				return res.status(500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				return res.status(200).send ({
					message: 'OK',
					data: null
				});
			}
		});
	}
});

// delete goals
router.post('/goals', function(req, res) {
	console.log('Insert User Message');
	console.log(req.query.email);
	if (req.query.email === undefined) {
		console.log ("User email must be specified");
		return res.status (400).send ({
			message: badRequestMsg,
			data: null
		});
	} else {
		mysqldb.query(sql.insertRightEvent, {
			u_email: req.query.email,
			u_message: req.body.message
		}, (err, goals) => {
			if (err) {
				console.log('Error On Get Goals');
				return res.status(500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				return res.status(200).send ({
					message: 'OK',
					data: null
				});
			}
		});
	}
});

// update sunday 22
router.get ("/info", function (req, res) {
	if (req.query.partialName !== undefined) {
		console.log('partial');
		console.log (req.query.partialName);
		// search users using partial user name
		return res.status (500).send ({
			message: serverErrorMsg,
			data: null
		});
	} else {
		if (req.body.email === undefined) { // no email
			if (req.query.email === undefined) {
				console.log ("User email must be specified");
				return res.status (400).send ({
					message: badRequestMsg,
					data: null
				});
			} else {
				// for postman test
				var usrEmail = req.query.email;
			}
		} else { // email exist
			var usrEmail = req.body.email;
		}
		console.log('Getting user info. Email: ' + usrEmail);
		mysqldb.query(sql.find_user_password, { u_email: usrEmail }, (err, user) => {
			if (err) {
				console.error('Database error, return status code - 500...');
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else if (user.length === 0) {
				console.error('Did not find any user infomation, return status code - 404...');
				return res.status (404).send ({
					message: notFoundMsg,
					data: null
				});
			} else {
				// console.log(user);
				return res.status (200).send ({
					message: 'OK',
					data: user
				});
			}
		});

		/*
		user.find ({"email": usrEmail}, '-_id -password', function (err, users) {
			if (err) {
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				if (users === null) {
					return res.status (404).send ({
						message: notFoundMsg,
						data: null
					});
				} else {
					return res.status (200).send ({
						message: 'OK',
						data: users
					});
				}
			}
		});
		*/
	}
});

/**
 * User Login
**/
router.post("/login", function (req, res) {
	if (req.body.email === undefined || req.body.password === undefined) {
		// find all user request
		if (req.body.partialName === undefined) {
			return res.status (400).send ({
				message: badRequestMsg,
				data: null
			});
		} else {
			console.log('partial');
			// unhandled condition
			return res.status (500).send ({
				message: serverErrorMsg,
				data: null
			});
		}
	} else {
		mysqldb.query(sql.find_user_password, { u_email: req.body.email }, (err_0, user) => {
			if (err_0) {
				console.log(err_0);
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else if (user.length === 0) { // give specified email not found
				console.log('Email: ' + req.body.email + 'NOT FOUND');
				return res.status (404).send ({
					message: notFoundMsg,
					data: null
				});
			} else {
				// console.log('user hash');
				// console.log(user[0].password);
				bcrypt.compare(req.body.password, user[0].password, (err_1, isMatch) => {
					if (err_1) {
						console.error("Error on Compare Two Passwords");
						console.error(err_1);
						return res.status (500).send ({
							message: serverErrorMsg,
							data: null
						});
					} else if (isMatch === false) {
						console.error('Incorrect Password');
						return res.status (401).send ({
							message: invalidPasswordMsg,
							data: null
						});
					} else {
						console.log('Login Success');
						return res.status (200).send ({
							message: 'OK',
							data: user
						});
					}
				});
			}
		});
	}
});

/**
 *  Create New User
**/
router.post ("/", function (req, res) {
	mysqldb.query(sql.check_user_email, { u_email: req.body.email }, (err_0, rows) => {
		// query error
		if (err_0) {
			console.error("Error On Query - Check Duplicate User Email");
			console.error(err);
			return res.status (500).send ({
				message: serverErrorMsg,
				data: null
			});
		} else if (rows.length !== 0) { // duplicate email address
			console.error("Duplicate Email Address");
			return res.status (400).send ({
				message: duplicateEmailMsg,
				data: null
			});
		} else { // encrypt user password
			bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
				if (err) {
					console.error("Error On Generates Salt");
					console.error(err);
					return res.status (500).send ({
						message: serverErrorMsg,
						data: null
					});
				}
				bcrypt.hash(req.body.password, salt, function(err_1, hash) {
					// store hash in database
					if (err_1) {
						console.error("Error On Hashing Password");
						console.error(err_1);
						return res.status (500).send ({
							message: serverErrorMsg,
							data: null
						});
					}

					const params = {
						u_name: req.body.name,
						u_email: req.body.email,
						u_password: hash,
						u_year: req.body.year,
						u_direction: req.body.direction,
						u_avatar: req.body.avatar
					};
					console.log('Params:');
					console.log(params);

					mysqldb.query(sql.create_user, params, (err_2, result) => {
						if (err_2) {
							console.error('Error On Query - Create User');
							console.error(err_2);
							return res.status (500).send ({
								message: serverErrorMsg,
								data: null
							});
						}
						console.log('Create User Success');
						return res.status (201).send ({
							message: 'OK',
							data: result
						});
					});
				});
			});
		} // end else statement
	}); // end sql.check_user_email
});

// update user
router.put ("/", function (req, res) {
    console.log (req.body.email);
	if (req.body.email !== undefined) {
		var userEmail = req.body.email;
	} else {
		var userEmail = req.query.email;
	}
	if (userEmail === undefined) {
		console.log ("User Email must be specified");
		return res.status (400).send ({
			message: badRequestMsg,
			data: null
		});
	} else {
		console.log ("Find user by email:" + userEmail);
		var nUser = Object.assign ({}, req.body);
		console.log(req.body);
		console.log(nUser);
		mysqldb.query(sql.update_user_setting, {
			u_email: userEmail,
			u_year: req.body.year,
			u_direction: req.body.direction
		}, (err, result) => {
			if (err) {
				console.error('Error On Query - Update User');
				console.error(err);
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				console.log('Update Setting User Success');
				return res.status(200).send ({
					message: 'Ok',
					data: null
				});
			}
		});
		/*
		user.update ({email: userEmail}, nUser, function (err, nUser) {
			if (err) {
				return res.status (500).send ({
					message: serverErrorMsg,
					data: null
				});
			} else {
				if (nUser === null) {
					return res.status (404).send ({
						message: notFoundMsg,
						data: null
					})
				} else {
					return res.status (200).send ({
						message: 'OK',
						data: nUser
					});
				}
			}
		});
		*/
	}
});

module.exports = router;
