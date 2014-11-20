(function() {
'use strict';

angular.module('Doleac', 
   ['ui.router', 
      'Common.navbar',
      'Doleac.powerRankings', 
      'Doleac.teamAnalysis', 
      'Doleac.uberFilter', 
      'Doleac.home', 
      'Doleac.cbsSportsAPI']);

angular.module('Doleac').config(DoleacConfig);

angular.module('Doleac').run(['$rootScope', 'cbsAPI', DoleacRun]);

function DoleacConfig($urlRouterProvider) {
   /* Add New States Above */
   $urlRouterProvider.otherwise('/home');
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
