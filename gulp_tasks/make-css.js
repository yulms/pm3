'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const shorthand = require('gulp-shorthand');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

function makeCSS () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    // .pipe(autoprefixer())
    // .pipe(shorthand())
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
}

module.exports = makeCSS;
