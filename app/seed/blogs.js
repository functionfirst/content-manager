var Blog   = require('../models/blog');

function create(properties) {
  var blog = new Blog(properties);

	blog.save(function(err) {
		if(err) {
      // check for duplicate entry
			if (err.code == 11000) {
        console.log('A blog with the name "' + properties.title + '" already exists.')
			} else {
        console.log(err);
      }
      return;
    }

    console.log('Blog created');
	});
}

module.exports = {
  seed: function() {
    create({
      title:         'Welcome to the Content Manager',
      content:   'This is the blog content'
    });
  }
};