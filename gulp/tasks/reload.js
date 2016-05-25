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
var browserSync = require('browser-sync').get('saber');

gulp.task('reload', function() {
  browserSync.reload();

});