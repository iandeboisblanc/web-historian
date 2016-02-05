// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require(__dirname + '/../helpers/archive-helpers.js');

var worker = function() {
  archive.readListOfUrls(function(urls) {
  archive.downloadUrls(urls);
    // for(var i = 0; i < urls.length; i++) {
  //   var url = urls[i];
  //   archive.isUrlArchived(url, function(is) {
  //     if(!is) {

  //     }
  //   })
  // }
  });
};

exports.worker = worker;