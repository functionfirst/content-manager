var config 		= require('../../config');
var extTypes 	= require('../lib/extTypes');
var Page   		= require('../models/page');
var User   		= require('../models/user');
var S3FS 		= require('s3fs');
var fs 			= require('fs');
var nconf 		= require('nconf');

var aws 		= config.aws;

var pages = {
	list: list,
	create: create,
	view: view,
	update: update,
	upload: upload,
	remove: remove
};

module.exports = pages;

/////


// List all pages
function list(req, res) {
	var filter = {};

	// If search query exists, search page name and content	
  	if(req.query.name) {
  		filter = {
  			$or: [{
  				name: {
					"$regex": req.query.name,
					"$options": "i"
				}
			},{
				content: {
	  				'$regex': req.query.name,
					'$options': 'i'
	  			
	  			}
	  		}]
		}
	}

  	// Block admin only pages if not an admin
  	if(!req.admin) {
    	filter.admin_only = false;
  	}

  	Page.find(filter, 'name modified_at', { sort: 'start_date' }, function(err, pages) {
    	if(err) res.send(err);

    	res.json(pages);
  	});
};

// Create a new page (Admin only)
function create (req, res) {
	var page = new Page();

	// set page info
	page.name          	= req.body.name;
	page.content      	= req.body.content;
	if(req.body.parent) page.parent = req.body.parent;

	page.save(function(err) {
		if(err) return res.send(err);
		res.json({ message : 'Page created' });
	});
};

// View a specific page (Public)
// returns comments and associated users
function view(req, res) {
	Page.findByName(req.params.name, function(err, page){
		if(err) res.send(err);

		if(page) {
			if(!req.admin && page.admin_only) {
				page.content = 'Access Restricted';
				page.comments = [];
			}
		}

		res.json(page);
	});
};

// Update a specific page (Admin only);
function update(req, res) {
	Page.findOne({ name: req.body.name }, function(err, page) {
		if(err) return res.send(err);

		// update page information
		if(req.body.name) 		page.name		= req.body.name;
		if(req.body.content)	page.content	= req.body.content;

		page.parent = req.body.parent;
		page.admin_only = req.body.admin_only;
		page.modified_at = new Date();

		// Populate parent data
		Page.populate(page, { path : "parent" }, function(err, page) {
			if(err) return res.send(err);
		});
		
		page.save(function(err, page) {
			if(err) return res.send(err);

			res.json({ message : 'Page Updated', page: page });
		})
	});
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
	var filename = file.originalname
	var contentType = extTypes.getContentType(filename);

	// Create file stream
	var stream = fs.createReadStream(file.path);

	// writefile calls putObject behind the scenes
	s3fsImpl.writeFile(filename, stream, { "ContentType" : contentType }).then(function(){
		fs.unlink(file.path, function(err) {
			if (err) return res.send(err);

			res.json({
				files: 
					[{
						url: aws.path + filename
					}]
			});
		});
	});
}

function remove(req, res) {
	Page.findByIdAndRemove(req.params.id, function(err) {
		if(err) return res.send(err);
		res.json({ message : 'Page Deleted' });
	})
}