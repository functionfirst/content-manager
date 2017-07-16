var users = require('./users');
var blogs = require('./blogs');
var pages = require('./pages');

console.log('START: Starting to seed database');

users.seed();
blogs.seed();
pages.seed();