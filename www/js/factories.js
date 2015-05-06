var module = angular.module('vgn.services', [])
var server_url = 'http://192.168.178.26:3001';
var server_url = 'http://localhost:3001';
var server_url = 'http://stealth-new.suse.de:3001';

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
})

module.factory('$localStorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
});
