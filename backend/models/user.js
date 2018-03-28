var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
    name: {type: String, require: true},
    avatar: {type: String, require: false},
    email: {type: String, require: true},
    year: {type: String, require: false},
    personalDescription: {type: String, require: false},
    password: {type: String, require: true},
    classTaken: [{type: String}],
    direction: {type: String, require: false},
    GPA: {type: Number, require: false},
    userPlan: [{semester: {type:String, default: "Fall 2017"}, courses: [{type: String}]}],
    organization: {type: String, require: false},
    research: {type: String, require: false}, //?
    followedClass: [{type: String}],
    experience: {type:[String], default:["Javascript"]}, // list of skills/experience
    friends: [String], // list of user id
    // more to add
    notifications: {type: [String], default: ["Welcome to our APP!", "Spring 2018 Registration started!"]},
    goals: [{goal: {type: String, default: "First Goal"}, inProgress: {type: Boolean, default: false}}],

    dateCreated: {type: Date, default: Date.now}
});


// password encryption function
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// password matching function
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
