/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/8.
 */

var gulp = require('gulp');
var runSequence = require('run-sequence');
gulp.task('production', ['clean'], function(cb) {

  cb = cb || function() {
        console.log('xxxx??xxx');
        //gulp.start('rev');
      };

  //runSequence('lint:js', 'vendors', 'copyassests', 'images',
  // 'styles', 'views', cb);
  runSequence('vendors:dist', 'copyassests', 'images', 'styles', 'views', 'rev',cb);

});