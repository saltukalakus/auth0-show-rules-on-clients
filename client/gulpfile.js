var gulp = require('gulp');
var browserify = require('gulp-browserify');
var minify = require('gulp-minify');

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
    ['jsbuild',
     'compress']);