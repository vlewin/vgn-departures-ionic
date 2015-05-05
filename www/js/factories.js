var module = angular.module('vgn.services', [])
var server_url = 'http://192.168.178.26:3001';

module.factory('Station', function($rootScope, $resource) {
  return $resource(server_url + '/suggestions/:id');
})

module.factory('Departure', function($rootScope, $resource, $filter) {
  var Departure = $resource(server_url + '/departures/:id');

  Departure.prototype.time = function() {
    return $filter('date')(new Date(this.scheduled_time),'HH:mm');
  };

  Departure.prototype.time_left = function () {
    return $filter('time')(this.actial_time)
  }

  return Departure;
});
