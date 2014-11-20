(function() {
'use strict';

angular.module('Doleac.powerRankings', ['ui.sortable', 'Doleac.cbsSportsAPI' ]);

angular.module('Doleac.powerRankings').config(['$stateProvider', powerRankingsConfig]);

function powerRankingsConfig ($stateProvider) {

   $stateProvider.state('power-rankings', {
      url: '/powerrankings',
      templateUrl: 'app/power-rankings/partial/power-rankings.html',
      controller: 'PowerRankingsCtrl as prCtrl',
   });
   $stateProvider.state('power-rankings-results', {
      url: '/powerrankingsresults',
      templateUrl: 'app/power-rankings/partial/power-rankings-results.html',
   });
   /* Add New States Above */
}
})();
