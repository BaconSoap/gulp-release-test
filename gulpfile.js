var gulp = require('gulp');
var concat = require('gulp-concat');
var git = require('gulp-git');
var runSequence = require('run-sequence')

function changeTo(path) {
	process.chdir(path);
	console.info('cwd: ' + process.cwd());
}

gulp.task('default', ['js', 'css'], function() {
	console.log('default');
});

gulp.task('js', function() {
	console.log('compiling js');
	return gulp.src('./source/js/**/*.js')
		.pipe(concat('build.js'))
		.pipe(gulp.dest('./source/build/js'));
});

gulp.task('css', function() {
	console.log('compiling css');
	return gulp.src('./source/styles/**/*.css')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./source/build/css'));
});

gulp.task('publish', ['publish-js'], function() {
	changeTo('../');
	gulp.start('publish-css');
	console.log('publishing');

});

gulp.task('move-js', ['js'], function() {
	return gulp.src('./source/build/js/build.js')
		.pipe(gulp.dest('./build-js/'));
});

gulp.task('publish-js', ['move-js'], function() {
	console.info('publishing js');
	
	return release('./build-js');
});

gulp.task('move-css', ['css'], function() {
	return gulp.src('./source/build/css/styles.css')
		.pipe(gulp.dest('./build-css/'));
});

gulp.task('publish-css', ['move-css'], function() {
	console.info('publishing css');
	
	return release('./build-css');
});

function release(sourceDir, cb) {
	changeTo(sourceDir);
	return gulp.src('./*')
		.pipe(git.add())
		.pipe(git.commit('releasing something'))
		.on('end', function() {
			//when the files have been committed, push the commits
			console.info('pushing something');

			return git.push('origin', 'master').end();
		});
}

gulp.task('setup', function() {
	git.clone('git@github.com:BaconSoap/test-build-css.git', {args: ' build-css'});
	git.clone('git@github.com:BaconSoap/test-build-js.git', {args: ' build-js'});
});