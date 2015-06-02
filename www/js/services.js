var module = angular.module('vgn.services', [])

module.factory('ionicModalService', function($ionicModal, Station) {
  var scope = null;
  return {

    init: function(scope) {
      this.scope = scope;

      $ionicModal.fromTemplateUrl('suggestions_modal.html', {
        scope: scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        scope.modal = modal
      })

      // Angular callbacks
      scope.$on('$destroy', function() {
        scope.modal.remove();
      });
    },

    search: function() {
      var scope = this.scope;
      if(scope.timeout) { clearTimeout(scope.timeout); }

      scope.timeout = setTimeout(function() {
        Station.query({ station: scope.station.name}, function(suggestions) {
          scope.suggestions = suggestions;
        });
      }, 500);
    },

    reset: function() {
      this.scope.station = {};
      this.scope.suggestions = [];
    }
  }
});
