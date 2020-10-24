'use strict';

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

function makeHTML() {
  return gulp.src('source/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'source/sass/blocks'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('build'));
}

module.exports = makeHTML;
