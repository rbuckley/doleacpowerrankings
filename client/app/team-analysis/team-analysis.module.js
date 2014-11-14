(function() {
'use strict';

angular.module('Doleac.teamAnalysis', ['ui.bootstrap','ui.utils','ui.router','ngAnimate','Doleac.cbsSportsAPI' ]);

angular.module('Doleac.teamAnalysis').config(['$stateProvider', '$locationProvider', teamAnalysisConfig]);

function teamAnalysisConfig ($stateProvider, $locationProvider) {

   $stateProvider.state('team-analysis', {
      url: '/teamanalysis',
      templateUrl: 'app/team-analysis/team-analysis.html',
   });
   /* Add New States Above */
}
})();
