var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('buildjs', function() {
    gulp.src('./app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('../build/'))
});