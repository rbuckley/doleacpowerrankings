angular.module('powerRankings', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ui.sortable', 'CBSSportsAPI' ]);

angular.module('powerRankings').config(function($stateProvider, $locationProvider) {

   $stateProvider.state('power-rankings', {
         url: '/powerrankings',
         templateUrl: 'power-rankings/power-rankings.html'
   });
   /* Add New States Above */

});

angular.module('powerRankings').controller('PowerRankingsCtrl', ['$scope', 'cbsAPI', function($scope, cbsAPI) {

      var test = cbsAPI.test();
      console.log(test);
      var owners = cbsAPI.getOwners();

      owners.get();
      $scope.sortableOptions = {
         containment: '#sortable-owners',
         accept: function (sourceItemHandleScope, destSortableScope) {
            return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
         }
      };
}]);
