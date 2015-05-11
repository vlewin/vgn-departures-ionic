angular.module('vgn.controllers', [])

.controller('DeparturesCtrl', function($scope, $resource, $filter, $state, $ionicLoading, $ionicModal, Station, Departure, Favorite) {
  $scope.tags = [];
  $scope.departures_cache = null;
  $scope.favorites = Favorite.all();
  $scope.station = $state.params;

  $scope.updateClock = function() {
    $scope.time = $filter('date')(new Date(),'HH:mm');
  };

  $scope.initClock = function() {
    $scope.date = $filter('date')(new Date(),'dd.MM.yy');

    var timer = setInterval(function() {
      $scope.$apply($scope.updateClock);
    }, 1000);
  }

  $scope.contact = {
    name: 'Mittens Cat',
    info: 'Tap anywhere on the card to open the modal'
  }

  $ionicModal.fromTemplateUrl('suggestions_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

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

    var nodes = ['s:3000510', 's:3001970', 's:3000704'];
    $scope.limit = (nodes.indexOf(station.id) !== -1) ? 24 : 12;
    $scope.isFavorite(station);
    $scope.station = station;
    $scope.suggestions = $scope.favorites = null;

    Departure.query({ station: station.id, limit: 30 }, function(departures) {
      $scope.departures_cache = $scope.departures = departures;
      $scope.closeModal();
      $ionicLoading.hide();
    });

    $scope.$watch('departures', function (newValue, oldValue, scope) {
     var valid = [];
     var now = new Date().getTime();

     for(var i in newValue) {
       if(newValue[i].actial_time >= now) {
         valid.push(newValue[i]);
       }

      $scope.departures = valid;
     }
    }, true);
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
  $scope.supportedPlatform = function(){
    var platforms = ['iPhone', 'iPad', 'Android']
    var standalone = window.navigator.standalone
    var supported = _.find(platforms, function(p){ return p == window.navigator.platform; })
    return (supported && !standalone)
  }

  $scope.help = function(){
    $rootScope.ath_popup.show(true)
  }
})

.controller('SettingsCtrl', function($rootScope, $scope, $localStorage) {
  $scope.save = function() {
    $rootScope.api_url = $scope.api_url;
    $localStorage.set('api_url', $scope.api_url);
  }
});
