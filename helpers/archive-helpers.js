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
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    if(err) {
      console.log('Error reading URL file!', paths.list);
      return;
    } else {
      urls = data.split('\n');
      callback(urls);
    }
  });
  return;
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls) {
    callback(urls.indexOf(url) >= 0);
  });
  return;
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(is) {
    if(is) {
      //redirect to webiste
    } else {
      //write url to siteList
    }
    callback();
  })
  return;
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, sites) {
    if(err) {
      console.log('Error looking for archived site!', exports.paths.archivedSites);
    } else {
      callback(sites.indexOf(url) >= 0);
    }
  });
  return;
};

exports.downloadUrls = function() {
};
