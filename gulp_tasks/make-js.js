const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const flatten = require('gulp-flatten');


function makeJs() {
  return gulp.src('source/**/*.js')
  // return gulp.src('source/js/*.js')
    .pipe(flatten())
    // .pipe(plumber())
    // .pipe(sourcemap.init())
    // .pipe(concat('script.js'))
    // .pipe(uglify())
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/js'));
}

module.exports = makeJs;
