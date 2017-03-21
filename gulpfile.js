const gulp = require('gulp');
const plumber = require('gulp-plumber');

const coffee = require('gulp-coffee');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const pug = require('gulp-pug');
const serve = require('gulp-serve');


function compileCoffee() {
	return gulp.src('src/jsab.coffee')
		.pipe(plumber())
		.pipe(coffee({bare: true}))
		.pipe(gulp.dest('./dist'));
}

function minifyJs() {
	return gulp.src('dist/jsab.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename('jsab.min.js'))
		.pipe(gulp.dest('./dist'));
}

function compilePug() {
	return gulp.src('src/test.pug')
		.pipe(plumber())
		.pipe(pug())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./test'));
}

gulp.task('lib', gulp.series(compileCoffee, minifyJs));
gulp.task('compile', gulp.parallel('lib', compilePug));


function watch() {
	gulp.watch('src/jsab.coffee', gulp.series('lib'));
}

gulp.task('default', gulp.parallel('compile', watch, serve({
	root: ['dist', 'test'],
	port: 8080,
	hostname: '0.0.0.0'
	})
));
