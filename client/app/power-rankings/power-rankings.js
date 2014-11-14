(function() {
'use strict';

angular.module('Doleac.powerRankings').controller('PowerRankingsCtrl', PowerRankingsCtrl);

PowerRankingsCtrl.$inject= ['$filter', '$location', '$window', '$q', 'cbsAPI', 'powerRankingExpressData'];

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

function PowerRankingsCtrl($filter, $location, $window, $q, cbsAPI, powerRankingExpressData) {
   var vm = this;

   vm.period = 0;
   vm.isLoading = true;
   vm.order = order;
   vm.owners = [];
   vm.submitRankings = submitRankings;
   vm.sortableOptions = {
      'containment': '.sort-containment',
      'helper': fixedWidthHelper,
   };


   cbsAPI.getPowerRankInfo().then(function(data) {
//      getRankings().then(function(result) {
//         $location.path('/powerrankingsresults');
//      }, function(reason) {
         vm.owners = shuffle(data.owners);
         vm.period = data.currentPeriod;
         vm.isLoading = false;
//      });
   });

   function fixedWidthHelper(e, ui) {
      ui.children().each(function() {
         $(this).width($(this).width());
      });
      return ui;
   }

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
      rankingModel.currentPer = vm.period;
      powerRankingExpressData.submitRankings(rankingModel);            
   }


   /**
    * getRankings
    * currently not working with express framework
    * @return {undefined}
    */
   function getRankings() {
      var deferred = $q.defer();
      powerRankingExpressData.getRankings(
         {
            league_id: cbsAPI.getLeagueId(),
            user_id: cbsAPI.getUserId(),
            period: vm.owners.currentPeriod
         } 
      ).then(function(data) {
         deferred.resolve(data);
      }, function(reason) {
         deferred.reject(reason);
      });
      return deferred.promise;
   }
}
})();
