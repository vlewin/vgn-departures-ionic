angular.module('vgn.controllers', [])

.controller('DeparturesCtrl', function($scope, $resource, $filter, $state, $ionicLoading, Station, Departure, Favorite) {
  $scope.tags = [];
  $scope.departures_cache = null;
  $scope.favorites = Favorite.all();
  $scope.station = $state.params;

  $scope.updateClock = function() {
    $scope.clock = $filter('date')(new Date(),'HH:mm:ss');
  };

  $scope.initClock = function() {
    var timer = setInterval(function() {
      $scope.$apply($scope.updateClock);
    }, 1000);
  }

  $scope.search = function() {
    $scope.favorites = $scope.departures = null;

    if($scope.timeout) {
      clearTimeout($scope.timeout);
    }

    $scope.timeout = setTimeout(function() {
      Station.query({ station: $scope.station.name}, function(suggestions) {
        $scope.suggestions =  suggestions
      });
    }, 500);
  }

  $scope.clearSearch = function() {
    $scope.departures = $scope.favorite = null;
    $scope.station = {};
    $scope.tags = [];

    $scope.favorites = Favorite.all();
  }

  $scope.isFavorite = function(station) {
    $scope.favorite = Favorite.exist(station)
  }

  $scope.addFavorite = function(station) {
    Favorite.push(station);
    $scope.favorite = Favorite.exist(station)
  }

  $scope.removeFavorite = function(station) {
    $scope.favorite = null;
    Favorite.remove(station);
  }


  $scope.addTag = function(tag) {
    if(!_.findWhere($scope.tags, tag)) {
      $scope.tags.push(tag);
    }

    $scope.filter()
  }

  $scope.removeTag = function(tag) {
    $scope.tags = _.without($scope.tags, tag);

    $scope.filter()
  }

  $scope.filter = function() {
    $scope.departures = $scope.departures_cache;

    for(i in $scope.tags) {
      var tag = $scope.tags[i];
      var expression = {};

      expression[tag.type] = tag.name
      $scope.departures = $filter('filter')($scope.departures, expression);
    }
  }

  $scope.loadDepartures = function(station) {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner spinner-positive" icon="ripple"></ion-spinner>',
      hideOnStageChange: false
    });

    $scope.isFavorite(station);
    $scope.station = station;
    $scope.suggestions = $scope.favorites = null;

    Departure.query({ station: station.id, limit: 30 }, function(departures) {
      $scope.departures_cache = $scope.departures = departures;
      $ionicLoading.hide();
    });
  };

  $scope.initClock();

  if($scope.station.id) {
    $scope.loadDepartures($scope.station)
  }
  // $scope.loadDepartures({ id: 's:3000503'})
})

.controller('FavoritesCtrl', function($rootScope, $scope, $localStorage, $state, Favorite) {
  // $scope.favorites = [{name: "AAAA", id: 1}, {name: "BBBB", id: 2}]
  $scope.favorites = Favorite.all();
  $scope.editMode = false;

  $scope.go = function(station){
    $state.go('tab.departures', { id: station.id, name: station.name }, {reload: true});
  }

  $scope.edit = function() {
    if($scope.editMode) {
      $scope.editMode = false;
    } else {
      $scope.editMode = true;
    }
  }

  $scope.delete = function(favorite){
    $scope.favorites = Favorite.remove(favorite)
  }

  $scope.deleteAll = function(favorite){
    var favorites = Favorite.all();

    for(var i in favorites) {
      Favorite.remove(favorites[i])
    }

    $scope.editMode = false;
    $scope.favorites = Favorite.all()
  }
})

.controller('InfoCtrl', function($rootScope, $scope) {
  $scope.help = function(){
    console.log("Help")

    help_popup.show(true)
  }
})

.controller('SettingsCtrl', function($rootScope, $scope, $localStorage) {
  $scope.save = function() {
    $rootScope.api_url = $scope.api_url;
    $localStorage.set('api_url', $scope.api_url);
  }
});
