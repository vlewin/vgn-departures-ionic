var module = angular.module('vgn.services', [])

module.factory('Station', function($rootScope, $resource) {
  return $resource('http://localhost:3001/suggestions/:id');
})

module.factory('Departure', function($rootScope, $resource, $filter) {
  var Departure = $resource('http://localhost:3001/departures/:id');

  Departure.prototype.time = function() {
    return $filter('date')(new Date(this.scheduled_time),'HH:mm');
  };

  Departure.prototype.time_left = function () {
    return $filter('time')(this.actial_time)
  }

  return Departure;
});
