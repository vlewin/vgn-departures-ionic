var http = require('http');
var cheerio = require("cheerio");
var dateFormat = require('dateformat');



var sl = 's:3000510';
var zl = 's:3000331';

var today = new Date();
var date = dateFormat(today, "yyyy-mm-dd");
var time = dateFormat(today,  "HH:MM");

// http://m.vgn.de/komfortauskunft/auskunft/?sl=s:3000331&zl=s:3000503&d=2015-05-17&t=20:41&query_date=abfragen
var api_url = 'http://m.vgn.de/komfortauskunft/auskunft/?sl=' + sl + '&zl=' + zl + '&d=' + date + '&t=' + time + '&query_date=abfragen'

console.log(api_url)

http.get(api_url, function(res) {
  console.log("Got response: " + res.statusCode);
  var chunks = [];

  res.on('data', function(chunk){
    chunks.push(chunk);
  });

  res.on('end', function(){
    var html = chunks.join('').toString();
    parseConnectionsHTML(html);
 });

}).on('error', function(e) {
  console.log("Got error: " + e.message);
  response.jsonp({ status: 'ERROR', response: e.message });
});

function parseConnectionsHTML(html) {
  var $ = cheerio.load(html);

  var container = $('div.content-primary');
  var headers = container.find('h3');
  var infos = container.find('p');
  var connections = [];

  debugger

  headers.each(function(i) {
    var connecton = $(headers[i]);
    var times = connecton.find('b');
    var images = connecton.find('img');
    var info = $(infos[i]);
    var transports = [];

    for(var j=0; j < images.length; j++) {
      transports.push(images[j].attribs.title);
    }

    connections.push({
      start: $(times[0]).text(),
      end: $(times[times.length-1]).text(),
      transports: transports,
      info: info.text()
    });
  });

  return connections;
}
