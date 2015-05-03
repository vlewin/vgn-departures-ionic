angular.module('vgn.controllers', [])

.controller('DeparturesCtrl', function($scope, $resource, Station, Departure) {
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

    Departure.query({ station: station.id }, function(departures) {
      $scope.departures = departures;
    });
  };
})


.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
