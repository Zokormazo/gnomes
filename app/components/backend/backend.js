
'use strict';

angular.module('myApp.backend', [])

.factory('BackendService', function($http, dataUrl) {
  let backendService = {};

  backendService.gnomes = [];

  backendService.load = function() {
    return $http.get(dataUrl)
      .then( function(response) {
        backendService.gnomes = response.data.Valderrobres;
      });
  };

  backendService.getList = function() {
    return backendService.gnomes;
  };

  return backendService;
});
