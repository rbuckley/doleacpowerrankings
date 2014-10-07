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
   if (queries[1]) {
      var tokensList = url.split('?')[1].split('#')[0].split('&');
      for (var i = 0; i < tokensList.length; i++)
      {
         var pair = tokensList[i].split('=');
         tokens[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
   }
   return tokens;
}

angular.module('CBSSportsAPI').factory('cbsAPI', ['$resource', '$location', '$log', '$q', function($resource, $location, $log, $q) {
   var basePath = 'http://api.cbssports.com/fantasy/';
   var apiVers = '3.0';

   var cbssportsApi = {};

   var cbssportsTokens = parseCBSSportsURL($location.absUrl());

   var league_owners = [];
   var league_info = {};

   var _test = function() {
      return "hello api";
   };

   var _get = function(url) {
      return $resource(basePath + url, {
         access_token: cbssportsTokens['access_token'],
         response_format: 'JSON',
         callback: "JSON_CALLBACK"
      }, {
         get: {
            method: 'JSONP'
         }
      });
   };

   var _getLeagueInfo = function() {
      var deferred = $q.defer();
      if (league_info.name) {
         deferred.resolve(league_info);
      } else {
         _get('league/details').get().$promise.then(function(data) {
            var details = data.body.league_details;
            league_info.name = details.name;
            league_info.numOfDivisions = details.num_divisions;
            league_info.numOfTeams = details.num_teams;
            league_info.numWeeks = details.regular_season_periods;
            deferred.resolve(league_info);
         });
      }
      return deferred.promise;
   };

   /**
    *
    *  
    */
   var _getOwners = function() {
      var deferred = $q.defer();

      _get('league/owners').get().$promise.then(function(data) {
         var i = 0;
         var owners = data.body.owners;
         for (var owner in owners) {
            if (owners.hasOwnProperty(owner)) {
               league_owners[i] = {};
               league_owners[i].name = owners[owner].name;
               league_owners[i].id = owners[owner].id;
               league_owners[i].logo = owners[owner].team.logo;
               league_owners[i].divID = owners[owner].team.division;
               league_owners[i].teamID = owners[owner].team.id;
               league_owners[i++].team = owners[owner].team.name;
            }
         }
         deferred.resolve(league_owners);
      });
      return deferred.promise;
   };

   var _getStandings = function() {
      var deferred = $q.defer();
      _get('league/standings/overall').get().$promise.then(function(data) {
         deferred.resolve(data.body.overall_standings);
      });
      return deferred.promise;
   };

   var _getPowerRankInfo = function() {
      var deferred = $q.defer();

      $q.all( [_getLeagueInfo(), _getOwners(), _getStandings()]).then(function(result) {
         var league_info = result[0];
         var owners = result[1];
         var standings = result[2];
         var divisions = standings.divisions;
         var owner, team;
         var teams = [];
         if (!divisions) {
            for (owner = 0; owner < owners.length; owner++) {
               teams = standings.teams;
               for (team = 0; team < teams.length; team++) {
                  if (teams[team].id === owners[owner].teamID) {
                     owners[owner].wins = teams[team].wins;
                     owners[owner].losses = teams[team].losses;
                     owners[owner].ties = teams[team].ties;
                     owners[owner].points_scored = teams[team].points_scored;
                     owners[owner].points_against = teams[team].points_against;
                  }
               }
            }
         } else {
            for (var div = 0; div < divisions.length; div++) {
               for (owner = 0; owner < owners.length; owner++) {
                  if (owners[owner].divID === divisions[div].id) {
                     teams = divisions[div].teams;
                     for (team = 0; team < teams.length; team++) {
                        if (teams[team].id === owners[owner].teamID) {
                           owners[owner].wins = teams[team].wins;
                           owners[owner].losses = teams[team].losses;
                           owners[owner].ties = teams[team].ties;
                           owners[owner].points_scored = teams[team].points_scored;
                           owners[owner].points_against = teams[team].points_against;
                        }
                     }
                  }
               }
            }
         }
         deferred.resolve(owners);
      });

      return deferred.promise;
   };

   cbssportsApi.test = _test;
   cbssportsApi.getOwners = _getOwners;
   cbssportsApi.getStandings = _getStandings;
   cbssportsApi.getLeagueInfo = _getLeagueInfo;
   cbssportsApi.getPowerRankInfo = _getPowerRankInfo;

   return cbssportsApi;
}]);

