angular.module('CBSSportsAPI', ['ngResource']);

angular.module('CBSSportsAPI').factory('cbsAPI', ['$resource', 
   function($resource) {

      var basePath = 'http://api.cbssports.com/fantasy/';
      var apiVers = '3.0';

      var cbssportsApi = {};

      var _test = function() {
         return "hello api";
      };

      cbssportsApi.test = _test;

      return cbssportsApi;
}]);
