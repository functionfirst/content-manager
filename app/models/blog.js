var mongoose	= require('mongoose');
var db 				= require('../lib/db');
var slug    	= require('mongoose-slug-generator');
mongoose.plugin(slug);

var Schema 		= mongoose.Schema;
var ObjectId 	= mongoose.Schema.Types.ObjectId;

var BlogSchema = new Schema({
	title: {
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
	modified_at : {
		type : Date,
		default : Date.now
	},
	comments: [{type: ObjectId, ref: 'Comment'}],
	slug: {
		type: String,
		slug: "title",
		unique: true
	}
});

module.exports = db.model('Blog', BlogSchema);