'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const isDev = true;

const webpackConfig = {
  mode: isDev ? 'development' : 'production',
  output: {
    filename: 'script.js'
  },
  watch: false,
  devtool: isDev ? 'eval-source-map' : 'none',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              debug: false,
              corejs: 3,
              useBuiltIns: 'usage'
            }]]
          }
        }
      }
    ]
  },
  plugins: [
    new CircularDependencyPlugin(),
    new DuplicatePackageCheckerPlugin()
  ]
};


function makeJs(server) {
  return gulp.src('source/js/index.js')
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
}

module.exports = makeJs;





// const gulp = require('gulp');
// const plumber = require('gulp-plumber');
// const sourcemap = require('gulp-sourcemaps');
// const uglify = require('gulp-uglify-es').default;
// const rename = require('gulp-rename');
// const flatten = require('gulp-flatten');


// function makeJs() {
//   return gulp.src('source/**/*.js')
//     .pipe(flatten())
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(uglify())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(sourcemap.write('.'))
//     .pipe(gulp.dest('build/js'));
// }
