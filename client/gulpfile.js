var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('build', function() {
    gulp.src('./app.js')
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(gulp.dest('../build/'))
});