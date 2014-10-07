(function() {
'use strict';

angular.module('powerRankings').factory('powerRankingData', powerRankingDataFactory);

powerRankingDataFactory.$inject = [ '$resource', '$q' ];

function powerRankingDataFactory($resource, $q) {

   var mongoLabAPIKey = '3UmxkX7nCOOMUN0_nA8kUp0SOP-oDd_H';
   var mongoLabBaseURI = 'https://api.mongolab.com/api/1/databases/power_rankings/collections/:league_id';
   var  mongoResource = $resource(mongoLabBaseURI, 
         {apiKey: mongoLabAPIKey }
   );

	var powerRankingData = {
      submitRankings:      _submitRankings,
      retrieveRankings:    _retrieveRankings
   };

	return powerRankingData;

   //////////////////// Function Implementation //////////////////

   function _retrieveRankings(data) {
      console.log(data);
      //return mongoResource.save({league_id: rankings.league_id}, rankings);
   }

   // Submitting rankings for the week
   // 1. Check if the user has already submitted for the week
   //    a. this could also be done when the user clicks on the power ranking link
   //    b. requires the current perdiod, user id and league id
   function _submitRankings(rankings) {
      return mongoResource.save({league_id: rankings.league_id}, rankings);
   }

}
})();
