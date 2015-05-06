angular.module('vgn.controllers', [])

.controller('DeparturesCtrl', function($scope, $resource, $filter, $ionicLoading, Station, Departure, Favorite) {
  $scope.tags = [];
  $scope.response = null;
  // $scope.tags = [
  //   { type: 'station', name: 'test' }
  // ];

  // $scope.suggestions = [
  //   {"name":"Nürnberg, Aufseßplatz","type":"Haltestelle","id":"s:3000534"},
  //   {"name":"Nürnberg, Nürnberg Hbf","type":"Haltestelle","id":"s:3000510"},
  //   {"name":"Nürnberg, Maxfeld","type":"Haltestelle","id":"s:3000331"}
  // ];

  $scope.favorites = Favorite.all();

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
      Station.query({ station: $scope.station}, function(suggestions) {
        $scope.suggestions =  suggestions
      });
    }, 500);
  }

  $scope.clearSearch = function() {
    $scope.station = $scope.departures = null;
    $scope.favorites = Favorite.all();
    $scope.tags = [];
  }

  $scope.isFavorite = function(station) {
    return Favorite.exist(station)
  }

  $scope.addToFavorites = function(favorite) {
    Favorite.push(favorite);
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
    $scope.departures = $scope.response;

    for(i in $scope.tags) {
      var tag = $scope.tags[i];
      var expression = {};

      expression[tag.type] = tag.name
      $scope.departures = $filter('filter')($scope.departures, expression);
    }
  }

  $scope.loadDepartures = function(station) {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner spinner-assertive" icon="ripple"></ion-spinner>',
      hideOnStageChange: false
    });

    $scope.station = station.name;
    $scope.current_station = station;
    $scope.suggestions = $scope.favorites = null;

    Departure.query({ station: station.id, limit: 30 }, function(departures) {
      $scope.response = $scope.departures = departures;
      $ionicLoading.hide();
    });
  };

  $scope.initClock();
  // $scope.loadDepartures({ id: 's:3000331'})
})

.controller('FavoritesCtrl', function($rootScope, $scope, $localStorage, $ionicModal, Favorite) {
  $scope.favorites = Favorite.all();
  $scope.shouldShowDelete = false;

  // $ionicModal.fromTemplateUrl('templates/_favorite-dialog.html', function(modal) {
  //   $scope.addDialog = modal;
  // }, {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // });
  //
  // $scope.showAddChangeDialog = function() {
  //   $scope.action = 'add';
  //   $scope.addDialog.show();
  // };
  //
  // $scope.leaveAddChangeDialog = function() {
  //   // Remove dialog
  //   $scope.addDialog.remove();
  //   // Reload modal template to have cleared form
  //   $ionicModal.fromTemplateUrl('templates/_favorite-dialog.html', function(modal) {
  //     $scope.addDialog = modal;
  //   }, {
  //     scope: $scope,
  //     animation: 'slide-in-up'
  //   });
  // };

  // $scope.add = function(form) {
  //   var newItem = {};
  //   newItem.description = form.description.$modelValue;
  //   $scope.favorites.push(newItem);
  //   $scope.leaveAddChangeDialog();
  // };
  //
  $scope.edit = function() {
    if($scope.shouldShowDelete) {
      $scope.shouldShowDelete = false;
    } else {
      $scope.shouldShowDelete = true;
    }
  }

  $scope.delete = function(favorite){
    console.log("Delete from favorites")
    $scope.favorites = Favorite.remove(favorite)
  }
})

.controller('SettingsCtrl', function($rootScope, $scope, $localStorage) {
  $scope.save = function() {
    $rootScope.api_url = $scope.api_url;
    $localStorage.set('api_url', $scope.api_url);
  }
});
