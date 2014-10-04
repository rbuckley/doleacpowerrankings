
angular.module('powerRankings', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'ui.sortable', 'CBSSportsAPI' ]);

angular.module('powerRankings').config(function($stateProvider, $locationProvider) {

   $stateProvider.state('power-rankings', {
      url: '/powerrankings',
      templateUrl: 'power-rankings/power-rankings.html'
   });
   /* Add New States Above */

});

angular.module('powerRankings').controller('PowerRankingsCtrl', ['$scope', '$window', 'cbsAPI', function($scope, $window, cbsAPI) {
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

   // make sure we dont try to fill out the html before we have data
   $scope.isLoading = true;
   var loc_owners = [];
   var cbs_owners = {};
   $scope.owners = {};

   cbsAPI.getOwners().get().$promise.then(
      function( owners ) {
      cbs_owners = shuffle(owners.body.owners);

      var i = 0;
      // first loop over the owner data and pull what we want
      for (var owner in cbs_owners) {
         if (cbs_owners.hasOwnProperty(owner)) {
            loc_owners[i] = {};
            loc_owners[i].name = cbs_owners[owner].name;
            loc_owners[i].id = cbs_owners[owner].id;
            loc_owners[i].logo = cbs_owners[owner].team.logo;
            loc_owners[i].divID = cbs_owners[owner].team.division;
            loc_owners[i++].team = cbs_owners[owner].team.name;
         }
      }

      // then loop over the owners and pull more data via api calls
      cbsAPI.getStandings().get().$promise.then(
         function(standings) {
         console.dir(standings);
         for (i = 0; i < loc_owners.length; i++) {
         }
         $scope.isLoading = false;


         console.dir(loc_owners);
         $scope.owners = loc_owners;
         $scope.isLoading = false;
      });
   },
   function( error ) {
      $window.alert("oh no");
   });


   $scope.sortableOptions = {
      containment: '#sortable-owners'
   };
}]);

