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

angular.module('CBSSportsAPI').factory('cbsAPI', ['$resource', '$location', '$log', '$q', 
      function($resource, $location, $log, $q) {

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
            var deferred = $q.defer();
            var cbs_owners = {};
            var loc_owners = [];

            var aGet = _get('league/owners');
            aGet.get().$promise.then(function(data) {
               var i = 0;
               for (var owner in cbs_owners) {
                  if (cbs_owners.hasOwnProperty(owner)) {
                     loc_owners[i] = {};
                     loc_owners[i].name = cbs_owners[owner].name;
                     loc_owners[i].id = cbs_owners[owner].id;
                     loc_owners[i].logo = cbs_owners[owner].team.logo;
                     loc_owners[i].divID = cbs_owners[owner].team.division;
                     loc_owners[i++].team = cbs_owners[owner].team.name;
                  }
               }
               return loc_owners;
            });
            return deferred.promise;
         };

         var _getStandings = function() {
            return _get('league/standings/overall');
         };

         cbssportsApi.test = _test;
         cbssportsApi.getOwners = _getOwners;
         cbssportsApi.getStandings = _getStandings;

         return cbssportsApi;
}]);

