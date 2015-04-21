angular.module('vgn.services', []).factory('Suggestion', function($rootScope, $resource) {
  return $resource('http://localhost:3001/suggestions/:id');
});
