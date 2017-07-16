var config 		= require('../../config');
var extTypes 	= require('../lib/extTypes');
var User 		= require('../models/user');
var S3FS 		= require('s3fs');
var fs 			= require('fs');
var validator 	= require('validator');
var mail 		= require('../lib/mail');
var nconf 		= require('nconf');

var aws 		= config.aws;

var users = {
	me: me,
	list:list,
	create:create,
	view:view,
	update:update,
	upload:upload
};

module.exports = users;


/////


// get user information
function me(req, res) {
	res.send(req.decoded);
};

// view all users
function list(req, res){
	User.find({}, null, { sort: 'name'}, function(err, user) {
		if (err) res.send(err);

		res.json(user);
	});
};

// create user
function create(req, res){
	// create new instance of user model
	var user = new User();

	// set the user information (from the request)
	user.name 				= req.body.name;
	user.username 			= req.body.username;
	user.password 			= req.body.password;
	user.confirm_password 	= req.body.confirm_password;

	// VALIDATION
	if(validator.isNull(user.name)) {
		return throwValidationError('Please enter your Name.', res);
	}

	if(validator.isNull(user.username)) {
		return throwValidationError('Please enter your email address.', res);
	}

	if(validator.isNull(user.password)) {
		return throwValidationError('Please enter a password', res);
	}

	if(validator.isNull(user.confirm_password)) {
		return throwValidationError('Please confirm your password.', res);
	}

	if(!validator.equals(user.password, user.confirm_password)) {
		return throwValidationError('Please ensure your passwords match.', res);
	}

	// save user and error check
	user.save(function(err, u) {
		if (err) {
			// check for duplicate user entry
			if (err.code == 11000) {
				return res.json({ success : false, error : 'A User with that username already exists.'});
			} else {
				return res.send(err);
			}
		}

		// Send email confirmation to admin
		// sendNewUserSignup(user.name, user.username, u._id);

		res.json({ success : true, message : 'User created' });
	})
};


// Retrieve single user
function view(req, res) {
	User.findById(req.params.user_id, function(err,user) {
		if (err) res.send(err);

		res.json(user);
	});
};

// Update single user information
function update(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) return res.send(err);

		if (req.body.name) user.name = req.body.name;
		if (req.body.password) user.password = req.body.password;

		user.blocked	= req.body.blocked;
		user.image 		= req.body.image;

		user.save(function(err, user) {
			if (err) return res.send(err);

			res.json({ message : "User Updated" });
		})
	})
};

function upload(req, res) {
	// Check AWS is configured
	if(!aws) {
		res.json({
			error: 'Image upload is not enabled for this system.'
		});

		return;
	}

	// S3FS implementation
	s3fsImpl = new S3FS(aws.bucket, {
		accessKeyId : aws.accessKeyId,
		secretAccessKey : aws.secretAccessKey
	});


	// Upload image
	var file = req.file;
	var filename = file.filename + '_' + file.originalname
	var contentType = extTypes.getContentType(filename);

	// Create file stream
	var stream = fs.createReadStream(file.path);

	// writefile calls putObject behind the scenes
	s3fsImpl.writeFile(filename, stream, { "ContentType" : contentType }).then(function(){
		fs.unlink(file.path, function(err) {
			if (err) return res.send(err);

			// Update user with new image
			User.findById(req.params.user_id, function(err, user) {
				if (err) return res.send(err);

				if (filename) user.image = filename;

				user.save(function(err, user) {
					if (err) return res.send(err);

					res.json({
						message: filename + ' successfully uploaded to the server',
						filename : filename
					});
				});
			});
		});
	});
}

function throwValidationError(msg, res) {
	return res.json({
		success : false,
		error : msg
	});
}

// function sendNewUserSignup(name, email, uid) {
// 	var uid_link = 'https://www.functionfirst.co.uk/users/' + uid
// 	var mailOptions = {
// 		from : name + " <" + email + ">",
// 		to: 'alan@functionfirst.co.uk',
// 		subject : name + ' - New Account Request',
// 		text : 'A new user has signed up.\r\nName: ' + name + '\r\n' + uid_link,
// 		html : '<p>A new user has signed up.</p><p>Name: ' + name + '</p><p><a href="' + uid_link + '">' + uid_link + '</a></p>'
// 	}

// 	mail.sendMail(mailOptions, function(error, info) {
// 		if(error) {
// 			return console.log(error);
// 		}
// 		console.log('Message sent' + info.response);
// 	});
// }