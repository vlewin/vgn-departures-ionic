angular.module('vgn.controllers', [])

.controller('DeparturesCtrl', function($rootScope, $scope, $resource, $filter, $state, $location, $ionicLoading, $ionicModal, $ionicPopover,
                                       Station, Departure, Favorite) {
  $scope.tags = [];
  $scope.departures_cache = null;
  $scope.station = $state.params;

  $scope.now = function(format) {
    var format = format ? format : 'HH:mm:ss';
    return $filter('date')(new Date(), format)
  }

  $scope.updateClock = function() {
    $scope.time = $scope.now('HH:mm');
  };

  $scope.initClock = function() {
    $scope.date = $filter('date')(new Date(),'dd.MM.yy');
    $scope.time = $scope.now('HH:mm');

    var timer = setInterval(function() {
      $scope.$apply($scope.updateClock);
    }, 1000);
  }

  $scope.search = function() {
    $scope.departures = null;

    if($scope.timeout) {
      clearTimeout($scope.timeout);
    }

    $scope.timeout = setTimeout(function() {
      Station.query({ station: $scope.station.name}, function(suggestions) {
        $scope.suggestions =  suggestions;
      });
    }, 500);
  }

  $scope.clearSearch = function() {
    $location.search({});
    $scope.departures = $rootScope.favorite = $scope.suggestions;
    $scope.station = {};
    $scope.tags = [];

    $rootScope.favorites = Favorite.all();
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
    $scope.station = station;
    $scope.suggestions = null;
    $rootScope.isFavorite(station);

    Departure.query({ station: station.id, limit: 35 }, function(departures) {
      $scope.departures_cache = $scope.departures = departures;
      $scope.closeModal();
      $ionicLoading.hide();

      $scope.$broadcast('scroll.refreshComplete');
    })

    $scope.$watch('departures', function (newValue, oldValue, scope) {
     var valid = [];
     var now = new Date().getTime();

     for(var i in newValue) {
       if(!newValue[i].expired) {
         valid.push(newValue[i]);
       }

      $scope.departures = valid;
     }
    }, true);
  };

  $scope.initModal = function(){

  }

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };


  // Init
  $scope.initClock();

  $ionicModal.fromTemplateUrl('suggestions_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal

    if($scope.favorite) {
      // $scope.loadDepartures($scope.favorite)
    } else {
      // $scope.modal.show()
    }
  })

  // Angular callbacks
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  if($scope.station.id) {
    $scope.loadDepartures($scope.station);
  }

  // $scope.loadDepartures({ id: 's:3000503', name: 'Nürnberg, Maxfeld' })
})

.controller('ConnectionsCtrl', function($rootScope, $scope, $resource) {

})

.controller('FavoritesCtrl', function($rootScope, $scope, $localStorage, $state, Favorite) {
  $rootScope.favorites = Favorite.all();
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
    $rootScope.favorites = Favorite.remove(favorite)
    // $rootScope.favorites = Favorite.all();
  }

  $scope.deleteAll = function(favorite){
    var favorites = Favorite.all();

    for(var i in favorites) {
      Favorite.remove(favorites[i])
    }

    $scope.editMode = false;
    $rootScope.favorites = Favorite.all()
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
