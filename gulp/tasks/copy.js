/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */

var gulp = require('gulp');
var config = require('../config');

gulp.task('copycss',function(){
  return gulp.src(config.copy.css.src)
      //.pipe(rev())
      .pipe(gulp.dest(config.copy.css.dest));
});
gulp.task('copyjs', function(){
  return gulp.src(config.copy.js.src)
      .pipe(gulp.dest(config.copy.js.dest));
});
gulp.task('copyfonts',function(){
  return gulp.src(config.copy.fonts.src)
      //.pipe(rev())
      .pipe(gulp.dest(config.copy.fonts.dest));
});
gulp.task('copyimages',function(){
  return gulp.src(config.copy.images.src)
      //.pipe(rev())
      .pipe(gulp.dest(config.copy.images.dest));
});
gulp.task('copyicon',function(){
  return gulp.src(config.copy.icon.src)
      //.pipe(rev())
      .pipe(gulp.dest(config.copy.icon.dest));
});

gulp.task('copyassests',['copyfonts','copyjs'],function(){
  
});