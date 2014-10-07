
angular.module('powerRankings', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ui.sortable', 'CBSSportsAPI' ]);

angular.module('powerRankings').config(function($stateProvider, $locationProvider) {

   $stateProvider.state('power-rankings', {
      url: '/powerrankings',
      templateUrl: 'power-rankings/power-rankings.html'
   });
   /* Add New States Above */

});

angular.module('powerRankings').controller('PowerRankingsCtrl', ['$scope', '$filter', '$window', 'cbsAPI', function($scope, $filter, $window, cbsAPI) {
   function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      while (0 !== currentIndex) {
         // Pick a remaining element...
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         // And swap it with the current element.
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
      }
      return array;
   }

   function fill(destination, value) {
      destination = value;
   }

   var orderBy = $filter('orderBy');

   // make sure we dont try to fill out the html before we have data
   $scope.isLoading = true;
   var loc_owners = [];
   var cbs_owners = {};
   $scope.owners = {};

   cbsAPI.getPowerRankInfo().then(function(data) {
      loc_owners = data;
      console.log(loc_owners);
      $scope.isLoading = false;

      $scope.owners = loc_owners;
      $scope.isLoading = false;
   });

   $scope.order = function(predicate, reverse) {
      $scope.owners = orderBy($scope.owners, predicate, reverse);
   };

   $scope.submitRankings = function() {
      console.log("push this to the DB time");
   };


   $scope.sortableOptions = {
      containment: '#sortable-owners'
   };
}]);

