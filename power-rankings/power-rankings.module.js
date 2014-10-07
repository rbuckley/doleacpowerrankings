(function() {
'use strict';

angular.module('powerRankings', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ui.sortable', 'CBSSportsAPI' ]);

angular.module('powerRankings').config(powerRankingsConfig);

function powerRankingsConfig ($stateProvider, $locationProvider) {

   $stateProvider.state('power-rankings', {
      url: '/powerrankings',
      templateUrl: 'power-rankings/power-rankings.html'
   });
   /* Add New States Above */
}
})();
