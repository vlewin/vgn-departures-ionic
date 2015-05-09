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

var API = 'http://vgn.herokuapp.com'
module.factory('Station', function($rootScope, $resource) {
  return $resource(API + '/suggestions/:id');
})

module.factory('Departure', function($rootScope, $resource, $filter) {
  var Departure = $resource(API + '/departures/:id');
  function Departure(data) {
      for (attr in data) {
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
    var now = new Date().getTime()
    var soon = now + 300000;
    this.expired = this.actial_time < now
    this.about_to_expire = this.actial_time <= soon;
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

    favorites = _.reject(favorites, function(f){ return f.id == favorite.id });
    $localStorage.setObject('favorites', favorites)

    return favorites;
  };

  Favorite.push = function(favorite) {
    var favorites = this.all();

    if (_.isEmpty(favorite)) {
      return;
    } else {
      if(!_.find(favorites, function(f){ return f.id == favorite.id})) {
        favorites.push(favorite);
        $localStorage.setObject('favorites', favorites)
      }
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
