'use strict';
var gulp = require('gulp'),
    purify = require('gulp-purifycss'),
    rename  = require('gulp-rename'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver');

gulp.task('purify', function() {
  return gulp.src('./css/application.css')
    .pipe(purify(['index.html']))
    .pipe(rename('application-purify.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});


gulp.task('webserver', function(){
  gulp.src('./')
      .pipe(webserver({
        port:1234,
	    livereload: true,
	    directoryListing: false,
	    open: true,
	    fallback: 'index.html'
      }));
})

gulp.task('watch', function () {
    gulp.watch('./css/*.scss', ['sass']);
    gulp.watch('./*.html',['purify']);
});

gulp.task('default', ['webserver','watch']);