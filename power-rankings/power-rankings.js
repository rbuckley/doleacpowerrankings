angular.module('powerRankings', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ui.sortable', 'CBSSportsAPI' ]);

angular.module('powerRankings').config(function($stateProvider) {

   $stateProvider.state('power-rankings', {
         url: '/powerrankings',
         templateUrl: 'power-rankings/power-rankings.html'
   });
   /* Add New States Above */
});

angular.module('powerRankings').controller('PowerRankingsCtrl', ['$scope', 'cbsAPI', function($scope, cbsAPI) {

      var test = cbsAPI.test();
      console.log(test);

      // temporary until restful request can be made to cbs
      $scope.owners = [
         {'Id': 0, 'Name': 'Bob'},
         {'Id': 1, 'Name': 'Jim'},
         {'Id': 2, 'Name': 'Dave'},
         {'Id': 3, 'Name': 'Joe'},
         {'Id': 4, 'Name': 'Cory'},
         {'Id': 5, 'Name': 'Brett'},
         {'Id': 6, 'Name': 'Scott'},
         {'Id': 7, 'Name': 'Keith'}
  ];

  $scope.sortableOptions = {
     containment: '#sortable-owners',
     accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
     }
  };
}]);
