var User   = require('../models/user');

var admin = {
  name: 'Admin',
  username: 'admin',
  password: 'admin',
  confirm_password: 'admin',
  admin: true,
  blocked: false
};

function create(properties){
  var user = new User(properties);

	// save user and error check
	user.save(function(err, u) {
		if (err) {
			// check for duplicate user entry
			if (err.code == 11000) {
        console.log('A User with the username "' + properties.username + '" already exists.')
			} else {
				console.log(err);
			}
      return;
		}
    
    console.log('User "' + properties.username + '" created.');
    return;
	})
};

module.exports = {
  seed: function() {
    create(admin);
  }
}