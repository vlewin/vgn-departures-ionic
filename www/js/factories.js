var module = angular.module('vgn.factories', [])

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

var API = 'http://vgn.herokuapp.com';
// var API = 'http://localhost:3001';

module.factory('Station', function($resource) {
  return $resource(API + '/suggestions/:id');
});

module.factory('Departure', function($resource, $filter) {
  var Departure = $resource(API + '/departures/:id');
  function Departure(data) {
      for(var attr in data) {
          if (data.hasOwnProperty(attr)) {
              this[attr] = data[attr];
          }
      }
      this.time = $filter('date')(new Date(this.scheduled_time),'HH:mm');
      this.expired = false;
      this.about_to_expire = false;
  }

  Departure.prototype.time = function() {
    return $filter('date')(new Date(this.scheduled_time),'HH:mm');
  };

  Departure.prototype.time_left = function () {
    var now = Date.now();
    var soon = now + 300000;

    this.expired = this.actial_time + 10000 <= now;
    this.about_to_expire = this.actial_time <= soon;

    return $filter('time')(this.actial_time);
  };

  return Departure;
});

module.factory('Connection', function($resource, $filter) {
  var Connection = $resource(API + '/connections/:id');

  Connection.prototype.departure = function() {
    return $filter('date')(new Date(this.start),'HH:mm');
  };

  Connection.prototype.arrival = function() {
    return $filter('date')(new Date(this.end),'HH:mm');
  };

  return Connection;
});

module.factory('Favorite', function($resource, $localStorage) {
  function Favorite(data) {
      for (var attr in data) {
          if (data.hasOwnProperty(attr)) {
              this[attr] = data[attr];
          }
      }
  }

  Favorite.last = function() {
    return _.last(this.all());
  };

  Favorite.exist = function(favorite) {
    if(favorite) {
      var f = _.find(this.all(), function(f){ return f.id == favorite.id});
      return f ? true : false;
    } else {
      return false;
    }
  };

  Favorite.remove = function(favorite) {
    var favorites = this.all();
    favorites = _.reject(favorites, function(f){ return f.id == favorite.id });
    $localStorage.setObject('favorites', favorites);

    return favorites;
  };

  Favorite.push = function(favorite) {
    var favorites = this.all();

    if (_.isEmpty(favorite)) {
      return;
    } else {
      if(!_.find(favorites, function(f){ return f.id == favorite.id})) {
        favorites.push(favorite);
        $localStorage.setObject('favorites', favorites);
      }
    }

    return favorites;
  };

  Favorite.all = function() {
    var favorites = $localStorage.getObject('favorites');
    if(favorites.length) {
      return favorites;
    } else {
      return [];
    }
  };

  return Favorite;
});
