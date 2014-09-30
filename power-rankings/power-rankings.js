angular.module('powerRankings', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('powerRankings').config(function($stateProvider) {

    $stateProvider.state('power-rankings-partial', {
        url: '/powerrankings',
        templateUrl: 'power-rankings/partial/power-rankings-partial.html'
    });
    /* Add New States Above */

});

