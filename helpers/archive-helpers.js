var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

var urls = [];

exports.readListOfUrls = function(){
  //open sites.txt
  fs.readFile(exports.paths.list, 'utf-8', function(err, data){
    urls = data.split('\n');
  });
};

exports.isUrlInList = function(url){
  //searches list for specified url
  return _.contains(urls, function(item){
    return item === url;
  });
  //return true or false
};

exports.addUrlToList = function(url){
  //adds url to sites.txt
  if(!exports.isUrlInList(url)){
    urls.push(url);
  }
};

exports.isURLArchived = function(url){
  //searches sites archives/sites folder for file (url)
  return fs.existsSync(exports.paths.archivedSites + url);
  //return true or false
};

exports.downloadUrls = function(){

};
