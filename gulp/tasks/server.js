/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
'use strict';

var config  = require('../config');
var http    = require('http');
var express = require('express');
var gulp    = require('gulp');
//var gutil   = require('gulp-util');
var path = require('path');
// 日志中间件
//var morgan  = require('morgan');

gulp.task('server', function() {

  var server = express();
  //server.use(morgan('dev'));
  console.log(__dirname);
  // 设置静态路径
  server.use(express.static(config.dist.root));
  // 请求
  server.get('/', function(req, res) {
    res.sendFile('index.html', { root: config.dist.root });
  });
  // 开启监听
  server.listen(config.server.port,function(err){
    console.log('开启服务'+ config.server.port );
  });

});

//gulp.task('demoserver', function() {
//
//  var server = express('demo');
//
//  // log all requests to the console
//  server.use(morgan('dev'));
//  // 设置静态路径
//  server.use(express.static(path.join(__dirname,'../public')));
//  server.get('/', function(req, res) {
//    res.sendFile('index.html', { root: config.dist.root });
//  });
//  server.use(function(req, res){
//    res.redirect('/');
//  })
//
//  // 开启监听
//  server.listen(config.demoserver.port,function(err){
//    console.log('开启demo服务'+ config.demoserver.port );
//  });
//
//});
