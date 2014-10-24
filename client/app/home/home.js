(function () {
'use strict';

angular.module('Doleac.home', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('Doleac.home').config(homeConfig);

angular.module('Doleac.home').controller('HomeCtrl', ['$scope', homeCtrl]);

function homeConfig($stateProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html'
    });
    /* Add New States Above */
}

function homeCtrl($scope) {
      $scope.test="Home Page Time";
}

})();
