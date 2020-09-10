'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');

const copyData = require('./gulp_tasks/copy-data');
const minifyHTML = require('./gulp_tasks/minify-html');
const makeCSS = require('./gulp_tasks/make-css').bind(null, browserSync);
const makeRasterImages = require('./gulp_tasks/make-raster-images');
const createSvgSprite = require('./gulp_tasks/create-svg-sprite');
const makeSvgBackground = require('./gulp_tasks/make-svg-background');
const makeJs = require('./gulp_tasks/make-js');

const build = gulp.parallel(
  copyData,
  minifyHTML,
  makeCSS,
  makeRasterImages,
  createSvgSprite,
  makeSvgBackground,
  makeJs
);

const quickBuild = gulp.parallel(
  copyData,
  minifyHTML,
  makeCSS,
  makeJs
);

function clean() {
  return del('build');
}

function server() {
  browserSync.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.scss', makeCSS);
  gulp.watch('source/img/raster/**/*.{png,jpg}', gulp.series(makeRasterImages, reloadServer));
  gulp.watch('source/img/svg/sprited/**/*.svg', gulp.series(createSvgSprite, reloadServer));
  gulp.watch('source/img/svg/others/**/*.svg', gulp.series(makeSvgBackground, reloadServer));
  gulp.watch('source/*.html', gulp.series(minifyHTML, reloadServer));
  gulp.watch('source/js/*.js', gulp.series(makeJs, reloadServer));
}

function reloadServer(cb) {
  browserSync.reload();
  cb();
}


module.exports.server = server;
module.exports.build = gulp.series(clean, build);
module.exports.start = gulp.series(clean, build, server);
module.exports.quickstart = gulp.series(quickBuild, server);