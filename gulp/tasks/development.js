/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
//var browserSync = require('browser-sync');
// 开发任务
gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  //global.isProd = false;

  runSequence('vendors', 'copyassests', 'images', 'scripts', 'styles', 'views', 'watch', cb);
  //runSequence('lib', 'images', 'tmodtpl', 'copyfonts',
  // 'styles','views','scripts','watch', cb);

});