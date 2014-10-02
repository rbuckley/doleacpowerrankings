angular.module('home', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('home').config(function($stateProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'home/home.html'
    });
    /* Add New States Above */

});

angular.module('home').controller('HomeCtrl', ['$scope', function($scope) {
      $scope.test="Home Page Time";
}]);

