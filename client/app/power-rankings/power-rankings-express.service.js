(function() {
'use strict';

angular.module('Doleac.powerRankings').factory('powerRankingExpressData', powerRankingExpressDataFactory);

powerRankingExpressDataFactory.$inject = [ '$resource', '$q' ];

function powerRankingExpressDataFactory($resource, $q) {

   var baseUri = 'api/power-rankings';

	var powerRankingExpress = {
      submitRankings:      _submitRankings,
      getRankings:         _getRankings
   };

	return powerRankingExpress;

   //////////////////// Function Implementation //////////////////

   function _getRankings(data) {
      var deferred = $q.defer();

      return deferred.promise;
   }

   // Submitting rankings for the week
   // 1. Check if the user has already submitted for the week
   //    a. this could also be done when the user clicks on the power ranking link
   //    b. requires the current perdiod, user id and league id
   function _submitRankings(rankings) {
   }

}
})();
