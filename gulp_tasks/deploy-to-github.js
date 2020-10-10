'use strict';

const ghPages = require('gh-pages');
const path = require('path');


function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), './build'), cb);
}

module.exports.deploy = deploy;




// const gulp = require('gulp');
// const ghPages = require('gulp-gh-pages');

// function deploy() {
//   return gulp.src('./build/**/*')
//     .pipe(ghPages());
// }

// module.exports = deploy;
