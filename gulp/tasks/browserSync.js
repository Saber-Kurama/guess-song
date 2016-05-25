/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
'use strict';
// 浏览器同步工具
var config      = require('../config');
var browserSync = require('browser-sync').create('saber');
var gulp        = require('gulp');

gulp.task('browserSync', function() {

  browserSync.init({
    proxy: 'localhost:' + config.server.port
  });

});