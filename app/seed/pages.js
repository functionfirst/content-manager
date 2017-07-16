var Page   = require('../models/page');

function create(properties) {
  var page = new Page(properties);

	page.save(function(err) {
		if(err) {
      // check for duplicate user entry
			if (err.code == 11000) {
        console.log('A page with the name "' + properties.name + '" already exists.')
			} else {
        console.log(err);
      }
      return;
    }

    console.log('Page created');
	});
}

module.exports = {
  seed: function() {
    create({
      name:    'Welcome',
      content: 'This is the page content, highlight to begin editing'
    });
  }
};