// grab packages that we need to use for the model
var mongoose = require('mongoose');
var db 			 = require('../lib/db');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// User Schema
var UserSchema = new Schema({
	name : { type : String, required : true },
	username :  { type: String, lowercase: true, required : true, index : { unique : true }},
	password : { type : String, required : true, select : false },
	image: {
		type: String
	},
	admin : {
		type: Boolean,
		default : false
	},
	blocked : { type : Boolean, default : true }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
	var user = this;

	// hash the password only if the password has been changed or user is new
	if (!user.isModified('password')) return next();

	// generate hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		// change password to hashed version
		user.password = hash;
		next();
	});
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};

UserSchema.methods.isBlocked = function(field){
	return this.blocked;
}

// return model
module.exports = db.model('User', UserSchema);