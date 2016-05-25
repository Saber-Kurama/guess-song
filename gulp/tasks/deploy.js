/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/15.
 */
'use strict';
var gulp = require('gulp');
var config = require('../config');
var ghPages = require('gulp-gh-pages');
gulp.task('deploy:coding',function(){
  return gulp.src(config.dist.root + '/**/*')
      .pipe(ghPages({
        remoteUrl: 'https://git.coding.net/saber/blizzard.git',
        branch: 'coding-pages',
        cacheDir: '.codingpages'
      }));
})