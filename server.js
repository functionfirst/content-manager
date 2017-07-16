// BASE SETUP
// ======================================

// CALL PACKAGES ------------------------
var express 	= require('express');			// call express
var app 		= express();					// define the app using express
var http 		= require('http');
var bodyParser 	= require('body-parser');		// get body-parser
var config 		= require('./config');
var path 		= require('path');


// APP CONFIGURATION --------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());


// HANDLE CORS REQUESTS
// ====================================
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});


// set static file location - used for front-end requests
app.use(express.static(__dirname + '/public'));


// API ROUTES ---------------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);


// MAIN CATCHALL ROUTE ------------------------
// SEND USERS TO FRONTEND ----------------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START SERVER
// ====================================
server = http.createServer(app);
server.listen(config.port);
console.log('All the magic happens on port ' + config.port);