var gulp = require('gulp');
var concat = require('gulp-concat');
var git = require('gulp-git');

gulp.task('default', ['js', 'css'], function() {
	console.log('default');
});

gulp.task('js', function() {
	console.log('compiling js');
	gulp.src('./source/js/**/*.js')
		.pipe(concat('build.js'))
		.pipe(gulp.dest('./source/build/js'));
});

gulp.task('css', function() {
	console.log('compiling css');
	gulp.src('./source/styles/**/*.css')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./source/build/css'));
});

gulp.task('publish', ['publish-js', 'publish-css'], function() {
	console.log('publishing');
});

gulp.task('publish-js', ['js'], function() {
	console.log('publishing js');
	gulp.src('./source/build/js/build.js')
		.pipe(gulp.dest('./build-js/'));
});

gulp.task('publish-css', ['css'], function() {
	console.log('publishing css');
	gulp.src('./source/build/css/styles.css')
		.pipe(gulp.dest('./build-css/'));
});



gulp.task('setup', function() {
	git.clone('')
});