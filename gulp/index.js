/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/7.
 */
"use strict";
// 引入文件读取模块
var fs = require("fs");
var parseArgs = require('./utils/parseArgs');
global.argv = parseArgs();
global.argv.environmentName = 'development';
if(global.argv.production){
  global.argv.environmentName = 'production';
}
console.log(parseArgs());
require('dotenv').config();
process.env.NODE_ENV = global.argv.environmentName;
// 同步读取目录 gulp/tasks
var tasks = fs.readdirSync("./gulp/tasks/");
// 循环加载每个任务
tasks.forEach(function(task){
  require("./tasks/"+task);
})