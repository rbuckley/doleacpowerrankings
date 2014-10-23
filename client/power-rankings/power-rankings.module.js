(function() {
'use strict';

angular.module('Doleac.powerRankings', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ui.sortable', 'CBSSportsAPI' ]);

angular.module('Doleac.powerRankings').config(powerRankingsConfig);

function powerRankingsConfig ($stateProvider, $locationProvider) {

   $stateProvider.state('power-rankings', {
      url: '/powerrankings',
      templateUrl: 'power-rankings/partial/power-rankings.html'
   });
   $stateProvider.state('power-rankings-results', {
      url: '/powerrankingsresults',
      templateUrl: 'power-rankings/partial/power-rankings-results.html'
   });
   /* Add New States Above */
}
})();
