const gulp = require('gulp');


function copyData() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/favicon/**'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

module.exports = copyData;
