require('newrelic');
var compression = require('compression');
var express = require('express');
var http = require('http');
var cheerio = require("cheerio");
var dateFormat = require('dateformat');
var path    = require("path");
var portNumber = 3001;
var app = express();

app.use(compression());
app.use(express.static('www'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routing
app.get("/suggestions", function (request, response) {
  console.log("*** /suggestions => Incomming request");
  console.log(request.query);

  var station = request.query.station;

  // if(station.indexOf('Nürnberg') === -1) {
  //   station = 'Nürnberg, ' + request.query.station;
  //   console.log(request.query.station + ' >>> ' + station);
  // }

  var api_url = "http://m.vgn.de/ib/site/tools/EFA_Suggest_v2.php?country=No&query=" + station;

  console.log('API: ' + api_url);

  http.get(api_url, function (res) {
    var chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function () {
      var cities = ['Nürnberg', 'Fürth', 'Erlangen'];
      var json = JSON.parse(chunks.join('').toString());
      var suggestions = [];
      for (var i = 0; i < json.suggestions.length; i++) {
        if(json.icons[i] === 'Haltestelle' && cities.contains(json.suggestions[i])) {
          suggestions.push({ name: json.suggestions[i], type: json.icons[i], id: json.data[i] });
        }
      }

      response.send(suggestions);
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    response.jsonp({ status: 'ERROR', response: e.message });
  });

});

app.get("/departures", function (request, response) {
  console.log("*** /departures => Incomming request");
  console.log(request.query);

  var id = request.query.station;
  var limit = request.query.limit;
  var api_url = 'http://m.vgn.de/echtzeit-abfahrten/?sl=' + id;

  console.log('API: ' + api_url);

  http.get(api_url, function(res) {
    console.log("Got response: " + res.statusCode);
    var chunks = [];

    res.on('data', function(chunk){
      chunks.push(chunk);
    });

    res.on('end', function(){
      var nodes = ['s:3000510', 's:3001970', 's:3000704', 's:3002110', 's:3003110'];
      limit = (nodes.indexOf(id) !== -1) ? 50 : limit;

      var html = chunks.join('').toString();
      var departures = parseDeparturesHTML(html).slice(0,limit);
      response.send(departures);
   });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    response.jsonp({ status: 'ERROR', response: e.message });
  });
});

app.get("/connections", function (request, response) {
  console.log("*** /connections => Incomming request");
  console.log(request.query);

  // var sl = 's:3000510';
  // var zl = 's:3000331';

  // var sl = 's:3000331';
  // var zl = 's:3000533';
  // var zl = 's:3000534';

  var sl = request.query.sl;
  var zl = request.query.zl;

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
      response.send(parseConnectionsHTML(html));
   });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    response.jsonp({ status: 'ERROR', response: e.message });
  });
});

// HELPERS
function parseDeparturesHTML(html) {
  var $ = cheerio.load(html);

  var list = $('ul.r-Result li');
  var times = list.find('div.deptime').find('b');
  var transports = list.find("div[style='display:table-cell']");
  var departures = [];

  times.each(function(index) {
    var time_cell = $(this).text();
    var scheduled_time = scheduledTime(time_cell.trim());
    var actial_time = actualTime(time_cell.trim());

    var now = new Date().getTime();
    var delay = time_cell.indexOf('+') > -1 ? '+' + time_cell.split('+').pop() : 0;
    var public_transport = ['Straßenbahn', 'Stadtbus', 'U-Bahn', 'S-Bahn'];

    if(actial_time >= now) {
      var info_cell = $(transports[index]).text();
      var transport_long = info_cell.split(',').shift().trim();
      var transport_array = transport_long.split(' ');
      var transport = transport_array.shift();
      var line = transport_array.pop();
      var direction = info_cell.split(',').pop().trim().replace('Nürnberg ', '').split('(')[0];

      if(public_transport.contains(transport)) {
        departures.push({
          scheduled_time: scheduled_time,
          actial_time: actial_time,
          transport: transport,
          transport_long: transport_long,
          line: line,
          direction: direction,
          delay: delay
        });
      }
    }
  });

  return departures;
}

function parseConnectionsHTML(html) {
  var $ = cheerio.load(html);

  var container = $('div.content-primary');
  var headers = container.find('h3');
  var infos = container.find('p');
  var connections = [];

  headers.each(function(i) {
    var connecton = $(headers[i]);
    var times = connecton.find('b');
    var images = connecton.find('img');
    var info = $(infos[i]);
    var transports = [];

    for(var j=0; j < images.length; j++) {
      var array = images[j].attribs.title.split(' ');

      transports.push({
        transport: array[0],
        line: array[1]
      });
    }

    connections.push({
      start: $(times[0]).text().to_timestamp(),
      end: $(times[times.length-1]).text().to_timestamp(),
      transports: transports,
      info: info.text()
    });
  });

  return connections;
}

// FIXME: merge scheduledTime and actualTime together
// handle exception cases e.g. '10:00 Halt entfällt' correctly
function scheduledTime(string){
  var date = new Date();

  try {
    var hh = string.split(':')[0];
    var mm = string.split(':')[1].split('+').shift();
    mm = eval(mm);

    date.setHours(hh);
    date.setMinutes(mm);
    date.setSeconds(0);
  } catch(e) {
    console.log("Error: " + e);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
  }

  return date.getTime();
}

function actualTime(string){
  var date = new Date();

  try {
    var hh = string.split(':')[0];
    var mm = eval(string.split(':')[1]);

    date.setHours(hh);
    date.setMinutes(mm);
    date.setSeconds(0);
  } catch(e) {
    console.log("Error: " + e);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
  }

  return date.getTime();
}

// VERBINDUNGEN URL
// http://m.vgn.de/komfortauskunft/auskunft/?sl=s:3000331&zl=s:3000503&d=2015-05-17&t=20:41&query_date=abfragen

String.prototype.to_timestamp = function() {
  return (new Date (new Date().toDateString() + ' ' + this)).getTime()
}

Array.prototype.contains = function ( needle ) {
    for (var i = 0; i < this.length; i++) {
        if(needle.indexOf(this[i]) > -1) return true;
    }
   return false;
};


http.createServer(app).listen(process.env.PORT || 3001);
// app.listen(process.env.PORT || 3001);

console.log("Responding server listening on port "+ portNumber);
