angular.module('vgn', ['ionic', 'ngResource', 'templates', 'vgn.controllers', 'vgn.services', 'vgn.filters'])

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

    $rootScope.api_url = $localStorage.get('api_url') || 'http://vgn.herokuapp.com'
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
    templateUrl: "tabs.html"
  })

  .state('tab.departures', {
    url: '/departures',
    views: {
      'tab-departures': {
        templateUrl: 'tab-departures.html',
        controller: 'DeparturesCtrl'
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
