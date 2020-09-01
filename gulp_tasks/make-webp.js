'use strict';

const gulp = require('gulp');
const webp = require('gulp-webp');

function makeWebP () {
  return gulp.src('source/img/raster/**/*.{png,jpg}')
    .pipe(webp({
      quality: 80
    }))
    .pipe(gulp.dest('build/img/raster'));
}

module.exports = makeWebP;
