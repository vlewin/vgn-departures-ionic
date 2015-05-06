angular.module('vgn.controllers', [])

.controller('DeparturesCtrl', function($scope, $resource, $filter, $ionicLoading, Station, Departure) {
  $scope.tags = [];
  $scope.response = null;
  // $scope.tags = [
  //   { type: 'station', name: 'test' }
  // ];

  $scope.suggestions = [
    {"name":"Nürnberg, Aufseßplatz","type":"Haltestelle","id":"s:3000534"},
    {"name":"Nürnberg, Nürnberg Hbf","type":"Haltestelle","id":"s:3000510"},
    {"name":"Nürnberg, Maxfeld","type":"Haltestelle","id":"s:3000331"}
  ];

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
    $scope.station = $scope.suggestions = $scope.departures = $scope.tags = null;
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
    $scope.suggestions = null;

    Departure.query({ station: station.id, limit: 30 }, function(departures) {
      $scope.response = $scope.departures = departures;
      $ionicLoading.hide();
    });
  };

  $scope.initClock();
  // $scope.loadDepartures({ id: 's:3000331'})
})

.controller('SettingsCtrl', function($rootScope, $scope, $localStorage) {
  $scope.save = function() {
    $rootScope.api_url = $scope.api_url;
    $localStorage.set('api_url', $scope.api_url);
  }
});
