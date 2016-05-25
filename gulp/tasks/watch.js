/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
'use strict';

var config = require('../config');
var gulp = require('gulp');
gulp.task('watch', ['browserSync', 'server'], function() {
  //// 检测 js 文件夹
  gulp.watch(config.scripts.src, ['scripts']);
  ////gulp.watch(config.styles.watch, ['styles']);
  //// 检测 less
  gulp.watch(config.styles.watch, ['styles']);
  //// 检测 images
  ////gulp.watch(config.images.src, ['images', 'reload']);
  gulp.watch(config.views.src, ['views', 'reload']);
  //gulp.watch(config.tmodtpl.watch, ['tmodtpl', 'reload']);
  //gulp.watch(config.copylib.src, ["copylib"]);
});