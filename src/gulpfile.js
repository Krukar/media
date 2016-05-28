var gulp = require('gulp'),
sequence = require('gulp-sequence'),
sass = require('gulp-sass'),
ts = require('gulp-typescript'),
uglify = require('gulp-uglify');

gulp.task('css', function () {
	return gulp.src('./scss/style.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	})
	.on('error', sass.logError))
	.pipe(gulp.dest('../'));
});

gulp.task('js', function () {
	return gulp.src('./js/**/*.ts')
	.pipe(ts({
		noImplicitAny: true,
		out: 'app.js'
	}))
	.pipe(gulp.dest('./'));
});

gulp.task('app', function() {
	return gulp.src('./app.js')
	.pipe(uglify())
	.pipe(gulp.dest('../'));
});

gulp.task('build', sequence('js', 'app'));

gulp.task('default', ['css', 'js'], function() {
	gulp.watch(['./scss/**/*.scss'], ['css']);  
	gulp.watch(['./js/**/*.ts'], ['build']);
});