angular.module('vgn', ['ionic', 'ngResource', 'vgn.controllers', 'vgn.services', 'vgn.filters'])

.run(function($ionicPlatform, $rootScope, $localStorage, $ionicScrollDelegate) {
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

    $rootScope.api_url = $localStorage.get('api_url') || 'http://localhost:3001'
  })

  $rootScope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true)
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  .state('tab.departures', {
    url: '/departures',
    views: {
      'tab-departures': {
        templateUrl: 'templates/tab-departures.html',
        controller: 'DeparturesCtrl'
      }
    }
  })

  .state('tab.favorites', {
    cache: false,
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'templates/tab-favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/departures');

});
