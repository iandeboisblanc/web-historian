var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers.js');
var paths = archive.paths;
// require more modules/folders here!
var headers = helpers.headers;
var serveAssets = helpers.serveAssets;
var site = '';

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
        else {
          res.end();
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
      var site = input.slice(4);
      archive.isUrlInList(site, function(is) {
        if(is) {
          console.log('post requested site is already in list');
          archive.isUrlArchived(site, function(is) {
            if(is) {
              console.log('post requested site is already archived. Routing to', site);
              // helpers.sendToPage(res, site);
              helpers.serveAssets(res, archive.paths.archivedSites + '/' + site, function(data) {
                headers['Content-Type'] = 'text/html';
                res.writeHead(200, headers);
                res.write(data);
              });
            } 
            else { //if is not archived
              console.log('post requested site is not yet archived. Routing to loading page...');
              helpers.sendToLoading(res);
            }
          })
        } else { //if is not in list
          console.log('post requested site is not yet in list. Adding...');
          archive.addUrlToList(site + '\n', function() {
            helpers.sendToLoading(res);
          });
        } //end of if url is not in list
      }); // end of isURLInList
    }); //end of req.on('end')
  } //end of if Post
};