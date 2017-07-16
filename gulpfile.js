// load the plugins
var gulp 		= require('gulp'),
	less 		= require('gulp-less'),
	minifyCSS 	= require('gulp-minify-css'),
	rename 		= require('gulp-rename'),
	jshint 		= require('gulp-jshint'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	ngAnnotate 	= require('gulp-ng-annotate'),
	nodemon 	= require('gulp-nodemon');


gulp.task('css', processCSS)
	.task('angular', processAngular)
	.task('nodemon', nodemonTaskRunner)
	.task('default', ['nodemon']);


/////


// minify CSS
function processCSS() {
	return gulp.src('public/assets/css/style.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(rename({ suffix : '.min' }))
		.pipe(gulp.dest('public/assets/css'));
}


// compile angular js into single app file
function processAngular() {
	return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(ngAnnotate())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));
}

// nodemon task
function nodemonTaskRunner() {
	nodemon({
		script : 'server.js',
		ext : 'js less html',
		ignore: 'dist'
	})
	.on('start', ['angular', 'css'])
	.on('change', ['angular', 'css'])
	.on('restart', function() {
		console.log('Restarted!');
	});
}