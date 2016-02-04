// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require(__dirname + '/../helpers/archive-helpers/js');

archive.readListOfUrls(function(urls) {
  // for(var i = 0; i < urls.length; i++) {
  //   var url = urls[i];
  //   archive.isUrlArchived(url, function(is) {
  //     if(!is) {

  //     }
  //   })
  // }
  archive.downloadUrls(urls);
})