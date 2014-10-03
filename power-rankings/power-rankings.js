angular.module('powerRankings', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ui.sortable', 'CBSSportsAPI' ]);

angular.module('powerRankings').config(function($stateProvider, $locationProvider) {

   $stateProvider.state('power-rankings', {
         url: '/powerrankings',
         templateUrl: 'power-rankings/power-rankings.html'
   });
   /* Add New States Above */

});

angular.module('powerRankings').controller('PowerRankingsCtrl', ['$scope', '$window', 'cbsAPI', function($scope, $window, cbsAPI) {

      $scope.isLoading = true;

      cbsAPI.getOwnersJSONP().getOwners().$promise.then(
         function( owners ) {
            $scope.owners = owners.body.owners;
            $scope.isLoading = false;
         },
         function( error ) {
            $window.alert("oh no");
         }
      );

      cbsAPI.getOwnersRes().get().$promise.then(
         function( owners ) {
            console.log(owners);
         },
         function (error) {
            $window.alert("nuts" + error);
            console.dir(error.config.headers);
         }
      );


      $scope.sortableOptions = {
         containment: '#sortable-owners',
         accept: function (sourceItemHandleScope, destSortableScope) {
            return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
         }
      };
}]);
