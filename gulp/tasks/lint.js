/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
var gulp = require('gulp');
var eslintFormatter = require('eslint-friendly-formatter');
var eslint = require('gulp-eslint');
var config = require('../config');

gulp.task('lint:js', function(){
  return gulp.src(config.scripts.src)
      .pipe(eslint())
      .pipe(eslint.format(eslintFormatter))
      .pipe(eslint.failAfterError());
});

gulp.task('lint:js:fix', function(){
  return gulp.src(config.scripts.src)
      .pipe(eslint({
        fix: true
      }))
      .pipe(eslint.format(eslintFormatter))
      .pipe(eslint.failAfterError())
      .pipe(gulp.dest(config.lint.js.dest));
});
