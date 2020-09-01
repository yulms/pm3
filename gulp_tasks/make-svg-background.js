'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

function makeSvgBackground () {
  return gulp.src([
    'source/img/svg/others/**/*.svg'
  ])
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        },
        {
          cleanupNumericValues: {
            floatPrecision: 1
          }
        },
        {
          convertPathData: {
            floatPrecision: 1
          }
        },
        {
          cleanupListOfValues: {
            floatPrecision: 1
          }
        }
        ]
      })
    ]))
    .pipe(gulp.dest('build/img/svg'));
}

module.exports = makeSvgBackground;
