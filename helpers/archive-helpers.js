var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');
var helpers = require(__dirname + '/../web/http-helpers.js');

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
  fs.appendFile(exports.paths.list, url, function(err) {
    if(err) {
      console.log('Error writing to file!');
    } else {
      callback();
    } 
  }); //end of adding site to list
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

exports.downloadUrls = function(urlArray) {
  for(var i = 0; i < urlArray.length; i++) {
    if(urlArray[i].length) {
      var destination = fs.createWriteStream(exports.paths.archivedSites + '/' + urlArray[i]);
      request('http://' + urlArray[i]).pipe(destination).on('error', function(err) {
        console.log(err);
      });
    }
  }
};
