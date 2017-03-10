var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

var jsFiles = 'js/*.js',  
    jsDest = 'build/';

gulp.task('scripts', function() {  
  return gulp.src(jsFiles)
    .pipe(concat('automaton.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('automaton.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['scripts']);
});