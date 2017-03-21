const gulp = require('gulp');
const plumber = require('gulp-plumber');

const coffee = require('gulp-coffee');
const pug = require('gulp-pug');

const serve = require('gulp-serve');


function compileCoffee() {
	return gulp.src('src/*.coffee')
		.pipe(plumber())
		.pipe(coffee({bare: true}))
		.pipe(gulp.dest('./build'));
}

function compilePug() {
	return gulp.src('src/*.pug')
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest('./build'));
}

gulp.task('compile', gulp.parallel(compileCoffee, compilePug));

gulp.task('default', gulp.parallel('compile', serve({
	root: './build',
	port: 8080,
	hostname: '0.0.0.0'
	})
));
