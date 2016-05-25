/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
'use strict';

var config     = require('../config');
//只允许改变的文件通过管道。
//var changed    = require('gulp-changed');
var gulp       = require('gulp');
var gulpif     = require('gulp-if');
var cache = require('gulp-cached');
var imagemin   = require('gulp-imagemin');

gulp.task('images', function() {

  var dest = config.images.dest;

  return gulp.src(config.images.src)
      .pipe(cache('images'))
      //.pipe(changed(dest)) // Ignore unchanged files
      .pipe(gulpif(global.argv.production, imagemin()))    // Optimize
      .pipe(gulp.dest(dest));

});