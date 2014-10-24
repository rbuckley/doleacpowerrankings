(function() {
'use strict';

angular.module('Doleac', 
   ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 
      'Doleac.powerRankingsExpress', 
      'Doleac.teamAnalysis', 
      'Doleac.uberFilter', 
      'Doleac.home', 
      'Doleac.cbsSportsAPI']);

angular.module('Doleac').config(DoleacConfig);

angular.module('Doleac').run(['$rootScope', 'cbsAPI', DoleacRun]);

function DoleacConfig($stateProvider, $urlRouterProvider) {
   /* Add New States Above */
   $urlRouterProvider.otherwise('/');
}

function DoleacRun($rootScope, cbsAPI) {

   cbsAPI.getLeagueInfo();
   $rootScope.safeApply = function(fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
         if (fn && (typeof(fn) === 'function')) {
            fn();
         }
      } else {
         this.$apply(fn);
      }
   };
}

})();
