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

         var _getOwnersRes = function() {
            return $resource(basePath + 'league/owners', 
               {
                  access_token: cbssportsTokens['access_token'],
                  response_format: 'JSON'
               },
               {
                  response_type: 'json'
               }
            );
         };

         var _getOwnersJSONP = function() {
            return $resource(basePath + 'league/owners',
               {
                  access_token: cbssportsTokens['access_token'],
                  response_format: 'JSON',
                  callback: "JSON_CALLBACK"
               },
               {
                  getOwners: {
                     method: 'JSONP'
                  }
               }
            );
         };

         var _getOwnersHttp = function() {
              return $http({
                     url: basePath + 'league/owners',  
                     method: "GET",
                     params: {
                        'access_token': cbssportsTokens['access_token'],
                        'response_format': 'JSON'
                     }
               }).
               success(function(data) {
                  console.log("YAY");
                  return data;
               }).error(function(reason) {
                  console.log("BOOOO" + reason);
               });
         };

         cbssportsApi.test = _test;
         cbssportsApi.getOwnersJSONP = _getOwnersJSONP;
         cbssportsApi.getOwnersHttp = _getOwnersHttp;
         cbssportsApi.getOwnersRes = _getOwnersRes;

         return cbssportsApi;
}]);

