var module = angular.module('vgn.services', [])

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

module.factory('Station', function($rootScope, $resource) {
  return $resource($rootScope.api_url + '/suggestions/:id');
})

module.factory('Departure', function($rootScope, $resource, $filter) {
  var Departure = $resource($rootScope.api_url + '/departures/:id');

  Departure.prototype.time = function() {
    return $filter('date')(new Date(this.scheduled_time),'HH:mm');
  };

  Departure.prototype.time_left = function () {
    return $filter('time')(this.actial_time)
  }

  return Departure;
})

module.factory('Favorite', function($rootScope, $resource, $localStorage) {
  function Favorite(data) {
      for (attr in data) {
          if (data.hasOwnProperty(attr)) {
              this[attr] = data[attr];
          }
      }
  }

  Favorite.exist = function(favorite) {
    if(favorite) {
      var f = _.find(this.all(), function(f){ return f.id == favorite.id})
      return f ? true : false
    } else {
      return false;
    }
  };

  Favorite.remove = function(favorite) {
    var favorites = this.all();
    console.log(favorite)
    favorites = _.reject(favorites, function(f){ return f.id == favorite.id });
    $localStorage.setObject('favorites', favorites)

    console.log(favorites)
    return favorites;
  };

  Favorite.push = function(favorite) {
    var favorites = this.all();

    if(!_.find(favorites, function(f){ return f.id == favorite.id})) {
      favorites.push(favorite);
      $localStorage.setObject('favorites', favorites)
    }

    return favorites;
  };

  Favorite.all = function() {
    var favorites = $localStorage.getObject('favorites')
    if(favorites.length) {
      return favorites;
    } else {
      return [];
    }
  };

  return Favorite;
})
