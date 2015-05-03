var module = angular.module('vgn.services', [])

module.factory('Station', function($rootScope, $resource) {
  return $resource('http://localhost:3001/suggestions/:id');
})

module.factory('Departure', function($rootScope, $resource) {
  var Departure = $resource('http://localhost:3001/departures/:id');

  Departure.prototype.time = function() {
    return new Date(this.timestamp);
  };

  Departure.prototype.time_left = function () {
      // FIXME: Move to custom filter !!!
      var now = new Date().getTime() - 30000;
      var departure_time = new Date(this.timestamp).getTime();
      var diff = (departure_time-now)/60000;

      return Math.round(diff) + ' minute(s) left'
  }

  return Departure;
});
