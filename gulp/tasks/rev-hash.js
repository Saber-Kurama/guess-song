/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/4/8.
 */
'use strict';

var
    path = require('path'),
    stream = require('stream');
var through = require('through2');
var modifyFilename = require('modify-filename');
var revPath = require('rev-path');

var ismin = false;

var revData = {}; // exposed hash

function trackRevision (file, unused, callback) {
  //console.log(path.relative(file.revOrigBase, file.revOrigPath), '->',
  // path.relative(file.base, file.path));
  //console.log(file.revOrigPath);
  //console.log(file.base);
  ////console.log(file.revHash)
  ////file.path = file.path.replace(/\.map$/, ''), hash);
  ////file.path = file.base + 'saber.js';
  ////file.path = path.join(file.base, path.relative(file.revOrigBase,
  //// file.revOrigPath) + '?v=' + file.revHash);
  //revData[path.relative(file.revOrigBase, file.revOrigPath)] = 'saber' ;
  //callback(null, file);

}
function relPath(base, filePath) {
  if (filePath.indexOf(base) !== 0) {
    return filePath.replace(/\\/g, '/');
  }

  var newPath = filePath.substr(base.length).replace(/\\/g, '/');

  if (newPath[0] === '/') {
    return newPath.substr(1);
  }

  return newPath;
}
module.exports = function (ismin) {
  ismin = true;
  //var passthrough = new stream.Transform({ objectMode: true });
  //passthrough._transform = trackRevision;
  //return passthrough;
  return through.obj(function(file, enc, callback){
    console.log(file.path);
    file.path = modifyFilename(file.path, function (filename, extension) {
      var extIndex = filename.indexOf('.');
      var hashIndex = filename.indexOf('-');
      filename = revPath.revert(filename, file.revHash);
      console.log(filename);
      filename =  modifyFilename(filename, function (filename, ext) {
        return filename + '-saber' + file.revHash + ext;
      });
      //filename = extIndex === -1 ?
      //    revPath(filename, file.revHash) :
      //revPath(filename.slice(0, extIndex), file.revHash) + filename.slice(extIndex);

      return filename + extension;
    });
    callback(null, file);
  }, function(cb){
    cb();
  });
};