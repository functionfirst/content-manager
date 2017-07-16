var mongoose	= require('mongoose');
var db 				= require('../lib/db');
var Blog   		= require('../models/blog');
var Page   		= require('../models/page');
var Schema 		= mongoose.Schema;

var ObjectId 	= mongoose.Schema.Types.ObjectId;

var CommentSchema = new Schema({
	user: { type: ObjectId, ref: 'User' },
	content : {
		type : String
	},
	created_at : {
		type : Date,
		default : Date.now
	},
	modified_at : {
		type : Date,
		default : Date.now
	}
});

function deleteComment(Type, comment) {
	Type.findOne({ 'comments' : comment._id }, function(err, type) {
		if(type) {
			var index = type.comments.indexOf(comment._id);

			if(index > -1) {
				type.comments.splice(index, 1);

				type.save(function(err,type) {
					if(err) return res.send(err);
				});
			}
		}
	});
}

CommentSchema.pre('remove', function(next) {
	var comment = this;

	deleteComment(Blog, comment);
	deleteComment(Page, comment);

	next();
});

module.exports = db.model('Comment', CommentSchema);