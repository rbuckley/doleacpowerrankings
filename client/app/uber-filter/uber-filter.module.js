(function() {
'use strict';

angular.module('Doleac.uberFilter', ['ui.bootstrap','ui.utils','ui.router','ngAnimate','Doleac.cbsSportsAPI' ]);

angular.module('Doleac.uberFilter').config(['$stateProvider', '$locationProvider', uberFilterConfig]);

function uberFilterConfig ($stateProvider, $locationProvider) {

   $stateProvider.state('uber-filter', {
      url: '/uberfilter',
      templateUrl: 'app/uber-filter/uber-filter.html',
   });
   /* Add New States Above */
}
})();
