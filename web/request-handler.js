var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers.js');
var paths = archive.paths;
// require more modules/folders here!
var headers = helpers.headers;
var serveAssets = helpers.serveAssets;

exports.handleRequest = function (req, res) {

  var url = path.parse(req.url);

  if(req.method === 'GET') {
    if(url.root === '/') {
      if(url.dir === '/') {
        if(url.base === '') {
          console.log('loading index html');
          serveAssets(res, paths.siteAssets + '/index.html', function(data) {
            res.writeHead(200, headers);
            res.end(data);
            return;
          });
        }
        else if(url.base === 'styles.css') {
          console.log('loading styles sheet');
          serveAssets(res, paths.siteAssets + '/styles.css', function(data) {
            headers['Content-Type'] = 'text/css';
            res.writeHead(200, headers);
            res.end(data);
            return;
          });
        }
        else if(url.base) {
          archive.isUrlArchived(url.base, function(exists) {
            if(exists) {
              serveAssets(res, paths.archivedSites + '/' + url.base, function(data) {
                res.writeHead(200, headers);
                res.end(data);
              }) 
            } else {
              res.writeHead(404, headers);
              res.end('File not found!');
            }
            return;
          });
        }
        //other stuff with dir /
      }
      //other stuff with root /
    }
  }
  if(req.method === 'POST') {
    console.log('Incoming POST!');
    var input = '';
    req.on('data', function(data) {
      input += data;
    })
    req.on('end', function() {
      var site = input.slice(4);
      console.log(site);
    })
    res.end();
  }
};

