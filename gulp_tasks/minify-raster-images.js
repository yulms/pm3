'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

function minifyRasterImages () {
  return gulp.src([
    'source/img/raster/**/*.{png,jpg}'
  ], {
    base: 'source'
  })
    .pipe(imagemin([
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      })
    ]))
    .pipe(gulp.dest('build'));
}

module.exports = minifyRasterImages;
