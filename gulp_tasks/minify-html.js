'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

function minifyHTML() {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('build'));
}

module.exports = minifyHTML;
