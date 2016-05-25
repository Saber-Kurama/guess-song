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
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var preprocess = require('gulp-preprocess');
// 创建一个 views 任务
gulp.task("views",function(){
  //var revpath = [config.rev.revPath];
  //var wildcard = config.views.src;
  //if(global.argv.rev){
  //  wildcard = revpath.concat(wildcard)
  //}
  return gulp.src(config.views.src)
      .pipe(gulpif(global.argv.production,
          useref({
            searchPath: config.src,
            transformPath: function(filePath){
              console.log(filePath);
              return filePath;
            }
          })))
      .pipe(preprocess({context: process.env}))
      .pipe(gulpif('*.js', uglify()))
      //.pipe(gulpif('*.js', rename({ suffix: '.min' })))
      .pipe(gulpif('*.js', rev()))
      //.pipe(revCollector({
      // 	replaceReved: true
      //}))
      .pipe(gulp.dest(config.views.dest))
      .pipe(rev.manifest())
      .pipe(gulp.dest(config.rev.js));
});

gulp.task('rev', function() {
  console.log([config.rev.revPath].concat(config.rev.htmlsrc));
  return gulp.src([config.rev.revPath].concat(config.rev.htmlsrc))
      .pipe(revCollector({
   	    replaceReved: true,
        //revSuffix:'-saber[0-9a-f]{8,10}-?'
      }))
      .pipe(gulp.dest(config.views.dest));
});