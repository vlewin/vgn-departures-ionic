angular.module('vgn', ['ionic', 'ngResource', 'templates', 'vgn.controllers', 'vgn.services', 'vgn.filters'])

.run(function($ionicPlatform, $rootScope, $state, $localStorage, $ionicScrollDelegate, Favorite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  })

  $rootScope.showAddToHomePopup = function() {
    $rootScope.ath_popup = addToHomescreen({
      // debug: 'android',
      skipFirstVisit: false,      // show at first access
      startDelay: 0,              // display the message right away
      lifespan: 0,                // do not automatically kill the call out
      displayPace: 0,             // do not obey the display pace
      privateModeOverride: true,  // show the message in private mode
      maxDisplayCount: 2          // do not obey the max display count
    });
  }

  $rootScope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true)
  };


  $rootScope.isFavorite = function(station) {
    $rootScope.favorite = Favorite.exist(station)
  }

  $rootScope.addFavorite = function(station) {
    Favorite.push(station);
    $rootScope.favorite = Favorite.exist(station);
    $rootScope.favorites = Favorite.all();
  }

  $rootScope.removeFavorite = function(station) {
    Favorite.remove(station);

    $rootScope.favorite = null;
    $rootScope.favorites = Favorite.all();
  }

  $rootScope.favorites = Favorite.all();
  $rootScope.favorite = Favorite.last();

  $rootScope.showAddToHomePopup()
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "tabs.html"
  })

  .state('tab.departures', {
    url: '/departures?id&name',
    views: {
      'tab-departures': {
        templateUrl: 'tab-departures.html',
        controller: 'DeparturesCtrl'
      }
    }
  })

  .state('tab.connections', {
    url: '/connections',
    views: {
      'tab-connections': {
        templateUrl: 'tab-connections.html',
        controller: 'ConnectionsCtrl'
      }
    }
  })

  .state('tab.favorites', {
    cache: false,
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'tab-favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('tab.info', {
    cache: false,
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'tab-info.html',
        controller: 'InfoCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/departures');

});
