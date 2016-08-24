var gulp = require('gulp');
var browserify = require('gulp-browserify');
var minify = require('gulp-minify');
var defineModule = require('gulp-define-module');
var hoganCompiler = require('gulp-hogan-precompile');
var concat = require('gulp-concat');

gulp.task('template', function() {
    gulp.src('template/*.html')
        .pipe(hoganCompiler())
        .pipe(defineModule('node'))
        .pipe(concat('view.js'))
        .pipe(gulp.dest('build/template/'));
});

gulp.task('jsbuild', function() {
    gulp.src('./app.js')
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(gulp.dest('./build/'))
});

gulp.task('compress', function() {
    gulp.src('./build/app.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            }
        }))
        .pipe(gulp.dest('../build/'))
});

gulp.task('build',
    ['template',
     'jsbuild',
     'compress']);