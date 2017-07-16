var config 	= require('../../config');
var Blog   	= require('../models/blog');
var User   	= require('../models/user');

var blogs = {
	list: list,
	create: create,
	view: view,
	update: update,
	remove: remove
};

module.exports = blogs;

/////


// List all blogs
function list(req, res) {
	var filter = {};
	var fields = 'title content slug comments created_at modified_at';
	var sort  = { sort: '-created_at' };

	if(req.query) {
		filter = req.query;
	}

  	Blog.find(filter, fields, sort, function(err, blogs) {
    	if(err) res.send(err);

		res.json(blogs);
  	});
};

// Create a new blog (Admin only)
function create (req, res) {
	var blog = new Blog();

	// set blog info
	blog.title         	= req.body.title;
	blog.content      	= req.body.content;

	blog.save(function(err) {
		// if(err) return res.send(err);
		if(err) {
			return res.json({ error : err.errmsg })
		}

		res.json({ message : 'Blog created' });
	});
};

// View a specific blog (Public)
function view(req, res) {
	Blog.findById(req.params.id, function(err, blog){
		if(err) res.send(err);

		res.json(blog);
	});
};

// Update a specific blog
function update(req, res) {
	Blog.findById(req.params.id, function(err, blog) {
		if(err) return res.send(err);

		// update blog information
		if(req.body.title) 		blog.title		= req.body.title;
		if(req.body.content)	blog.content	= req.body.content;

		blog.modified_at = new Date();

		blog.save(function(err, blog) {
			if(err) return res.send(err);

			res.json({ message : 'Blog Updated', blog: blog });
		})
	});
};

function remove(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if(err) return res.send(err);
		res.json({ message : 'Blog Deleted' });
	})
}