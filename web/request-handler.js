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
            headers['Content-Type'] = 'text/html';
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
              helpers.sendToPage(res, url.base);
            } else {
              res.writeHead(404, headers);
              res.end('File not found!');
            }
            return;
          });
        }
      }
    }
  }
  if(req.method === 'POST') {
    var input = '';
    req.on('data', function(data) {
      input += data;
    })
    req.on('end', function() {
      var site = input.slice(4) + '\n';
      archive.isUrlInList(site, function(is) {
        if(is) {
          archive.isUrlArchived(site, function(is) {
            if(is) {
              helpers.sendToPage(res, site);
            } else { //if is not archived
              helpers.sendToLoading(res);
            }
          })
        } else { //if is not in list
          archive.addUrlToList(site, function() {
            helpers.sendToLoading(res);
          });
        } //end of if url is not in list
      }); // end of isURLInList
    }); //end of req.on('end')
  } //end of if Post
};