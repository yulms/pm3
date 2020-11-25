'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const flatten = require('gulp-flatten');


function minifyRasterImages() {
  return gulp.src([
    'source/img/raster/**/*.{png,jpg}'
  ], {
    base: 'source'
  })
    .pipe(flatten())
    .pipe(imagemin([
      imagemin.mozjpeg({
        quality: 80,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      })
    ]))
    .pipe(gulp.dest('build/img/raster'));
}

function makeWebP () {
  return gulp.src('source/img/raster/**/*.{png,jpg}')
    .pipe(flatten())
    .pipe(webp({
      quality: 80
    }))
    .pipe(gulp.dest('build/img/raster'));
}


module.exports = gulp.parallel(minifyRasterImages, makeWebP);
