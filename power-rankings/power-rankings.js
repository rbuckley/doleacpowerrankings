(function() {
'use strict';

angular.module('powerRankings').controller('PowerRankingsCtrl', PowerRankingsCtrl);

PowerRankingsCtrl.$inject= ['$filter', '$window', 'cbsAPI', 'powerRankingData'];

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

function PowerRankingsCtrl($filter, $window, cbsAPI, powerRankingData) {
   var vm = this;

   vm.isLoading = true;
   vm.order = order;
   vm.owners = {};
   vm.sortableOptions = {};
   vm.submitRankings = submitRankings;

   cbsAPI.getPowerRankInfo().then(function(data) {
      vm.owners = shuffle(data.owners);
      vm.isLoading = false;
   });

   vm.sortableOptions.containment = '#sortable-owners';

   function order(predicate, reverse) {
      var orderBy = $filter('orderBy');
      vm.owners = orderBy(vm.owners, predicate, reverse);
   }

   /* this will eventually be another service provided by a factory*/
   function submitRankings() {
      var ranking = [];
      var rankingModel = {};
      angular.forEach(vm.owners, function(value, key) {
         ranking.push(value.id);
      });
      rankingModel.rank = ranking;
      rankingModel.user_id = cbsAPI.getUserId();
      rankingModel.league_id = cbsAPI.getLeagueId();
      rankingModel.currentPer = vm.owners.currentPeriod;
      powerRankingData.submitRankings(rankingModel);            
   }
}
})();
