angular.module('vgn.controllers', [])

.controller('DeparturesCtrl', function($scope, $resource, $filter, Station, Departure) {
  $scope.updateClock = function() {
    $scope.clock = $filter('date')(new Date(),'HH:mm:ss');
  };

  $scope.initClock = function() {
    var timer = setInterval(function() {
      $scope.$apply($scope.updateClock);
    }, 1000);
  }

  $scope.search = function() {
    $scope.departures = null;

    Station.query({ station: $scope.station}, function(suggestions) {
      $scope.suggestions =  suggestions
    });
  }

  $scope.clearSearch = function() {
    $scope.station = $scope.suggestions = $scope.departures = null;
  }

  $scope.loadDepartures = function(station) {
    $scope.station = station.name;
    $scope.suggestions = null;

    Departure.query({ station: station.id, limit: 10 }, function(departures) {
      $scope.departures = departures;
    });
  };

  $scope.initClock();
  // $scope.loadDepartures({ id: 's:3000331'})
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
