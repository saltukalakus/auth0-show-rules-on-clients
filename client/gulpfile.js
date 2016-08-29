var gulp = require('gulp');
var browserify = require('gulp-browserify');
var minify = require('gulp-minify');
var defineModule = require('gulp-define-module');
var hoganCompiler = require('gulp-hogan-precompile');
var concat = require('gulp-concat');
var tape = require('gulp-tape');
var tapColorize = require('tap-colorize');

gulp.task('test', function() {
    return gulp.src('tests/*.js')
        .pipe(tape({
            reporter: tapColorize()
        }));
});

gulp.task('template', function() {
    return gulp.src('template/*.html')
        .pipe(hoganCompiler())
        .pipe(defineModule('node'))
        .pipe(gulp.dest('build/template/'));
});

gulp.task('jsbuild', ['template'], function() {
    return gulp.src('./app.js')
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(gulp.dest('./build/'))
});

gulp.task('compress', ['jsbuild'], function() {
    return gulp.src('./build/app.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            }
        }))
        .pipe(gulp.dest('../build/'))
});

gulp.task('build',
    ['compress',
    'jsbuild',
    'template',
    'test']);