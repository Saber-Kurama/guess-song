/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
'use strict';

var config       = require('../config');
var gulp         = require('gulp');
// var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../utils/handleErrors');
var browserSync  = require('browser-sync').get('saber');
var less         = require('gulp-less');
var LessFunctions = require('less-plugin-functions');
// 自动给 css3 属性加浏览器前缀, 如: `-webkit-`
var autoprefixer = require('gulp-autoprefixer');
var cssnano    = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');

var lessfunction = new LessFunctions();

gulp.task('styles', function () {


  return gulp.src(config.styles.src)
      .pipe(sourcemaps.init())
      .pipe(less({
        plugins:[lessfunction]
      }))
      .on('error', handleErrors)
      .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
      .on('error', handleErrors)
      .pipe(gulpif(global.argv.production, cssnano()))
      .pipe(gulpif(global.argv.production, rev()))

      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.styles.dest))
      .pipe( gulpif(global.argv.production,rev.manifest()) )
      .pipe( gulpif(global.argv.production,gulp.dest(config.rev.css)) )
      .pipe(gulpif((browserSync && browserSync.active), browserSync.stream()));

});