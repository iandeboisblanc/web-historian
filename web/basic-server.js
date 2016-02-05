var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var CronJob = require('cron').CronJob;
var workerBot = require(__dirname + '/../workers/htmlfetcher.js');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

new CronJob('* * * * *', function() {
  console.log('running CronBot');
  workerBot.worker();
  }, null, true, 'America/Los_Angeles');

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);



if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

