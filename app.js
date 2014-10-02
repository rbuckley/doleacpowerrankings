angular.module('DoleacPowerRankings', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'powerRankings', 'home']);

angular.module('DoleacPowerRankings').config(function($stateProvider, $urlRouterProvider) {
   /* Add New States Above */
   $urlRouterProvider.otherwise('/');
});

angular.module('DoleacPowerRankings').run(function($rootScope) {

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
});

