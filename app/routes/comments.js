var Page   	= require('../models/page');
var Blog   	= require('../models/blog');
var User   	= require('../models/user');
var Comment = require('../models/comment');

var comments = {
	view: view,
	create: create,
	update: update,
	remove: remove
};

module.exports = comments;


/////


// View comments for a specific object
function view(req, res) {
	var Model = (req.query.object == 'page' ? Page : Blog);

	Model.findById(req.query.id)
		.populate('comments')
		.exec(function(err, comments) {
			if(err) res.send(err);

			User.populate(comments, {
					path: "comments.user",
					select: "name"
				}, function(err, comments) {
					if (err) return res.send(err);

					res.json(comments);
				});

	});
};


function create(req, res) {
	var comment 	= new Comment();
	comment.user 	= req.body.user;
	comment.content = req.body.content;

	comment.save(function(err) {
		if(err) return res.send(err);

		var Model = (req.body.object == 'page' ? Page : Blog);

		Model.findById(req.body.id)
			.populate('comments')
			.exec(function(err, model) {
				if(err) res.send(err);

				if(model) {
					model.comments.push(comment);

					User.populate(model, {
						path: "comments.user",
						select: "name"
					}, function(err, model) {
						if (err) return res.send(err);

						model.save(function(err, model) {
							if(err) return res.send(err);

							res.json({ message: 'Comment added', comments: model.comments });
						});
					});
				}

		});
	});
}


function update(req, res) {
	Comment.findById(req.params.id, function(err, comment) {
		if(err) return res.send(err);

		if (req.body.content) comment.content = req.body.content;
		comment.modified_at = new Date();

		comment.save(function(err, comment) {
			if(err) return res.send(err);

			res.json({ message: 'Comment updated', comment: comment })
		});
	})
}


function remove(req, res) {
	Comment.findById(req.params.id, function(err, comment) {
		if(err) return res.send(err);

		if(req.decoded.userid != comment.user) {
			res.json({ error: 'You do not have permission to delete that comment.' });
		}

		comment.remove(function() {
			res.json({ message : 'Comment has been deleted.' });
		});
	});
}