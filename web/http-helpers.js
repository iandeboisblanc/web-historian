var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(asset, function(err, data) {
    if(err) {
      console.log('error reading file!');
      res.end('ERROR READING FILE');
    } else {
      callback(data);
    }
  })
};

exports.sendToLoading = function(res) {
  exports.serveAssets(res, archive.paths.siteAssets + '/loading.html', function(data) {
    headers['Content-Type'] = 'text/html';
    res.writeHead(302, headers);
    res.end(data);
    return;
  });
};

exports.sendToPage = function(res, url) {
  exports.serveAssets(res, archive.paths.archivedSites + '/' + url, function(data) {
    headers['Content-Type'] = 'text/html';
    res.writeHead(200, headers);
    res.end(data);
  }); 
};



// As you progress, keep thinking about what helper functions you can put here!
