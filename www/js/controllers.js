angular.module('vgn.controllers', [])

.controller('DeparturesCtrl', function($scope, $resource, Suggestion) {
  $scope.search = null;
  $scope.suggestions = ['aaa', 'aba', 'aab']
  $scope.departures = ['Maxfeld', 'Hauptbahnhof', 'Plärrer']

  $scope.search = function() {
      Suggestion.query({ station: $scope.station}, function(suggestions) {
        $scope.suggestions =  employees
      });
  }
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


