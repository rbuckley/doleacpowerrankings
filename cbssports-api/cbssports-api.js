angular.module('CBSSportsAPI', ['ngResource', 'ui.route']);

angular.module('CBSSportsAPI').config(['$httpProvider', '$resourceProvider', function($httpProvider, $resourceProvider) {
      $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin';
      $httpProvider.defaults.headers.common['Content-Type'] = 'application/application-json';
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

function parseCBSSportsURL(url) {
   var tokens = [];
   var queries = url.split('?');
   if (queries[1])
   {
      var tokensList = url.split('?')[1].split('#')[0].split('&');
      for (var i = 0; i < tokensList.length; i++)
      {
         var pair = tokensList[i].split('=');
         tokens[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
   }
   return tokens;
}

angular.module('CBSSportsAPI').factory('cbsAPI', ['$resource', '$location', '$http', 
      function($resource, $location, $http) {

         var basePath = 'http://api.cbssports.com/fantasy/';
         var apiVers = '3.0';

         var cbssportsApi = {};

         var cbssportsTokens = parseCBSSportsURL($location.absUrl());

         var _test = function() {
            return "hello api";
         };

         var _get = function(url) {
            return $resource(basePath + url,
               {
                  access_token: cbssportsTokens['access_token'],
                  response_format: 'JSON',
                  callback: "JSON_CALLBACK"
               },
               {
                  get: {
                     method: 'JSONP'
                  }
               }
            );
         };

         var _getOwners = function() {
            return _get('league/owners');
         };

         var _getStandings = function() {
            return _get('league/standings/overall');
         };

         cbssportsApi.test = _test;
         cbssportsApi.getOwners = _getOwners;
         cbssportsApi.getStandings = _getStandings;

         return cbssportsApi;
}]);

