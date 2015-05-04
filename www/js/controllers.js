angular.module('vgn.controllers', [])


// app.controller('ApplicationController', function($scope, $filter) {
//   var updateClock = function() {
//     $scope.clock = $filter('date')(new Date(),'HH:mm:ss');
//   };
//
//   var timer = setInterval(function() {
//     $scope.$apply(updateClock);
//   }, 1000);
//
//   updateClock();
// });

.controller('DeparturesCtrl', function($scope, $resource, $filter, Station, Departure) {

  // var updateClock = function() {
  //   $scope.clock = $filter('date')(new Date(),'HH:mm:ss');
  // };
  //
  // var timer = setInterval(function() {
  //   $scope.$apply(updateClock);
  // }, 1000);

  // updateClock();

  $scope.search = function() {
    $scope.departures = [];

    console.log("search")
    console.log($scope.station)

    Station.query({ station: $scope.station}, function(suggestions) {
      $scope.suggestions =  suggestions
    });
  }

  $scope.loadDepartures = function(station) {
    console.log('departures')
    $scope.station = station.name;
    $scope.suggestions = [];

    Departure.query({ station: station.id, limit: 10 }, function(departures) {
      $scope.departures = departures;
    });
  };

  $scope.loadDepartures({ id: 's:3000331'})
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
