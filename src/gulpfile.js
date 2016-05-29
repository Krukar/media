var gulp = require('gulp'),
sass = require('gulp-sass'),
ts = require('gulp-typescript'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify');

// Sass -> CSS
gulp.task('css', function () {
	return gulp.src('./scss/style.scss')
	.pipe(sass({
		includePaths: [require('bourbon').includePaths, require('bourbon-neat').includePaths],
		outputStyle: 'compressed'
	})
	.on('error', sass.logError))
	.pipe(gulp.dest('../'));
});

// TS -> JS
gulp.task('ts', function () {
	return gulp.src('./js/**/*.ts')
	.pipe(ts({
		noImplicitAny: true,
		out: 'main.js',
		target: 'ES6'
	}))
	.pipe(gulp.dest('./js'));
});

// Compile JS
gulp.task('js', ['ts'], function() {
	return gulp.src(['node_modules/jquery/dist/jquery.js',
		'node_modules/snapsvg/dist/snap.svg.js',
		'js/main.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('../src'));
});

gulp.task('default', ['css', 'js'], function() {
	gulp.watch(['./scss/**/*.scss'], ['css']);  
	gulp.watch(['./js/**/*.ts'], ['js']);
});