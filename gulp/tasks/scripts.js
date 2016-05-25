/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
'use strict';
var gulp = require('gulp');
var config = require('../config');
var cache = require('gulp-cached');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var browserSync  = require('browser-sync').get('saber');
// 创建一个 scripts 任务
gulp.task("scripts",function(){
  return gulp.src(config.scripts.src)
      .pipe(cache('scripts'))
      .pipe(gulpif(global.argv.production, uglify()))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(gulpif((browserSync && browserSync.active), browserSync.stream()));
});