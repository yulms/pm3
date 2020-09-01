const gulp = require('gulp');


function copyData() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

module.exports = copyData;
