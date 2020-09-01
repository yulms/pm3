'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


function minifyRasterImages() {
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

function makeWebP () {
  return gulp.src('source/img/raster/**/*.{png,jpg}')
    .pipe(webp({
      quality: 80
    }))
    .pipe(gulp.dest('build/img/raster'));
}


module.exports = gulp.parallel(minifyRasterImages, makeWebP);
