var verifyToken 	= require('../lib/verifytoken');
var requireAdmin 	= require('../lib/authorise.js');
var multer 			= require('multer');

// Routes
var pageRoute 		= require('../routes/pages');
var blogRoute 		= require('../routes/blogs');
var commentRoute 	= require('../routes/comments');
var authRoute 		= require('../routes/authenticate');
var userRoute 		= require('../routes/users');

module.exports = function(app, express) {
	// get an instance of express router
	var apiRouter = express.Router();

	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message : "Yo, welcome to the auction API!" });
	});

	apiRouter.post('/users', userRoute.create);
	
	// Authentication route
	// This needs to be defined before verifyToken is called
	apiRouter.post('/authenticate', authRoute);

	// Middleware - Multer config
	// Used for image uploads
	app.use(multer({
		dest: './public/uploads/',
 		rename: function (fieldname, filename) {
			return filename.toLowerCase() + Date.now();
		}
	}).single('files[]'));

	// middleware to verify a token
	apiRouter.use(verifyToken);

	// ROUTES
	// Get current user's details
	apiRouter.get('/me', userRoute.me);

	// Page Routes
	apiRouter.get('/pages', pageRoute.list);
	apiRouter.get('/pages/:name', pageRoute.view);
	apiRouter.post('/pages', requireAdmin, pageRoute.create);
	apiRouter.put('/pages/:name', requireAdmin, pageRoute.update);
	apiRouter.delete('/pages/:id', requireAdmin, pageRoute.remove);

	// Blog Routes
	apiRouter.get('/blogs', blogRoute.list);
	apiRouter.get('/blogs/:id', blogRoute.view);
	apiRouter.post('/blogs', requireAdmin, blogRoute.create);
	apiRouter.put('/blogs/:id', requireAdmin, blogRoute.update);
	apiRouter.delete('/blogs/:id', requireAdmin, blogRoute.remove);

	// Comments
	apiRouter.get('/comments', commentRoute.view);
	apiRouter.post('/comments', commentRoute.create);
	apiRouter.put('/comments/:id', commentRoute.update);
	apiRouter.delete('/comments/:id', commentRoute.remove);

	// Image upload
	apiRouter.post('/images', pageRoute.upload);

	// User Routes (Admin only)
	apiRouter.get('/users', requireAdmin, userRoute.list);
	apiRouter.get('/users/:user_id', requireAdmin, userRoute.view);
	apiRouter.put('/users/:user_id', requireAdmin, userRoute.update);
	apiRouter.post('/users/:user_id/upload', requireAdmin, userRoute.upload);

	return apiRouter
};