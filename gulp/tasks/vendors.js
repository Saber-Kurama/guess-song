/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
'use strict';
// 创建一个合并 lib(vendors)的任务
var gulp = require('gulp');
var config = require('../config');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var revHash = require('./rev-hash');
gulp.task("vendors",function(){
  return gulp.src(config.vendors.src)
      .pipe(sourcemaps.init())
      .pipe(concat(config.vendors.dist))
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest(config.vendors.dest))
      .pipe(rev())
      .pipe(gulp.dest(config.vendors.dest))
      .pipe(rev.manifest())
      .pipe(gulp.dest(config.rev.vendor));
});
gulp.task("vendors:dist",function(){
  return gulp.src(config.vendors.src)
      .pipe(concat(config.vendors.dist))
      .pipe(uglify())
      //.pipe(gulp.dest(config.vendors.dest))
      //.pipe(rename({ suffix: '.min' }))
      .pipe(rev())
      //.pipe(revHash())
      .pipe(gulp.dest(config.vendors.dest))
      .pipe(rev.manifest())
      .pipe(gulp.dest(config.rev.vendor));
});