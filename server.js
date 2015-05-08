require('newrelic');

var compression = require('compression');
var express = require('express');
var http = require('http');
var cheerio = require("cheerio");
var path    = require("path");
var portNumber = 3001;
var app = express();


app.use(express.static('www'))
app.use(compression())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Routing
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname+'/views/index.html'));
})

app.get("/suggestions", function (request, response) {
  console.log("*** /suggestions => Incomming request");
  console.log(request.query)

  var station = request.query.station;

  if(station.indexOf('Nürnberg') === -1) {
    station = 'Nürnberg, ' + request.query.station
    console.log(request.query.station + ' >>> ' + station)
  }

  var api_url = "http://m.vgn.de/ib/site/tools/EFA_Suggest_v2.php?country=No&query=" + station

  console.log('API: ' + api_url)

  http.get(api_url, function(res) {
    var chunks = [];

    res.on('data', function(chunk){
      chunks.push(chunk);
    });

    res.on('end', function(){
      var json = JSON.parse(chunks.join('').toString())
      var suggestions = []
      for (var i = 0; i < json.suggestions.length; i++) {
        if(json.icons[i] === 'Haltestelle') {
          suggestions.push({ name: json.suggestions[i], type: json.icons[i], id: json.data[i] })
        }
      }

      response.send(suggestions);
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    response.jsonp({ status: 'ERROR', response: e.message });
  });

})

app.get("/departures", function (request, response) {
  console.log("*** /departures => Incomming request");
  console.log(request.query)

  var id = request.query.station
  var limit = request.query.limit;

  // var api_url = 'http://m.vgn.de/echtzeit-abfahrten/?sl=s%3A3000331&slb=N%C3%BCrnberg%2C+Maxfeld&s=N%C3%BCrnberg%2C+Maxfeld&ts=1427224767&query_date=abfragen'
  var api_url = 'http://m.vgn.de/echtzeit-abfahrten/?sl=' + id

  http.get(api_url, function(res) {
    console.log("Got response: " + res.statusCode);
    var chunks = [];

    res.on('data', function(chunk){
      chunks.push(chunk);
    });

    res.on('end', function(){
      var html = chunks.join('').toString();
      var departures = parseHTML(html).slice(0,limit);
      response.send(departures);
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    response.jsonp({ status: 'ERROR', response: e.message });
  });
})

// HELPERS
function parseHTML(html) {
  var $ = cheerio.load(html);

  var list = $('ul.r-Result li');
  var times = list.find('div.deptime').find('b')
  var transports = list.find("div[style='display:table-cell']")
  var departures = []

  times.each(function(index) {
    var time_cell = $(this).text();
    var scheduled_time = scheduledTime(time_cell.trim());
    var actial_time = actualTime(time_cell.trim());
    var now = (new Date).getTime() + 60000;
    var delay = time_cell.indexOf('+') > -1 ? '+' + time_cell.split('+').pop() : 0;
    var public_transport = ['Straßenbahn', 'Stadtbus', 'U-Bahn', 'S-Bahn']

    if(actial_time > now) {
      var info_cell = $(transports[index]).text()
      var transport_long = info_cell.split(',').shift().trim()
      var transport_array = transport_long.split(' ');
      var transport = transport_array.shift();
      var line = transport_array.pop();
      var direction = info_cell.split(',').pop().trim().replace('Nürnberg ', '').split('(')[0]

      if(public_transport.contains(transport)) {
        departures.push({
          scheduled_time: scheduled_time,
          actial_time: actial_time,
          transport: transport,
          transport_long: transport_long,
          line: line,
          direction: direction,
          delay: delay
        })
      }
    }
  });

  return departures
}

// FIXME: merge scheduledTime and actualTime together
// handle exception cases e.g. '10:00 Halt entfällt' correctly
function scheduledTime(string){
  try {
    var date = new Date
    var hh = string.split(':')[0]
    var mm = string.split(':')[1].split('+').shift()
    var mm = eval(mm)

    date.setHours(hh);
    date.setMinutes(mm);
    date.setSeconds(00);
  } catch(e) {
    console.error(e),
    date.setHours(00);
    date.setMinutes(00);
    date.setSeconds(00);
  }

  return date.getTime();
}

// FIXME: merge scheduledTime and actualTime together
// handle exception cases e.g. '10:00 Halt entfällt' correctly
function actualTime(string){
  try {
    var date = new Date
    var hh = string.split(':')[0]
    var mm = eval(string.split(':')[1])

    date.setHours(hh);
    date.setMinutes(mm);
    date.setSeconds(00);
  } catch(e) {
    console.error(e),
    date.setHours(00);
    date.setMinutes(00);
    date.setSeconds(00);
  }

  return date.getTime();
}

// http://m.vgn.de/komfortauskunft/auskunft/?sl=s%3A3000331&zl=s%3A3000503&d=2015-05-04&t=20%3A41&da=dep&ts=1430764903&query_date=abfragen

Array.prototype.contains = function ( needle ) {
    for (var i = 0; i < this.length; i++) {
        if(needle.indexOf(this[i]) > -1) return true;
    }
   return false;
}


// http.createServer(app).listen(process.env.PORT || 3001);
app.listen(process.env.PORT || 3001);

console.log("Responding server listening on port "+portNumber);

