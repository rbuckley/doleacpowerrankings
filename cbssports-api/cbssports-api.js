angular.module('CBSSportsAPI', ['ngResource', 'ui.route']);

angular.module('CBSSportsAPI').config(['$httpProvider', '$resourceProvider', function($httpProvider, $resourceProvider) {
   $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
   $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With';
}]);

function parseCBSSportsURL(url) {
   var tokens = [];
   if (url) {
      var tokensList = url.split('?')[1].split('#')[0].split('&');
      for (var i = 0; i < tokensList.length; i++)
      {
         var pair = tokensList[i].split('=');
         tokens[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
   }
   return tokens;
}

angular.module('CBSSportsAPI').factory('cbsAPI', ['$resource', '$location', '$stateParams', 
      function($resource, $location, $stateParams) {

         var basePath = 'http://api.cbssports.com/fantasy/';
         var apiVers = '3.0';

         var cbssportsApi = {};

         var cbssportsTokens = parseCBSSportsURL($location.absUrl());

         var _test = function() {
            return "hello api";
         };

         var _getOwners = function() {
            return $resource(basePath + 'league/owners?access_token=' + cbssportsTokens['access_token'] + '&response_format=JSON');
         };

         cbssportsApi.test = _test;
         cbssportsApi.getOwners = _getOwners;

         return cbssportsApi;
}]);

