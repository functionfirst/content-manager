var mongoose	= require('mongoose');
var db 				= require('../lib/db');
var Schema 		= mongoose.Schema;
var ObjectId 	= mongoose.Schema.Types.ObjectId;

var PageSchema = new Schema({
	name: {
		type: String,
		required : true,
		index : {
			unique : true
		}
	},
	content : {
		type : String
	},
	created_at : {
		type : Date,
		default : Date.now
	},
	admin_only : {
		type: Boolean,
		default: false
	},
	parent: [{ type: ObjectId, ref: 'Page' }],
	modified_at : {
		type : Date,
		default : Date.now
	},
	comments: [{type: ObjectId, ref: 'Comment'}]
});

PageSchema.static('findByName', function (name, callback) {
	if(!name) name = "home";

	var opts = [
		{
			path: 'parent',
			select:'name parent',
			populate: {
				path: 'parent',
				model: 'Page',
					populate: {
						path: 'parent',
						model: 'Page',
						populate: {
							path: 'parent',
							model: 'Page'
						}
					}
			}
		},
		{
			path: 'comments',
			populate: {
				path:  'user',
		    	model: 'User'
		    }
		}
	];

	this.findOne({ name: name }, callback)
		.populate(opts)
		.exec(function(err, page){
		if (err) return err;
	});
});


PageSchema.pre('save', function(next) {
	var page = this;
	var reservedNames = ['admin', 'signup', 'search', 'login']
	var isReservedWord = (reservedNames.indexOf(page.name) >= 0);

	if(isReservedWord) {
		var err = new Error();
		err.error = 'That Page name is reserved.';
  		next(err);
	}

	next();
});

module.exports = db.model('Page', PageSchema);